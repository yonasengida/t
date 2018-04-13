'use strict';
//Access Layer for service provider Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-serviceprovider');
var moment  = require('moment');
var _       = require('lodash');
var Serviceprovider        = require('../models/serviceprovider');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = serviceprovider.whitelist;
var population = [
  {
     path:'user',
    select:'-password'
  }
];
/**
 * create a new serviceprovider.
 *
 * @desc  creates a new serviceprovider and saves them
 *        in the database
 *6
 * @param {Object}  serviceproviderData  Data for the serviceprovider to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(serviceproviderData, cb) {
  debug('creating a new serviceprovider');

    // Create serviceprovider if is new.
    var serviceproviderModel  = new Serviceprovider(serviceproviderData);

    serviceproviderModel.save(function saveserviceprovider(err, data) {
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
 * delete a serviceprovider
 *
 * @desc  delete data of the serviceprovider with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting serviceprovider: ', query);

  Serviceprovider
    .findOne(query)
    .populate(population)
    .exec(function deleteserviceprovider(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      serviceprovider.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a serviceprovider
 *
 * @desc  update data of the serviceprovider with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating serviceprovider: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Serviceprovider
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateserviceprovider(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a serviceprovider.
 *
 * @desc get a serviceprovider with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting serviceprovider ', query);

  Serviceprovider
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
 * get a collection of serviceproviders
 *
 * @desc get a collection of serviceproviders from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of serviceproviders');

 Serviceprovider.find(query,opt)
.populate(population)
    .exec(function getserviceprovidersCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of serviceproviders using pagination
 *
 * @desc get a collection of serviceproviders from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of serviceproviders');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Serviceprovider.paginate(query, opts, function (err, docs, page, count) {
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


