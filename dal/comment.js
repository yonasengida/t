'use strict';
// Access Layer for comment Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-comment');
var moment  = require('moment');
var _       = require('lodash');
var Comment        = require('../models/comment');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = comment.whitelist;
var population = [
  {
     path:'created_by',
    select:'-password'
  }
];
/**
 * create a new comment.
 *
 * @desc  creates a new comment and saves them
 *        in the database
 *6
 * @param {Object}  commentData  Data for the comment to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(commentData, cb) {
  debug('creating a new comment');

    // Create comment if is new.
    var commentModel  = new Comment(commentData);

    commentModel.save(function savecomment(err, data) {
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
 * delete a comment
 *
 * @desc  delete data of the comment with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting comment: ', query);

  Comment
    .findOne(query)
    .populate(population)
    .exec(function deletecomment(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Comment.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a comment
 *
 * @desc  update data of the comment with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating comment: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Comment
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatecomment(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a comment.
 *
 * @desc get a comment with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting comment ', query);

  Comment
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
 * get a collection of comments
 *
 * @desc get a collection of comments from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of comments');

 Comment.find(query,opt)
.populate(population)
    .exec(function getcommentsCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of comments using pagination
 *
 * @desc get a collection of comments from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of comments');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Comment.paginate(query, opts, function (err, docs, page, count) {
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


