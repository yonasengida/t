'use strict';
// Access Layer for category Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-category');
var moment  = require('moment');
var _       = require('lodash');
var Category        = require('../models/category');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = category.whitelist;
var population = [
//   {
//     path:'parent'
//   }
 {
    path:'created_by',
    select:'-password'
  }
];
/**
 * create a new category.
 *
 * @desc  creates a new category and saves them
 *        in the database
 *6
 * @param {Object}  categoryData  Data for the category to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(categoryData, cb) {
  debug('creating a new category');

    // Create category if is new.
    var categoryModel  = new Category(categoryData);

    categoryModel.save(function savecategory(err, data) {
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
 * delete a category
 *
 * @desc  delete data of the category with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting category: ', query);

  Category
    .findOne(query)
    .populate(population)
    .exec(function deletecategory(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Category.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a category
 *
 * @desc  update data of the category with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating category: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Category
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatecategory(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a category.
 *
 * @desc get a category with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting category ', query);

  Category
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
 * get a collection of categorys
 *
 * @desc get a collection of categorys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of categorys');

 Category.find(query,opt)
.populate(population)
    .exec(function getcategorysCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of categorys using pagination
 *
 * @desc get a collection of categorys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of categorys');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Category.paginate(query, opts, function (err, docs, page, count) {
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


