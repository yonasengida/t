'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var BussinessTypeDal        = require('../dal/bussinesstype');
var BusinessDal        = require('../dal/bussiness');

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
/**
 * Create Bussiness Type
 */
exports.createBussinessType = (req, res, next) => {
  let body = req.body;
  BussinessTypeDal.get({ name: body.name }, (err, doc) => {
    if (err) {
      return nxt(err);
    }
    if (doc._id) {
      res.json({ msg: "Already Taken", error: true, status: 400 });
      return;
    }
    BussinessTypeDal.create(body, (err, docs) => {
      if (err) {
        return next(err);
      }
      res.json(docs);
    })
  });
};
/**
 * Update Business Type
 */
exports.updateBussinessType = (req, res, next) => {
  let body =req.body;
  BussinessTypeDal.update({ _id: req.doc._id },body, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};
/**
 * Delete Business
 */
exports.deleteBussinessType = (req, res, next) => {
  BussinessTypeDal.delete({ _id: req.doc._id }, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};
/**
 * Get Business
 */
exports.getBussinessType =(req,res,next)=>{
res.json(req.doc);
};
/**
 * Get All Business
 */
exports.getAllBussinessType = (req, res, next) => {
  BussinessTypeDal.getCollection({},{}, (err, docs) => {
    if (err) {
      return next(err);
    }
    res.json(docs);
  })
};
/**
 * GET Specific Bussiness
 */
exports.getSpecificBusiness = (req, res, next) => {
  let query = { type: req.doc._id }

  BusinessDal.getCollection(query, {}, (err, docs) => {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};