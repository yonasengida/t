'use strict';
// Access Layer for group Data.
/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-group');
var moment  = require('moment');
var _       = require('lodash');
var Group        = require('../models/group');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = group.whitelist;
var population = [
  {
    path:'user',
    select:'-password'
  }
];
/**
 * create a new group.
 *
 * @desc  creates a new group and saves them
 *        in the database
 *6
 * @param {Object}  groupData  Data for the group to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(groupData, cb) {
  debug('creating a new group');

    // Create group if is new.
    var groupModel  = new Group(groupData);

    groupModel.save(function savegroup(err, data) {
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
 * delete a group
 *
 * @desc  delete data of the group with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting group: ', query);

  Group
    .findOne(query)
    .populate(population)
    .exec(function deletegroup(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      group.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a group
 *
 * @desc  update data of the group with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating group: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Group
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updategroup(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a group.
 *
 * @desc get a group with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting group ', query);

  Group
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
 * get a collection of groups
 *
 * @desc get a collection of groups from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of groups');

 Group.find(query,opt)
.populate(population)
    .exec(function getgroupsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of groups using pagination
 *
 * @desc get a collection of groups from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of groups');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Group.paginate(query, opts, function (err, docs, page, count) {
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


