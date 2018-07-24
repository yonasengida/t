'use strict';
// Access Layer for Type Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-Type');
var moment  = require('moment');
var _       = require('lodash');
var Type        = require('../models/type');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = Type.whitelist;
var population = [
  //  {
  //   path: 'created_by',
  //   select: '-password'
  // }
];
/**
 * create a new Type.
 *
 * @desc  creates a new Type and saves them
 *        in the database
 *6
 * @param {Object}  TypeData  Data for the Type to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(TypeData, cb) {
  debug('creating a new Type');

    // Create Type if is new.
    var TypeModel  = new Type(TypeData);

    TypeModel.save(function saveType(err, data) {
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
 * delete a Type
 *
 * @desc  delete data of the Type with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Type: ', query);

  Type
    .findOne(query)
    .populate(population)
    .exec(function deleteType(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Type.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a Type
 *
 * @desc  update data of the Type with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating Type: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Type
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateType(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a Type.
 *
 * @desc get a Type with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Type ', query);

  Type
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
 * get a collection of Types
 *
 * @desc get a collection of Types from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of Types');

 Type.find(query,opt)
.populate(population)
    .exec(function getTypesCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of Types using pagination
 *
 * @desc get a collection of Types from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of Types');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Type.paginate(query, opts, function (err, docs, page, count) {
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


