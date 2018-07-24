'use strict';
// Access Layer for preference Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-preference');
var moment  = require('moment');
var _       = require('lodash');
var Preference        = require('../models/preference');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = preference.whitelist;
var population = [
//   {
//     path:'parent'
//   }
 {
    path:'created_by',
    select:'-password'
  }
];
/**
 * create a new preference.
 *
 * @desc  creates a new preference and saves them
 *        in the database
 *6
 * @param {Object}  preferenceData  Data for the preference to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(preferenceData, cb) {
  debug('creating a new preference',preferenceData);

    // Create preference if is new.
    var preferenceModel  = new Preference(preferenceData);

    preferenceModel.save(function savepreference(err, data) {
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
 * delete a preference
 *
 * @desc  delete data of the preference with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting preference: ', query);

  Preference
    .findOne(query)
    .populate(population)
    .exec(function deletepreference(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Preference.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a preference
 *
 * @desc  update data of the preference with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating preference: ', query,updates);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Preference
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatepreference(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a preference.
 *
 * @desc get a preference with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting preference ', query);

  Preference
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
 * get a collection of preferences
 *
 * @desc get a collection of preferences from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of preferences');

 Preference.find(query,opt)
.populate(population)
    .exec(function getpreferencesCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of preferences using pagination
 *
 * @desc get a collection of preferences from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of preferences');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Preference.paginate(query, opts, function (err, docs, page, count) {
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


