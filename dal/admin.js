'use strict';
// Access Layer for admin Data.
/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-admin');
var moment  = require('moment');
var _       = require('lodash');
var Admin        = require('../models/admin');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = admin.whitelist;
var population = [
  {
    path:'user',
    select:'-password'
  }
];
/**
 * create a new admin.
 *
 * @desc  creates a new admin and saves them
 *        in the database
 *6
 * @param {Object}  adminData  Data for the admin to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(adminData, cb) {
  debug('creating a new admin');

    // Create admin if is new.
    var adminModel  = new Admin(adminData);

    adminModel.save(function saveadmin(err, data) {
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
 * delete a admin
 *
 * @desc  delete data of the admin with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting admin: ', query);

  Admin
    .findOne(query)
    .populate(population)
    .exec(function deleteadmin(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Admin.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a admin
 *
 * @desc  update data of the admin with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating admin: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Admin
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateadmin(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a admin.
 *
 * @desc get a admin with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting admin ', query);

  Admin
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
 * get a collection of admins
 *
 * @desc get a collection of admins from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of admins');

 Admin.find(query,opt)
.populate(population)
    .exec(function getadminsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of admins using pagination
 *
 * @desc get a collection of admins from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of admins');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Admin.paginate(query, opts, function (err, docs, page, count) {
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


