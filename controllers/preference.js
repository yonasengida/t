'use strict';
// Load Module Dependencies
var events = require('events');
var debug = require('debug')('api');
var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var async = require('async');

var config = require('../config');
var PreferenceDal = require('../dal/preference');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
    res.json({
        error: false,
        message: 'To Implemented!'
    });
};
/**
 * Create Preferences
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = function create(req, res, next) {
    var body = req.body;
    body.user = req._user._id;
    PreferenceDal.delete({user:req._user._id}, function removePrev(err,doc){
        if(err){
            return next(err);
        }
       
          var doc1;
          async.eachSeries(body, function itrate(pref, asynccb) {
                 
                                
                  PreferenceDal.create({}, function createPref(err,doc){
                    if(err){
                        return next(err);
                    }
                  PreferenceDal.update({_id:doc._id},
                    {$addToSet:{sectors:{ $each:pref.sectors  } },category:pref.category,user:req._user._id},
                     function add(err, udoc) {
                      if (err) {
                          return next(err);
                      };
                      asynccb(null);
                  });
                });
           
      
              }, function done(err) {
                  if (err) {
                      res,
                      json({
                          err
                      });
                  }
                res.json({error:false,msg:"Successfully Saved",status:200});
                   
              }
      
          ) /**end of Asyc */
      
        }); 
};

exports.get = function get(req, res, next) {
    res.json({
        msg: "Hello"
    });
}
exports.getAll = function getAll(req, res, next) {
   PreferenceDal.getCollection({user:req._user._id},{}, function getAll(err,doc){
    if(err){
        return next(err);
    }
    res.json(doc);
   });
};