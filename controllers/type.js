'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var TypeDal       = require('../dal/type');


// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};

/**
 * Validate Type
 */
/**
 * @disc UserID id validation interface
 * @param {id} unique Type ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
/**
 * Validate Type
 */
exports.validateType = function validateType(req, res, next, id) {
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
    TypeDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Type _id ' + id + ' not found'
          });
      }
    });
  }
};
/**
 * Create Type
 */
exports.create = function createType(req,res,next){
    var body= req.body;
    var now = moment().toISOString();
    req.checkBody('name')
        .notEmpty().withMessage('Type Name should not be empty');
   var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    body.created_at=now;
    body.created_by=req._user._id;
    TypeDal.get({ name: body.name }, function getType(err, sec) {
        if (err) {
            return next(err);
        }
        if(sec._id){
            res.status(400);
            res.json({error:true,msg:"Already Exist",status:400})
            return;
        }
        TypeDal.create(body, function createType(err, doc) {
            if (err) {
                return next(err);
            }
            if (body.parent) {
                TypeDal.update({ _id: body.parent }, { $addToSet: { childs: doc._id } }, function addChilds(err, updatedTypeDoc) {
                    if (err) {
                        return next(err);
                    }
                    res.json(doc);
                });
                return;
            } else {
                res.json(doc);
            }

        });
    });

};
/**
 * Fetch All Type
 */
exports.fetchAll = function fetchAll(req,res,next){
    var options= {};
    TypeDal.getCollection({},options, function getAll(err,docs){
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};
/**
 * Fetch One Type
 */
exports.fetchOne = function fetchOne(req,res,next){
    res.json(req.doc);
  
};
/**
 * Update Type
 */
exports.update= function updateType(req,res,next){
    var body = req.body;

    TypeDal.update({_id:req.doc._id},body, function updateSec(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
        
    });
};
/**
 * Update Type
 */
exports.deleteType= function deleteType(req,res,next){
    var body = req.body;

    TypeDal.delete({_id:req.doc._id}, function delSec(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
        
    });
};
