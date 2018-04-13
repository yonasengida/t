'use strict';
// Access Layer for product Data.
/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-product');
var moment  = require('moment');
var _       = require('lodash');
var Product        = require('../models/product');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = product.whitelist;
var population = [
  {
    path:'user',
    select:'-password'
  },
  {
    path:'parameters',
     select:'-product '
    
  }
];
/**
 * create a new product.
 *
 * @desc  creates a new product and saves them
 *        in the database
 *6
 * @param {Object}  productData  Data for the product to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(productData, cb) {
  debug('creating a new product');

    // Create product if is new.
    var productModel  = new Product(productData);

    productModel.save(function saveproduct(err, data) {
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
 * delete a product
 *
 * @desc  delete data of the product with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting product: ', query);

  Product
    .findOne(query)
    .populate(population)
    .exec(function deleteproduct(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Product.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a product
 *
 * @desc  update data of the product with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating product: ', query,updates);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Product
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateproduct(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a product.
 *
 * @desc get a product with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting product ', query);

  Product
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
 * get a collection of products
 *
 * @desc get a collection of products from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of products');

 Product.find(query,opt)
.populate(population)
    .exec(function getproductsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of products using pagination
 *
 * @desc get a collection of products from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of products');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Product.paginate(query, opts, function (err, docs, page, count) {
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


