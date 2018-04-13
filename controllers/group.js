'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
         
var config          = require('../config');
var GroupDal        = require('../dal/group');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};

exports.createGroup = (req,res,next)=>{
    let body = req.body;
    GroupDal.create(body,(err,docs)=>{
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};

exports.getGroups=(req,res,next)=>{
    let query={};
    GroupDal.getCollection(query,{},(err,docs)=>{
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};