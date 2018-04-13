'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var BussinessDal        = require('../dal/bussiness');
var StandardDal        = require('../dal/standard');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Bussiness 
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
    BussinessDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Bussiness _id ' + id + ' not found'
          });
      }
    });
  }
};
/**
 * Create Bussiness
 */
exports.createBussiness =(req,res,next)=>{
   var body= req.body;
    var now = moment().toISOString();
    req.checkBody('name')
        .notEmpty().withMessage('Name Should not be empty');

    req.checkBody('type')
        .notEmpty().withMessage('Business  Type should not be empty').isMongoId().withMessage('Business  Type Should Be the right ID');
       
   
        var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    BussinessDal.get({ name: body.name }, (err, doc) => {
      if (err) {
        return next(err);
      }
     if(doc._id){
       res.json({msg:"Already Taken",error:true,status:400});
       return
     }
     BussinessDal.create(body,(err,doc)=>{
       if(err){
         return next(err);
       }
       res.json(doc);
     })
    })
};
/**
 * Update Bussiness
 */
exports.updateBussiness = (req, res, next) => {
  let body = req.body;
  BussinessDal.update({_id: req.doc._id },body, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  })
};
/**
 * Delete Bussiness
 */
exports.deleteBussiness = (req, res, next) => {
  BussinessDal.delete({ _id: req.doc._id }, (err, doc) => {
    if (err) {
      return nxt(err);
    }
    res.json(doc);
  })
};
/**
 * Get Specific Business
 */
exports.getBussiness = (req, res, next) => {
  res.json(req.doc);
};
/**
 * GET ALL BUSINESS
 */
exports.getAllBussiness =(req,res,next)=>{
BussinessDal.getCollection({},{},(err,docs)=>{
  if(err){
    return next(err);
  }
  res.json(docs);
})
};


/**
 * GET Specific Bussiness Standards
 */
exports.getStandards = (req, res, next) => {
  let query = { business: req.doc._id }

  StandardDal.getCollection(query, {}, (err, docs) => {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
