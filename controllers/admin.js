'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var AdminDal        = require('../dal/admin');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Users
 */
/**
 * @disc UserID id validation interface
 * @param {id} unique UserId ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateAdmin = function validateAdmin(req, res, next, id) {
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
    AdminDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Admin _id ' + id + ' not found'
          });
      }
    });
  }
};
exports.updateAdmin = function updateAdmin(req,res,next){
  var body = req.body;
  AdminDal.update({_id:req.doc._id},body, function updateAd(err,doc){
    if(err){
      return next(err);
    }
    res.json(doc);
  });
};

exports.getAdmin= function getAdmin(req,res,next){
res.json(req.doc);
};

exports.getAdmins = function getAdmins(req, res, next) {
  var options= {};
  AdminDal.getCollection({},options, function getAdmins(err, docs) {
    if(err){
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteAdmin = (req, res, next) => {
  AdminDal.delete({ _id: req.doc._id }, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};