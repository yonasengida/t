'use strict';
// Load Module Dependencies
const events       = require('events');
const debug        = require('debug')('api');
const moment       = require('moment');
const bcrypt       = require('bcrypt');
const nodemailer   = require('nodemailer');
        
const config          = require('../config');
const ServiceProviderDal       = require('../dal/serviceprovider');

// no operation(noop) function
exports.noop = (req, res, next)=>{
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Service Provider
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.validateServiceProvider = (req,res,next)=>{
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
      ServiceProviderDal.get({ _id: id }, function (err, doc) {
        if (doc._id) {
          req.doc = doc;
          next();
        } else {
          res.status(404)
            .json({
              error: true, status: 404,
              msg: 'ServiceProvider _id ' + id + ' not found'
            });
        }
      });
    }
};
/**
 * Get All Service Providers
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getSPs= (req,res,next)=>{
    ServiceProviderDal.getCollection(query,options,(err,docs)=>{
        if(err)
        {
            return next(err);
        }
        res.json(docs);
    });
};
