'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config            = require('../config');
var CategoryDal       = require('../dal/category');
var PostDal           = require('../dal/post');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};

/**
 * Validate Sector
 */
/**
 * @disc UserID id validation interface
 * @param {id} unique Sector ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateCategory = function validateCategory(req, res, next, id) {
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
    CategoryDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Catgeory _id ' + id + ' not found'
          });
      }
    });
  }
};
exports.create = function create(req, res, next) {
    var body = req.body;

    var now = moment().toISOString();
    req.checkBody('name')
        .notEmpty().withMessage('Name Should not be empty');
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    body.created_at = now;
    body.created_by = req._user;
    CategoryDal.create(body, function createCat(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
};
exports.fetchOne= function fetchOne(req,res,next){
    res.json(req.doc);
};
exports.fetchAll= function fetchAll(req,res,next){
    var options ={};
   CategoryDal.getCollection({},options, function getAll(err,docs){
       if(err){
           return next(err);
       }
       res.json(docs);
   });
};
exports.update = function update(req,res,next){
var body = req.body;
CategoryDal.update({_id:req.doc._id},body, function updateCategory(err,doc){
    if(err){
        return next(err);
    }
    res.json(doc);
});
};
/**
 * Delete
 */
exports.deleteResource = function deleteResource(req,res,next){
    var body = req.body;
    CategoryDal.delete({_id:req.doc._id},function deleteRespource(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
    };
/**
 * Get Posts By Category
 */
exports.getPostsByCatgeory= function getPostsByCatgeory(req,res,next){
    var query={};
    var options={};
   PostDal.getCollection({},options, function getPsosts(err,docs){
    if(err){
        return next(err);
    }
    res.json(docs)
   });
 };