'use strict';
// Access Layer for survey Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-survey');
var moment  = require('moment');
var _       = require('lodash');
var Survey        = require('../models/survey');
var mongoUpdate = require('../lib/mongo-update');
// var returnFields = survey.whitelist;
var population = [
  //  {
  //   path: 'created_by',
  //   select: '-password'
  // }
];
/**
 * create a new survey.
 *
 * @desc  creates a new survey and saves them
 *        in the database
 *6
 * @param {Object}  surveyData  Data for the survey to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(surveyData, cb) {
  debug('creating a new survey');

    // Create survey if is new.
    var surveyModel  = new Survey(surveyData);

    surveyModel.save(function savesurvey(err, data) {
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
 * delete a survey
 *
 * @desc  delete data of the survey with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting survey: ', query);

  Survey
    .findOne(query)
    .populate(population)
    .exec(function deletesurvey(err, doc) {
      if (err) {
        return cb(err);
      }

      if(!doc) {
        return cb(null, {});
      }

      Survey.remove(query,function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, doc);

      });

    });
};

/**
 * update a survey
 *
 * @desc  update data of the survey with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating survey: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true
  };

  // updates = mongoUpdate(updates);

  Survey
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatesurvey(err, doc) {
      if(err) {
        return cb(err);
      }

      cb(null, doc || {});
    });
};

/**
 * get a survey.
 *
 * @desc get a survey with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting survey ', query);

  Survey
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
 * get a collection of surveys
 *
 * @desc get a collection of surveys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, opt, cb) {
  debug('fetching a collection of surveys');

 Survey.find(query,opt)
.populate(population)
    .exec(function getsurveysCollection(err, doc) {
      if(err) {
        return cb(err);
      }

     return cb(null, doc);

  });
};

/**
 * get a collection of surveys using pagination
 *
 * @desc get a collection of surveys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of surveys');

  var opts = {
    // columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };
  Survey.paginate(query, opts, function (err, docs, page, count) {
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


