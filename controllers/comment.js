'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api-ixs');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var CommentDal = require('../dal/comment');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate comment
 */
/**
 * @disc comment id validation interface
 * @param {id} unique C IDlient
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateComment = function validateComment(req, res, next, id) {
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
    CommentDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Comment _id ' + id + ' not found'
          });
      }
    });
  }
};

exports.getAll = function getAll(req,res,next){
  CommentDal.getCollection({},{}, function getCommnts(err,docs){
    if(err){
      return next(err);
    }
    res.json(docs);
  });
};
exports.getComment = function getComment(req,res,next){
  res.json(req.doc);
};

exports.deleteComment = function deleteComment(req,res,next){
  CommentDal.delete({_id:req.doc._id}, function deleteCommet(err,doc){
    if(err){
      return next(err);
    }
    res.json(doc);
  });
};