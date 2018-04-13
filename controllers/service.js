'use strict';
// Load Module Dependencies
const events       = require('events');
const debug        = require('debug')('api');
const moment       = require('moment');
const bcrypt       = require('bcrypt');
const nodemailer   = require('nodemailer');
        
const config           = require('../config');
const ServiceDal       = require('../dal/service');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Sercies
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} id 
 */
exports.validateService = (req,res,next,id)=>{
    req.checkParams('id', 'Invalid param').isMongoId(id);
    var validationErrors = req.validationErrors();
       if (validationErrors) {
          res.status(404).json({
          error: true,
          message: "Not Found",
          status: 404
        });
    return;
      }

      ServiceDal.get({ _id: id }, function (err, doc) {
        if (doc._id) {
          req.doc = doc;
          next();
        } else {
          res.status(404)
            .json({
              error: true, status: 404,
              msg: 'Service _id ' + id + ' not found'
            });
        }
      });
}
/**
 * Create Services
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createService =(req,res,next)=>{
   debug('create Service');
  const now = moment().toISOString();
  const workflow = new events.EventEmitter();
  const body = req.body;
    body.created_at=now;

    workflow.on('validateInput',function validate(){
       debug('validate Service Input');
       req.checkBody('name', 'Service Name  should not be empty!').notEmpty();
                
       const validationErrors = req.validationErrors();
       if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
  
      } else {
        
        workflow.emit('createService');
      }
    });
    workflow.on('createService', function createService(){
        debug('Create Service');
        ServiceDal.get({name:body.name},(err,doc)=>{
            if(err){
                return next(err);
            }
            if(doc._id){
                res.status(400).json({error:true,msg:"already exist",status:400});
                return;
            }
            ServiceDal.create(body,(err,doc)=>{
                if(err){
                    return next(err);
                }
                res.json(doc);
            });
        });
       
    });
    workflow.emit('validateInput');
};

/**
 * Get Service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getService =(req,res,next)=>{
res.json(req.doc);
};
/**
 * Get All Serices
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getServices=(req,res,next)=>{
ServiceDal.getCollection({},{},(err,docs)=>{
if(err){
    return next(err);
}
res.json(docs)
});
}
/**
 * Update Services
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateService=(req,res,next)=>{
    debug('Update Service');
      const body = req.body;
    ServiceDal.get({name:body.name},(err,doc)=>{
        if(err){
            return next(err);
        }
        if(doc._id){
            res.status(400).json({error:true,msg:"Already Taken",status:400});
            return;
        }
        ServiceDal.update({_id:req.doc._id},body,(err,doc)=>{
            if(err){
                return next(err);
            }
            res.json(doc);
        });
    });
};
/**
 * Delete Services
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteService = (req, res, next) => {
    ServiceDal.delete({ _id: req.doc._id }, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
};

