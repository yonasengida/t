'use strict';
// Access Layer for posts Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-posts');
var moment  = require('moment');
var _       = require('lodash');
// var Comment        = require('../models/comment');
var Post        = require('../models/post');
var mongoUpdate = require('../lib/mongo-update');

// var returnFields = posts.whitelist;
var population = [
  {
    path:'organization'
  } ,
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
    path:'complains',
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
    path:"type",
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
 * create a new posts.
 *
 * @desc  creates a new posts and saves them
 *        in the database
 *6
 * @param {Object}  postsData  Data for the posts to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(postsData, cb) {
  debug('creating a new posts');

    // Create posts if is new.
    var postsModel  = new Post(postsData);

    postsModel.save(function saveposts(err, data) {
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
 * delete a posts
 *
 * @desc  delete data of the posts with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting posts: ', query);

  Post
    .findOne(query)
    .populate(population)
    .exec(function deleteposts(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Post.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a posts
 *
 * @desc  update data of the posts with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating posts: ', query,updates);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Post
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateposts(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a posts.
 *
 * @desc get a posts with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting posts ', query);

  Post
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
 * get a collection of postss
 *
 * @desc get a collection of postss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of postss',query);

 Post.find(query,opt)
.populate(population)
    .exec(function getpostssCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};
/**
 * get a collection of postss using pagination
 *
 * @desc get a collection of postss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of postss');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Post.paginate(query, opts, function (err, docs, page, count) {
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


