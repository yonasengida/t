'use strict';
// Access Layer for cost Data.
/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-cost');
var moment  = require('moment');
var _       = require('lodash');
var Cost        = require('../models/cost');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = cost.whitelist;
var population = [
  {
    path:'user',
    select:'-password'
  },
  {
    path:'parameters',
     select:'-cost -options'
    
  }
];
/**
 * create a new cost.
 *
 * @desc  creates a new cost and saves them
 *        in the database
 *6
 * @param {Object}  costData  Data for the cost to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(costData, cb) {
  debug('creating a new cost');

    // Create cost if is new.
    var costModel  = new Cost(costData);

    costModel.save(function savecost(err, data) {
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
 * delete a cost
 *
 * @desc  delete data of the cost with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting cost: ', query);

  Cost
    .findOne(query)
    .populate(population)
    .exec(function deletecost(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      cost.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a cost
 *
 * @desc  update data of the cost with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating cost: ', query,updates);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Cost
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatecost(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a cost.
 *
 * @desc get a cost with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting cost ', query);

  Cost
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
 * get a collection of costs
 *
 * @desc get a collection of costs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of costs');

 Cost.find(query,opt)
.populate(population)
    .exec(function getcostsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of costs using pagination
 *
 * @desc get a collection of costs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of costs');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Cost.paginate(query, opts, function (err, docs, page, count) {
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


