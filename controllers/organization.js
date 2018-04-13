'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('ixs-api');
var mongoose     = require('mongoose');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var OrganizationDal = require('../dal/organization');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Organization
 */
/**
 * @disc Organization id validation interface
 * @param {id} unique C IDlient
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateOrganization = function validateOrganization(req, res, next, id) {
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
    OrganizationDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Organization _id ' + id + ' not found'
          });
      }
    });
  }
};
exports.updateOrganization = function updateOrganization(req,res,next){
     var body = req.body;
  OrganizationDal.update({_id:req.doc._id},body, function updateCl(err,doc){
    if(err){
      return next(err);
    }
    res.json(doc);
  });
};

exports.getOrganization= function getOrganization(req,res,next){
res.json(req.doc);
};

exports.getOrganizations = function getOrganizations(req, res, next) {
  var options= {};
  OrganizationDal.getCollection({},options, function getOrganizations(err, docs) {
    if(err){
      return next(err);
    }
    res.json(docs);
  });
};

/**
 * Get Sector Organization
 */

exports.getOrganizationBySector = function getOrganizationBySector(req,res,next){
// console.log(req.params.sectorId);
if(!mongoose.Types.ObjectId.isValid(req.params.sectorId)){
  res.status(400);
  res.json({msg:"Parameter is required/ Wrong para is passed"});
  return;
  }

var options= {};
  OrganizationDal.getCollection({sector:req.params.sectorId},options, function getOrganizations(err, docs) {
    if(err){
      return next(err);
    }
    res.json(docs);
  });
};
