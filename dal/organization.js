'use strict';
// Access Layer for organization Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-organization');
var moment  = require('moment');
var _       = require('lodash');
var Organization        = require('../models/organization');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = organization.whitelist;
var population = [
  {
     path:'user',
    select:'-password'
  }
];
/**
 * create a new organization.
 *
 * @desc  creates a new organization and saves them
 *        in the database
 *6
 * @param {Object}  organizationData  Data for the organization to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(organizationData, cb) {
  debug('creating a new organization');

    // Create organization if is new.
    var organizationModel  = new Organization(organizationData);

    organizationModel.save(function saveorganization(err, data) {
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
 * delete a organization
 *
 * @desc  delete data of the organization with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting organization: ', query);

  Organization
    .findOne(query)
    .populate(population)
    .exec(function deleteorganization(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Organization.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a organization
 *
 * @desc  update data of the organization with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating organization: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Organization
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateorganization(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a organization.
 *
 * @desc get a organization with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting organization ', query);

  Organization
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
 * get a collection of organizations
 *
 * @desc get a collection of organizations from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of organizations');

 Organization.find(query,opt)
.populate(population)
    .exec(function getorganizationsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of organizations using pagination
 *
 * @desc get a collection of organizations from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of organizations');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Organization.paginate(query, opts, function (err, docs, page, count) {
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


