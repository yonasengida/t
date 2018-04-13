'use strict';
// Access Layer for ServiceParameters Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-ServiceParameters');
var moment  = require('moment');
var _       = require('lodash');
// var Comment        = require('../models/comment');
var SPServiceParameter        = require('../models/spserviceparameter');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = Parameters.whitelist;
var population = [
  {
    path:'service'
  } ,
  {
    path:'parameter'
  },
  {
    path:'client'
  },
  {
    path:'comments',
	 populate: {
  path: 'created_by',
   model: 'User',
   select:'-password',
   populate: {
    path: 'client',
     model: 'Client'
      }
	  }
  },
  
  {
    path:"category",
    select:"-updated_at -created_at -archived_at -archived -created_by"
  },
  
  {
    path:"sector",
    select:"-updated_at -created_at -archived_at -archived -created_by -childs -parent"
  },
{
    path:'created_by',
 select:"-password -created_at -archived_at -archived",
 populate: {
  path: 'client',
   model: 'Client'
    }
  } ,
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
exports.create = function create(serviceparametersData, cb) {
  debug('creating a new Parameters');

    // Create Parameters if is new.
    var ServiceParametersModel  = new SPServiceParameter(serviceparametersData);

    ServiceParametersModel.save(function saveServiceParameters(err, data) {
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
 * delete a ServiceParameters
 *
 * @desc  delete data of the ServiceParameters with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting ServiceParameters: ', query);

  SPServiceParameter
    .findOne(query)
    .populate(population)
    .exec(function deleteServiceParameters(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      ServiceParameter.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a ServiceParameters
 *
 * @desc  update data of the ServiceParameters with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating ServiceParameters: ', query,updates);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  SPServiceParameter
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateServiceParameters(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a ServiceParameters.
 *
 * @desc get a ServiceParameters with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting ServiceParameters ', query);

  SPServiceParameter
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
 * get a collection of ServiceParameterss
 *
 * @desc get a collection of ServiceParameterss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of ServiceParameterss',query);

 SPServiceParameter.find(query,opt)
.populate(population)
    .exec(function getServiceParameterssCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};
/**
 * get a collection of ServiceParameterss using pagination
 *
 * @desc get a collection of ServiceParameterss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of ServiceParameterss');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  SPServiceParameter.paginate(query, opts, function (err, docs, page, count) {
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


exports.getDistinictCollection = function getDistinictCollection(param,query, cb) {
  debug('fetching a distinict collection of ServiceParameterss',query);

 SPServiceParameter.distinct(param,query)
.populate(param)
    .exec(function getDistinictCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};