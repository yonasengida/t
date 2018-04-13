'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var BussinessDal        = require('../dal/bussiness');

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

exports.createBussiness =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.updateBussiness =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.deleteBussiness =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.getBussiness =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};
exports.getAllBussiness =(req,res,next)=>{
 res.json({
    error:false,
    message: 'To Implemented!'
  });
};


