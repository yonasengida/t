'use strict';

// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api Controller');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
var async        = require('async');
var config                  = require('../config');
var ClientDal               = require('../dal/client');
// var SPServiceParameterDal   = require('../dal/spserviceparameter');
// var SPServiceParameterModel = require('../models/spserviceparameter');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Client
 */
/**
 * @disc Client id validation interface
 * @param {id} unique C IDlient
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateClient = function validateClient(req, res, next, id) {
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
    ClientDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Client _id ' + id + ' not found'
          });
      }
    });
  }
};
/**
 * 
 */
exports.updateClient = function updateClient(req,res,next){
     var body = req.body;
  ClientDal.update({_id:req.doc._id},body, function updateCl(err,doc){
    if(err){
      return next(err);
    }
    res.json(doc);
  });
};
/**
 *
 * @param {*DekDelete Client} req
 * @param {*} res
 * @param {*} next
 */
exports.deleteClient = function deleteClient(req, res, next) {
  var body = req.body;
  ClientDal.delete({ _id: req.doc._id }, function delCl(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};

exports.getClient= function getClient(req,res,next){
res.json(req.doc);
};

exports.getClients = function getClients(req, res, next) {
  var options= {};
  ClientDal.getCollection({},options, function getClients(err, docs) {
    if(err){
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Search Clients
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.searchClient = function searchClient(req, res, next){
    var name = req.query.name;
    if(!name){
        res.status(400);
        res.json({
            error:true,
            msg:"Query Parameter is required",
            status:400
        });
        return;
    }
    var query={
      $or: [{"first_name": { $regex: name, $options: "$i" } },
      { "middle_name": { $regex: name, $options: "$i" } },
      { "last_name": { $regex: name, $options: "$i" } }]
    }
    ClientDal.getCollection(query,{}, function searchClient(err, docs){
          if(err){
            return next(err);
        }
        res.json(docs);
    });
  };
    /**
 * Follow
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.follow = function follow(req, res, next) {
  debug('follow attendee');
  ClientDal.update({ _id: req._user._id }, { $addToSet: { following: req.doc._id } }, function follow(err, docs) {
    if (err) {
      return nxt(err);
    }
    ClientDal.update({ _id: req.doc._id }, { $addToSet: { follower: req._user._id } }, function follow(err, doc) {
      if (err) {
        return nxt(err);
      }
      res.json({ following: true });
    });
  });
};

/**
 * Unfollow
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.unfollow= function unfollow(req,res,next){

  debug('unfollow attendee');
  ClientDal.update({ _id: req._user._id }, { $pullAll: { following: [req.doc._id] } }, function follow(err, docs) {
    if (err) {
      return nxt(err);
    }
    ClientDal.update({ _id: req.doc._id }, { $pullAll: { follower: [req._user._id] } }, function follow(err, doc) {
      if (err) {
        return nxt(err);
      }
      res.json({ unfollow: true });
    });
  });

  };

/**
 * Change Language
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.changeLanguage = function changeLanguage(req, res, next) {
  debug("CHANGE LANGUAGE");
  var body = req.body;
  req.checkBody('language', 'Language  should not be empty!').withMessage("Should not be empty")
    .notEmpty();

  var validationErrors = req.validationErrors();

  if (validationErrors) {
    res.status(400);
    res.json(validationErrors);
    return;
  };

  ClientDal.update({ _id: req._user.client}, { language: body.language }, function clientInfo(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });

};

exports.uploadProfile = (req, res, next) => {
  debug("Uplaod Profile");
  console.log(req.files[0].filename);
  let dest = 'uploads/' + req.files[0].filename;
  ClientDal.update({ _id: req._user.client }, { picture: dest }, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json({
      error: false,
      upload: "Success",
      status: 200
    });
  });
};
/**
 * Manage Clients Profile
 *
 * @param {*} recq
 * @param {*} res
 * @param {*} next
 */
exports.manageProfile = (req, res, next) => {
  debug("manage profile");
  let body = req.body;
  req.checkBody('service')
    .notEmpty().withMessage('Service should not be empty').isMongoId().withMessage('Service Should Be the right ID');
   req.checkBody('parameter')
      .notEmpty().withMessage('Parameter should not be empty').isMongoId().withMessage('Parameter Should Be the right ID');

  req.checkBody('value')
    .notEmpty().withMessage('Value should not be empty');
  var validationErrors = req.validationErrors();

  if (validationErrors) {
    res.status(400);
    res.json(validationErrors);
    return;
  }
  body.client=req._user.client;
  /**
   * 
   */

  let query = {
    service: body.service,
    parameter: body.parameter,
    client: body.client
  };
  /**
   * 
   */
  SPServiceParameterDal.get(query, (err, doc) => {
    if (err) {
      return next(err);
    }
    if (doc._id){
      SPServiceParameterDal.update(query, body, (err, updatedDoc) => {
        if (err) {
          return next(err);
        }
        res.json(updatedDoc);
      });

    } else {
       SPServiceParameterDal.create(body, (err, docs) => {
        if (err) {
          return next(err);
        }
        res.json(docs);
      });
    }

  });
};
/**
 * Manage Multiple Clients Profile
 *
 * @param {*} recq
 * @param {*} res
 * @param {*} next
 */
exports.manageMultipleProfile = (req, res, next) => {
  debug("manage Multiple profile");
  let body = req.body;
  console.log(body);
  // req.checkBody('service')
  //   .notEmpty().withMessage('Service should not be empty').isMongoId().withMessage('Service Should Be the right ID');
  //  req.checkBody('parameter')
  //     .notEmpty().withMessage('Parameter should not be empty').isMongoId().withMessage('Parameter Should Be the right ID');

  // req.checkBody('value')
  //   .notEmpty().withMessage('Value should not be empty');
  // var validationErrors = req.validationErrors();

  // if (validationErrors) {
  //   res.status(400);
  //   res.json(validationErrors);
  //   return;
  // }
  body.client=req._user.client;
  
  let query = {
    service: body.service,
    parameter: body.parameter,
    client: body.client
  };

  /**
   * 
   */
  SPServiceParameterDal.get(query, (err, doc) => {
    if (err) {
      return next(err);
    }
    if (doc._id){
      SPServiceParameterDal.update(query, body, (err, updatedDoc) => {
        if (err) {
          return next(err);
        }
        res.json(updatedDoc);
      });

    } else {
       SPServiceParameterDal.create(body, (err, docs) => {
        if (err) {
          return next(err);
        }
        res.json(docs);
      });
    }

  });
};

/**
 * Get Client Profiles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.getProfiles = (req, res, next) => {
  debug('Get Profiles')
  let query={client:req._user.client};

  let page = req.query.page * 1 || 1;
  let limit = req.query.per_page * 1 || 10;
  let queryOpts = {
      page: page,
      limit: limit
  };

  SPServiceParameterDal.getCollection(query, {}, (err, docs) => {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};
/**
 * Search Product Services
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.searchClientsServiceandProduct = (req, res, next) => {
  debug("Search Service and Products");
  let query={};
  if(req.query.query.service && req.query.query.parameter && req.query.query.value)
  var values = req.query.query.value;
  var valuesArray = values.split(','); // split string on comma space
  console.log(valuesArray);
  // [ "apple", "orange", "pear", "banana", "raspberry", "peach" ]
  // var xxxxxx=[];
  // xxxxxx=req.query.query.value;
  // // req.query.query.value;
//   console.log(typeof(valuesArray));
// console.log(valuesArray);
    query = {
    service:req.query.query.service,
    parameter:req.query.query.parameter,
  //  value: {$in:valuesArray}

   value: {$in:valuesArray}
  };
  let page = req.query.page * 1 || 1;
  let limit = req.query.per_page * 1 || 10;
  let queryOpts = {
      page: page,
      limit: limit
  };
  console.log(query);
  SPServiceParameterDal.getCollectionByPagination(query, queryOpts, (err, docs) => {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });

};

/**
 * Search Client Services
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.searchClientsService = (req, res, next) => {
  debug("***********Search Srervices***************************");
  // res.json(req.body);
  let body = req.body;
  let query={};
  var x =[];
  //  req.checkBody('service', 'Service  should not be empty!').withMessage("Should not be empty")
  //   .notEmpty();

  // body.parameters.forEach(function (param) {
  //     query = {
  //     service: body.service,
  //     parameter: param.param,
  //     value: {$in: param.value}
  //   };
  //   SPServiceParameterDal.getCollection(query, {}, (err, docs) => {
  //     if (err) {
  //       return next(err);
  //     }
     
  //      x = x.concat(docs);
       
  //   });
  // });//end of foreach loop

  //  console.log(x);
  // res.json(x);
  var x=[];
  x=body.parameters;
  var allPOsts = [];
          
        async.eachSeries(x, function itrate(param, asynccb) {
          // if (err) {
          //   return asynccb(err);
          // }
           query = {
            service: body.service,
            parameter: param.param,
            value: {$in: param.value}
          };
          SPServiceParameterDal.getCollection(query, {}, (err, docs) => {
                    if(err){
                        return next(err);
                    }
                   allPOsts = allPOsts.concat(docs);
                    asynccb(null);
                });
         
            }, function done(err) {
                if (err) {
                    res.json({ err });
                }

                res.json(allPOsts);

            }

            )
};
/**
 * Get Services
 */
exports.getServcies = (req, res, next) => {
  let query = { client: req._user.client };
  let options = { service: 1 };
  var x = [];
  SPServiceParameterDal.getCollection(query, options, (err, docs) => {
    if (err) {
      return next(err);
    }
    x = docs;

    function getUniqueValuesOfKey(array, key) {
      return array.reduce(function (carry, item) {
        if (item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
        return carry;
      }, []);
    }
    /**
     * GET
     */
    res.json(getUniqueValuesOfKey(x, 'service'));
  });
};
/**
 * GET  Parameters
 */
exports.getParameters = (req, res, next) => {
   let query = { client: req._user.client,service:req.params.servid};
  let options = {parameter:1,value:1,_id:0};
  SPServiceParameterDal.getCollection(query, options, (err, docs) => {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
};