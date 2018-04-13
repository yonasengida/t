'use strict';
// Access Layer for standard Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-standard');
var moment  = require('moment');
var _       = require('lodash');
var Standard        = require('../models/standard');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = standard.whitelist;
var population = [
  //  {
  //   path: 'created_by',
  //   select: '-password'
  // }
];
/**
 * create a new standard.
 *
 * @desc  creates a new standard and saves them
 *        in the database
 *6
 * @param {Object}  standardData  Data for the standard to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(standardData, cb) {
  debug('creating a new standard');

    // Create standard if is new.
    var standardModel  = new Standard(standardData);

    standardModel.save(function savestandard(err, data) {
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
 * delete a standard
 *
 * @desc  delete data of the standard with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting standard: ', query);

  Standard
    .findOne(query)
    .populate(population)
    .exec(function deletestandard(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Standard.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a standard
 *
 * @desc  update data of the standard with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating standard: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Standard
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatestandard(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a standard.
 *
 * @desc get a standard with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting standard ', query);

  Standard
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
 * get a collection of standards
 *
 * @desc get a collection of standards from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of standards');

 Standard.find(query,opt)
.populate(population)
    .exec(function getstandardsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of standards using pagination
 *
 * @desc get a collection of standards from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of standards');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Standard.paginate(query, opts, function (err, docs, page, count) {
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


