'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var async        = require('async');
         
var config            = require('../config');
var ProductDal         = require('../dal/product');
var ProductModel       = require('../models/product');
var ParameterDal       = require('../dal/parameter');
var CostDal            = require('../dal/cost');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};

/**
 * Validate Product
 */

exports.validateProduct = function validateProduct(req, res, next, id) {
  //Validate the id is mongoid or not
  req.checkParams('id', 'Invalid param').isMongoId(id);

  var validationErrors = req.validationErrors();

  if (validationErrors) {

    res.status(404).json({
      error: true,
      message: "Invalid ID",
      status: 404
    });

  } else {
    ProductDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Product _id ' + id + ' not found'
          });
      }
    });
  }
};

/**
 * Create Product Here
 */
exports.createProduct = (req, res, next) => {
    let body = req.body;
 req.checkBody('name', 'Invalid Name').withMessage("Name  should not be empty")
      .notEmpty();
       req.checkBody('sector', 'Invalid Sector').notEmpty().withMessage("Sector  should not be empty")
      .isMongoId();
       req.checkBody('service', 'Invalid Service').notEmpty().withMessage("Service  should not be empty")
     .isMongoId();
    var validationErrors = req.validationErrors();

    if (validationErrors) {
      res.status(400);
      res.json(validationErrors);
    return;
    } 
    ProductDal.get({ name: body.name }, (err, doc) => {
        if (err) {
            return next(err);
        }
        if (doc._id) {
            res.status(400);
            res.json({error:true,msg:"Product Already Taken",status:400});
            return;
        }

        ProductDal.create(body, (err, docs) => {
            if (err) {
                return next(err);
            }
            res.json(docs);
        });
    })
};
/**
 * Add Product Parameter
 */

exports.addParameter = (req, res, next) => {
    let body = req.body;
    if (!body.parameters) {
        res.json({ error: true, msg: "Parameter should not be empty", status: 400 })
        return;
    }
    if (body.parameters) {
        if (body.parameters.constructor != Array) {
            res.json({
                errpr: true,
                msg: "Please pass the right value for  Parameters"
            });
            return;
        }
    }
             /**
             * Check for Parameter Duplications
             */
        async.eachSeries(body.parameters, function itrate(param, asynccb) {
            
            ParameterDal.get({product:req.doc._id,name:param.param_name},(err,prm)=>{
                if(err){
                    return next(err);
                }
               
            if(!prm._id){         
                ParameterDal.create({product:req.doc._id,name:param.param_name},
               
                (err,docs)=>{
                    if(err){
                        return next(err);
                    }
                    ProductDal.update({_id:req.doc._id},{$addToSet:{'parameters':docs._id}},(err,prodDoc)=>{
                        if(err){
                            return next(err);
                        }
                         asynccb(null);
                    })
                    
                  
                });
                return;
            }
             asynccb(null);
              });             
           }, function done(err) {
        if (err) {
          res.json({ err });
        }
       res.json({erro:false,msg:"Succesfully Added",status:200});
       
      }

      )/**end of Asyc */
     
   
};
/**
 * Add Producst Parameter Options
 */
exports.addProductParameterOptions = (req, res, next) => {
    let body = req.body;
    ProductDal.get({ _id: req.doc._id, 'parameters.param_name': body.parameter }, (err, doc) => {
        if (err) {
            return next(err);
        }

        if (!doc._id) {
            res.json({ error: true, msg: "Parameter Not Found", status: 400 });
            return;
        }
        /**
         * Check Duplications Here
         */
        async.eachSeries(body.options, function itrate(option, asynccb) {

                      ProductDal.update({ name: req.doc.name, 'parameters.param_name': body.parameter },
                        { $addToSet: { 'parameters.$.options': { "opt_name": option.opt_name ,"est_price":option.est_price} } }
                        , (err, docs) => {
                            if (err) {
                                return next(err);
                            }
                            asynccb(null);
                        })
             
        }, function done(err) {
            if (err) {
                res.json({ err });
            }
            res.json({ erro: false, msg: "Succesfully Added", status: 200 });

        }

        )/**end of Asyc */

    });// check Esitence of Parameter
};
/**
 * setPrice
 */
