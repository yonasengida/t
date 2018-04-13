'use strict';
// Access Layer for sector Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-sector');
var moment  = require('moment');
var _       = require('lodash');
var Sector        = require('../models/sector');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = sector.whitelist;
var population = [
  //  {
  //   path: 'created_by',
  //   select: '-password'
  // }
];
/**
 * create a new sector.
 *
 * @desc  creates a new sector and saves them
 *        in the database
 *6
 * @param {Object}  sectorData  Data for the sector to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(sectorData, cb) {
  debug('creating a new sector');

    // Create sector if is new.
    var sectorModel  = new Sector(sectorData);

    sectorModel.save(function savesector(err, data) {
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
 * delete a sector
 *
 * @desc  delete data of the sector with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting sector: ', query);

  Sector
    .findOne(query)
    .populate(population)
    .exec(function deletesector(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Sector.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a sector
 *
 * @desc  update data of the sector with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating sector: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Sector
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatesector(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a sector.
 *
 * @desc get a sector with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting sector ', query);

  Sector
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
 * get a collection of sectors
 *
 * @desc get a collection of sectors from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of sectors');

 Sector.find(query,opt)
.populate(population)
    .exec(function getsectorsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of sectors using pagination
 *
 * @desc get a collection of sectors from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of sectors');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Sector.paginate(query, opts, function (err, docs, page, count) {
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


