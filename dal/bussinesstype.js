'use strict';
// Access Layer for BusinessType Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-businesstype');
var moment  = require('moment');
var _       = require('lodash');
var BusinessType        = require('../models/businesstype');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = businesstype.whitelist;
var population = [
  //  {
  //   path: 'created_by',
  //   select: '-password'
  // }
];
/**
 * create a new businesstype.
 *
 * @desc  creates a new businesstype and saves them
 *        in the database
 *6
 * @param {Object}  businesstypeData  Data for the businesstype to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(businesstypeData, cb) {
  debug('creating a new businesstype');

    // Create businesstype if is new.
    var businesstypeModel  = new Businesstype(businesstypeData);

    businesstypeModel.save(function savebusinesstype(err, data) {
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
 * delete a businesstype
 *
 * @desc  delete data of the businesstype with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting businesstype: ', query);

  Businesstype
    .findOne(query)
    .populate(population)
    .exec(function deletebusinesstype(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Businesstype.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a businesstype
 *
 * @desc  update data of the businesstype with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating businesstype: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Businesstype
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatebusinesstype(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a businesstype.
 *
 * @desc get a businesstype with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting businesstype ', query);

  Businesstype
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
 * get a collection of businesstypes
 *
 * @desc get a collection of businesstypes from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of businesstypes');

 Businesstype.find(query,opt)
.populate(population)
    .exec(function getbusinesstypesCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of businesstypes using pagination
 *
 * @desc get a collection of businesstypes from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of businesstypes');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Businesstype.paginate(query, opts, function (err, docs, page, count) {
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


