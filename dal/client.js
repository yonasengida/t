'use strict';
// Access Layer for client Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-client');
var moment  = require('moment');
var _       = require('lodash');
var Client        = require('../models/client');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = client.whitelist;
var population = [
  {
   path:'user',
    select:'-password'
  }
];
/**
 * create a new client.
 *
 * @desc  creates a new client and saves them
 *        in the database
 *6
 * @param {Object}  clientData  Data for the client to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(clientData, cb) {
  console.log(clientData);
  debug('creating a new client');

    // Create client if is new.
    var clientModel  = new Client(clientData);

    clientModel.save(function saveclient(err, data) {
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
 * delete a client
 *
 * @desc  delete data of the client with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting client: ', query);

  Client
    .findOne(query)
    .populate(population)
    .exec(function deleteclient(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Client.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a client
 *
 * @desc  update data of the client with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating client: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Client
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateclient(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a client.
 *
 * @desc get a client with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting client ', query);

  Client
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
 * get a collection of clients
 *
 * @desc get a collection of clients from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of clients');

 Client.find(query,opt)
.populate(population)
    .exec(function getclientsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of clients using pagination
 *
 * @desc get a collection of clients from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of clients');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Client.paginate(query, opts, function (err, docs, page, count) {
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


