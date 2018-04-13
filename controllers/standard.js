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
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.updateStandard =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.deleteStandard =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.getStandard =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.getAllStandard =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};


