'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var StandardDal        = require('../dal/standard');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Standard 
 */
/**
 * @disc UserID id validation interface
 * @param {id} unique Sector ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateBussinessType = function validateBussinessType(req, res, next, id) {
  //Validate the id is mongoid or not
  req.checkParams('id', 'Invalid param').isMongoId(id);

  var validationErrors = req.validationErrors();

  if (validationErrors) {

    res.status(404).json({
      error: true,
      message: "Not Found",
      status: 404
    });

  } else {
    StandardDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'standard _id ' + id + ' not found'
          });
      }
    });
  }
};

exports.createStandard =(req,res,next)=>{
 var body= req.body;
    var now = moment().toISOString();
    req.checkBody('name')
        .notEmpty().withMessage('Name Should not be empty');

    req.checkBody('business')
        .notEmpty().withMessage('Business  should not be empty').isMongoId().withMessage('Business Should Be the right ID');
       
   
        var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    StandardDal.get({ name: body.name }, (err, doc) => {
      if (err) {
        return next(err);
      }
     if(doc._id){
       res.json({msg:"Already Taken",error:true,status:400});
       return
     }
     StandardDal.create(body,(err,doc)=>{
       if(err){
         return next(err);
       }
       res.json(doc);
     })
    })
};
/**
 * Update Standard
 */
exports.updateStandard = (req, res, next) => {
    let body = req.body;
    StandardDal.update({ _id: req.doc._id }, body, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
};
/**
 * Delete Standard
 */
exports.deleteStandard = (req, res, next) => {
    StandardDal.delete({ _id: req.doc._id }, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
    })
};
exports.getStandard =(req,res,next)=>{
 res.json(req.doc);
};
exports.getAllStandard =(req,res,next)=>{
StandardDal.getCollection({},{},(err,docs)=>{
    if(err){
        return next(err);
    }
    res.json(docs);
})
};


