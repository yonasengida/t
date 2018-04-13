'use strict';
// Access Layer for Parameters Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-Parameters');
var moment  = require('moment');
var Parameter        = require('../models/parameter');
var mongoUpdate = require('../lib/mongo-update');


var population = [
 
];
/**
 * create a new Parameters.
 *
 * @desc  creates a new Parameters and saves them
 *        in the database
 *6
 * @param {Object}  ParametersData  Data for the Parameters to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(parametersData, cb) {
  debug('creating a new Parameters');

    // Create Parameters if is new.
    var ParametersModel  = new Parameter(parametersData);

    ParametersModel.save(function saveParameters(err, data) {
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
 * delete a Parameters
 *
 * @desc  delete data of the Parameters with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting Parameters: ', query);

  Parameter
    .findOne(query)
    .populate(population)
    .exec(function deleteParameters(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Parameter.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a Parameters
 *
 * @desc  update data of the Parameters with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating Parameters: ', query,updates);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Parameter
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateParameters(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a Parameters.
 *
 * @desc get a Parameters with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting Parameters ', query);

  Parameter
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
 * get a collection of Parameterss
 *
 * @desc get a collection of Parameterss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of Parameterss',query);

 Parameter.find(query,opt)
.populate(population)
    .exec(function getParameterssCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};
/**
 * get a collection of Parameterss using pagination
 *
 * @desc get a collection of Parameterss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of Parameterss');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Parameter.paginate(query, opts, function (err, docs, page, count) {
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


