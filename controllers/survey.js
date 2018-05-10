'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var SurveyModel       = require('../models/survey');
var SurveyDal        = require('../dal/survey');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Standard 
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
    SurveyDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Survey _id ' + id + ' not found'
          });
      }
    });
  }
};

exports.createSurvey =(req,res,next)=>{
var body= req.body;
    var now = moment().toISOString();
    req.checkBody('city')
        .notEmpty().withMessage('City Should not be empty');

    req.checkBody('subcity')
        .notEmpty().withMessage('Subcity Should not be empty');

    req.checkBody('woreda')
        .notEmpty().withMessage('Woreda Should not be empty');
    
    req.checkBody('type')
        .notEmpty().withMessage('Business Type  should not be empty');
       
    req.checkBody('business')
        .notEmpty().withMessage('Specific Business  should not be empty');
    req.checkBody('standard')
        .notEmpty().withMessage('Standard should not be empty');
    
     req.checkBody('status', 'Status is Invalid!')
      .notEmpty().withMessage('Status should not be Empty')
      .isIn(['UNAVAILABLE', 'AVAILABLE','SCARCE']).withMessage('Status should either be UNAVAILABLE, AVAILABLE,SCARCE');
   if(body.status != 'UNAVAILABLE'){
      req.checkBody('quantity')
        .notEmpty().withMessage('Quantity Should not be empty');

   }
  var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    body.client= req._user.client;
    SurveyDal.create(body, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.json(doc);
    })
};
/**
 * Update Survey
 */
exports.updateSurvey = (req, res, next) => {
  let body = req.body;
  SurveyDal.update({ _id: req.doc._id }, body, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  })
};
/**
 * Delete Survey
 */
exports.deleteSurvey =(req,res,next)=>{
  SurveyDal.delete({ _id: req.doc._id }, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  })
};
exports.getSurvey =(req,res,next)=>{
res.json(req.doc);
};
/**
 * G ALL SURVEY
 */
exports.getAllSurvey = (req, res, next) => {
  SurveyDal.getCollection({}, {}, (err, docs) => {
    if(err){
      return next(err);
    }
    res.json(docs);
  });
};


/**
 * Get My Syrvey
 */

exports.getMySurvey = (req,res,next)=>{
  let query={client:req._user.client,status:req.query.status};
  // let query={client:req._user.client};
  SurveyDal.getCollection(query,{},(err,docs)=>{
    if(err){
      return next(err);
    }
    res.json(docs);
  });
}

exports.countSurvey =(req,res,next)=>{
  let query={}
if(req.query.query){
  query=req.query.query
}
  SurveyModel.aggregate(
    [
      { "$match": query},
 
    {"$group" : {_id:{standard:"$standard",type:"$type",status:"$status",business:"$business"}, count:{$sum:1}}} ]
  ,(err,docs)=>{
    if(err){
      return next(err);
    }
     res.json(docs);
  })

};