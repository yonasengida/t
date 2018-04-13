'use strict';
// Access Layer for Service Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-service');
var moment  = require('moment');
var _       = require('lodash');
var Service        = require('../models/service');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = Service.whitelist;
var population = [

];
/**
 * create a new Service.
 *
 * @desc  creates a new Service and saves them
 *        in the database
 *6
 * @param {Object}  ServiceData  Data for the Service to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(ServiceData, cb) {
  debug('creating a new Service');

    // Create Service if is new.
    var ServiceModel  = new Service(ServiceData);

    ServiceModel.save(function saveService(err, data) {
      if (err) {
        return cb(err);
      }


      exports.get({ _id: data._id }, function (err, doc) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });

  };

/**
 * delete a Service
 *
 * @desc  delete data of the Service with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Service: ', query);

  Service
    .findOne(query)
    .populate(population)
    .exec(function deleteService(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Service.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a Service
 *
 * @desc  update data of the Service with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating Service: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Service
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateService(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a Service.
 *
 * @desc get a Service with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Service ', query);

  Service
    .findOne(query)
    .populate(population)
    .exec(function(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a collection of Services
 *
 * @desc get a collection of Services from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of Services');

 Service.find(query,opt)
.populate(population)
    .exec(function getServicesCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of Services using pagination
 *
 * @desc get a collection of Services from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of Services');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Service.paginate(query, opts, function (err, docs, page, count) {
    if(err) {
      return cb(err);
    }
    var data = {
      total_pages: page,
      total_docs_count: count,
      docs: docs
    };

    cb(null, data);

  });

};