exports.setPrice = (req, res, next) => {
   let body = req.body;
   
        async.eachSeries(body.options, function itrate(option, asynccb) {
            /**
             * Check Duplications
             */
            CostDal.get({product: req.doc._id, parameter: body.parameter,opt_name:option.opt_name,est_price:option.est_price},(err,costDoc)=>{
                if(err){
                    return next(err);
                }
               
                if(!costDoc._id){
                     CostDal.create({ product: req.doc._id, parameter: body.parameter,opt_name:option.opt_name,est_price:option.est_price },
                       (err, docs) => {
                            if (err) {
                                return next(err);
                            }
                            ParameterDal.update({ _id: body.parameter }, { $addToSet: { 'options': option.opt_name } }, (err, parameterDoc) => {
                                if (err) {
                                    return next(err);
                                }
                                asynccb(null);
                            })
                        })
                    return;
                }
                 asynccb(null);
            })
                     
             
        }, function done(err) {
            if (err) {
                res.json({ err });
            }
            res.json({ erro: false, msg: "Succesfully Added", status: 200 });

        }

        )/**end of Asyc */

   
};
/**
 * GET ALL PRODUCTS
 */
exports.getProducts=(req,res,next)=>{
    let query={};
    ProductDal.getCollection(query,{},(err,docs)=>{
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};

/**
 * GET Specific  PRODUCTS
 */
exports.getProduct=(req,res,next)=>{
   res.json(req.doc);
};

/**
 * Search By Paginate
 */
exports.searchPaninateProduct =  (req, res, next)=> {
  debug("Search Producst");
  let page   = req.query.page*1 || 1;
  let limit  = req.query.per_page*1 || 3;
  let query=req.query.query;
 
  var queryOpts ={
    page:page,
    limit:limit
   };
   ProductDal.getCollectionByPagination(query,queryOpts, function getByPaginationCb(err, doc) {
     if (err) {
       return next(err);
     }
     if (!doc) {
       res.status(404),
         res.json({
           error: true,
           message: "Requested Data is not found",
           status: 404
         }
         );
     }
     res.json(doc);
   });
};
/**
 * Search Products
 */
exports.searchProduct =  (req, res, next)=> {
  debug("Search Producst");
  let page   = req.query.page*1 || 1;
  let limit  = req.query.per_page*1 || 3;
  let query=req.query.query;
 
  var queryOpts ={
    page:page,
    limit:limit
   };
   ProductDal.getCollection(query,{}, function getByPaginationCb(err, doc) {
     if (err) {
       return next(err);
     }
     if (!doc) {
       res.status(404),
         res.json({
           error: true,
           message: "Requested Data is not found",
           status: 404
         }
         );
     }
     res.json(doc);
   });
};

/**
 * Price ForeCast
 */

exports.priceForeCast = (req, res, next) => {
   let body = req.body;
   
   let price=0;
       
async.each(body.parametrs, function (param, callback) { //loop through array
 
  async.each(param.options, function (opt, callback1) { //loop through array
     //GET est_price from cost collections
   CostDal.get({product: req.doc._id, parameter: param.parameter,opt_name:opt.opt_name},(err,costDoc)=>{
                if(err){
                    return next(err);
                }
    price=price+costDoc.est_price;
    callback1(); 
   });
    
    }, function(err) {
      console.log("InnerLoopFinished");
      callback();
    });
  }, function(err) {
    
      res.json({product:req.doc,price});
    // console.log("OuterLoopFinished");
    // console.log('Process Finished');
});

   
};

/**
 * Update Product
 */

exports.updateProduct = (req, res, next) => {
    let body = req.body;
    ProductDal.update({_id:req.doc._id},body, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.json(docs);
    });
};


/**
 * Delete Product
 */

exports.deleteProduct = (req,res,next)=>{
 ProductDal.delete({_id:req.doc._id}, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.json(docs);
    });
};