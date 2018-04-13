'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
          
var config          = require('../config');
var SectorDal       = require('../dal/sector');
var ServiceDal      = require('../dal/service')

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
/**
 * Validate Sector
 */
exports.validateSector = function validateSector(req, res, next, id) {
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
    SectorDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Sector _id ' + id + ' not found'
          });
      }
    });
  }
};
/**
 * Create Sector
 */
exports.create = function createSector(req,res,next){
    var body= req.body;
    var now = moment().toISOString();
    req.checkBody('name')
        .notEmpty().withMessage('Sector Name should not be empty');
   var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    body.created_at=now;
    body.created_by=req._user._id;
    SectorDal.get({ name: body.name }, function getSector(err, sec) {
        if (err) {
            return next(err);
        }
        if(sec._id){
            res.status(400);
            res.json({error:true,msg:"Already Exist",status:400})
            return;
        }
        SectorDal.create(body, function createSector(err, doc) {
            if (err) {
                return next(err);
            }
            if (body.parent) {
                SectorDal.update({ _id: body.parent }, { $addToSet: { childs: doc._id } }, function addChilds(err, updatedSectorDoc) {
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
 * Fetch All Sector
 */
exports.fetchAll = function fetchAll(req,res,next){
    var options= {};
    SectorDal.getCollection({},options, function getAll(err,docs){
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};
/**
 * Fetch One Sector
 */
exports.fetchOne = function fetchOne(req,res,next){
    res.json(req.doc);
  
};
/**
 * Fetch Parent Sector
 */
exports.fetchParent = function fetchParent(req,res,next){
    var options= {created_by:0};
    SectorDal.getCollection({parent:null},options, function getParent(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
};
/**
 * Select Sector Oganizations
 */
exports.selectSectorOrganization = function selectSectorOrganization(req,res,next){
    var options= {};
    SectorDal.getCollection({parent:null},options, function getParent(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
};
/**
 * Fetch Child Select
 */
exports.fetchChild = function fetchChild(req,res,next){
    var options= {};
    SectorDal.getCollection({parent:req.doc._id},options, function getChild(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
};

/**
 * Update Sector
 */
exports.update= function updateSector(req,res,next){
    var body = req.body;

    SectorDal.update({_id:req.doc._id},body, function updateSec(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
        
    });
};
/**
 * Update Sector
 */
exports.deleteSector= function deleteSector(req,res,next){
    var body = req.body;

    SectorDal.delete({_id:req.doc._id}, function delSec(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
        
    });
};
/**
 * Fetch Child Select
 */
exports.fetchServices = function fetchServices(req,res,next){
    var options= {};
    ServiceDal.getCollection({sector:req.doc._id},options, function getChild(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
};
