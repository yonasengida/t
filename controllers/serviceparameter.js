'use strict';
// Load Module Dependencies
const events       = require('events');
const debug        = require('debug')('ixs-api');
const mongoose     = require('mongoose');
const moment       = require('moment');
const bcrypt       = require('bcrypt');
const nodemailer   = require('nodemailer');
          
const config       = require('../config');
const ServiceParameterDal = require('../dal/serviceparameter');

// no operation(noop) function
exports.noop = (req, res, next)=> {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};

/**
 * Validate Service Parameter
 */
/**
 * @disc Service Parameter id validation interface
 * @param {id} unique C IDlient
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateServiceParameter = function validateServiceParameter(req, res, next, id) {
    //Validate the id is mongoid or not
    req.checkParams('id', 'Invalid param').isMongoId(id);
  
    var validationErrors = req.validationErrors();
  
    if (validationErrors) {
  
      res.status(404).json({
        error: true,
        message: "Wrong ID is Passed",
        status: 404
      });
  
    } else {
        ServiceParameterDal.get({ _id: id }, function (err, doc) {
        if (doc._id) {
          req.doc = doc;
          next();
        } else {
          res.status(404)
            .json({
              error: true, status: 404,
              msg: 'Service Parameter _id ' + id + ' not found'
            });
        }
      });
    }
  };
/**
 * Get Service Parameters
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  exports.getServiceParameter=(req,res,next)=>{
    res.json(req.doc);
  };
/**
 * GET SERVICE PARAMETERS
 * 
 * @param {*} reqres 
 * @param {*} next 
 */
  exports.getServiceParameters=(req,res,next)=>{
    ServiceParameterDal.getCollection({},{},(err,docs)=>{
        if(err){
            return next(err);
        }
        res.json(docs);
    });

  };
/**
 * Update Service Parameters
 * @param {*} reqres 
 * @param {*} next 
 */
exports.update = (req, res, next) => {
    ServiceParameterDal.update({ _id: req.doc._id },body, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
};

/**
 * Delete Service Parameters
 * @param {*} reqres 
 * @param {*} next 
 */
exports.delete = (req, res, next) => {
    ServiceParameterDal.remov({ _id: req.doc._id }, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
};