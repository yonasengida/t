'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var BussinessTypeDal        = require('../dal/bussinesstype');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Bussiness Type
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
    BussinessTypeDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'bussinesstype _id ' + id + ' not found'
          });
      }
    });
  }
};

exports.createBussinessType =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.updateBussinessType =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.deleteBussinessType =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.getBussinessType =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.getAllBussinessType =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};


