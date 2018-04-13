'use strict';
// Access Layer for business Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-business');
var moment  = require('moment');
var _       = require('lodash');
var Business        = require('../models/business');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = business.whitelist;
var population = [
  //  {
  //   path: 'created_by',
  //   select: '-password'
  // }
];
/**
 * create a new business.
 *
 * @desc  creates a new business and saves them
 *        in the database
 *6
 * @param {Object}  businessData  Data for the business to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(businessData, cb) {
  debug('creating a new business');

    // Create business if is new.
    var businessModel  = new Business(businessData);

    businessModel.save(function savebusiness(err, data) {
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
 * delete a business
 *
 * @desc  delete data of the business with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting business: ', query);

  Business
    .findOne(query)
    .populate(population)
    .exec(function deletebusiness(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Business.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a business
 *
 * @desc  update data of the business with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating business: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Business
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatebusiness(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a business.
 *
 * @desc get a business with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting business ', query);

  Business
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
 * get a collection of businesss
 *
 * @desc get a collection of businesss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of businesss');

 Business.find(query,opt)
.populate(population)
    .exec(function getbusinesssCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of businesss using pagination
 *
 * @desc get a collection of businesss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of businesss');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Business.paginate(query, opts, function (err, docs, page, count) {
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


