'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');  
var async        = require('async');        
var config       = require('../config');



var PostDal      = require('../dal/post');
var PreferencesDal      = require('../dal/preference');
var CategorytDal      = require('../dal/category');
var SectorDal         = require('../dal/sector');
var CommentDal        = require('../dal/comment');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};

/**
 * Validate posts
 */
/**
 * @disc UserID id validation interface
 * @param {id} unique posts ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validatePost = function validateposts(req, res, next, id) {
  //Validate the id is mongoid or not
  req.checkParams('id', 'Invalid param').isMongoId(id);

  var validationErrors = req.validationErrors();

  if (validationErrors) {

    res.status(404).json({
      error: true,
      message: "Not Found",
      status: 404
    });

  } else {
    PostDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'Post _id ' + id + ' not found'
          });
      }
    });
  }
};
exports.create = function createPosts(req,res,next){
    
    var body= req.body;
    var now = moment().toISOString();
    req.checkBody('content')
        .notEmpty().withMessage('Content Should not be empty');

    req.checkBody('category')
        .notEmpty().withMessage('Category should not be empty').isMongoId().withMessage('Catgeory Should Be the right ID');
    
    
    req.checkBody('sector')
        .notEmpty().withMessage('Sector should not be empty').isMongoId().withMessage('Sector Should Be the right ID');
  
        var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }

    CategorytDal.get({_id:body.category}, function getCat(err,doc){
       if(err){
            return next(err);
        }
      if(!doc._id){
        res.json({error:true,msg:"Category Not Found",status:400});
        return;
      }
        SectorDal.get({_id:body.sector}, function getSector(err,doc){
            if(!doc._id){
                res.json({msg:"Sector Not Found"});
                return;
            }
            body.created_at= now;
            body.created_by=req._user._id;
            body.organization=req._user.organization ;
            PostDal.create(body, function createPost(err,doc){
                if(err){
                    return next(err);
                }
                res.json(doc);
            });
        });
       
    });
  

};
/**
 *  Get my Post
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.myPosts= function myPosts(req,res,next){
var options= {};
// console.log(req._user._id);
    PostDal.getCollection({created_by:req._user._id},options, function getAll(err,docs){
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};
/**
 *  Get Users Post
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.userPosts= function myPosts(req,res,next){
    debug("Get users post");
    console.log(req.query.user);
    var options= {};
    PostDal.getCollection({created_by:req.query.user},options, function getAll(err,docs){
            if(err){
                return next(err);
            }
            res.json(docs);
        });
    };
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.fetchAll = function fetchAll(req,res,next){
    var options= {};
    PostDal.getCollection({},options, function getAll(err,docs){
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};
exports.fetchOne = function fetchOne(req,res,next){
    res.json(req.doc);
  
};
exports.fetchChild = function fetchChild(req,res,next){
    var options= {};
    PostDal.getCollection({parent:req.doc._id},options, function getChild(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
};

exports.update= function updateposts(req,res,next){
    var body = req.body;

    PostDal.update({_id:req.doc._id},body, function updateSec(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
        
    });
};

exports.delete = function deletePost(req,res,next){
    PostDal.delete({_id:req.doc._id}, function deletePost(err,doc){
        if(err){
            return next(err);
        }
        res.json(doc);
    });
};
/**
 * 
 * @param {*} req HTTP REQUEST
 * @param {*} res HTTP RESPONSE
 * @param {*} next Middleware displacher
 * 
 */
exports.commentPost = function commentPost(req,res,next){
    var body = req.body;
    var now = moment().toISOString();
    req.checkBody('comment')
        .notEmpty().withMessage('Comment Should not be empty');

    var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
     body.created_at= now;
     body.created_by=req._user._id;
     body.post      =req.doc._id;
    CommentDal.create(body, function createComment(err, doc) {
        if(err){
            return next(err);
        }
        //  console.log(doc)
        PostDal.update({_id:req.doc._id},{$addToSet:{comments:doc._id},updated_at:now}, function updatePost(err,pdoc){
            if(err){
                return next(err);
            }
            res.json(doc);
            console.log(doc);
        });
    });

};
/**
 * Remove Comments 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} net 
 */
exports.removeComment= function removeComment(req,res,net){
    debug("Remove Post COmment");
    var body = req.body;
    var now = moment().toISOString();

    req.checkBody('comment')
        .notEmpty().withMessage('Comment should not be empty').isMongoId().withMessage('Comment Should Be the right ID');
    /**
     * Validate Inputs
     */
    var validationErrors = req.validationErrors();

    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    /**
     * Remove Comment From Post
     */
    PostDal.update({ _id: req.doc._id }, { $pullAll: { comments: [body.comment]}, updated_at: now }, function updatePost(err, pdoc) {
        if (err) {
            return next(err);
        }
        CommentDal.delete({_id:body.comment},function deleteComment(err,doc){
            if(err){
                return nextTick(err);
            }
            res.json(pdoc);
        });
       
    });
};

/**
 * Search Posts
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.searchPosts = function searchPosts(req,res,next){
    var category = req.query.category;
    var sector   = req.query.sector;
    var query  = {};
    var options= {};
    if(category && sector){
       query={
        sector:sector,
        category:category
        }
    }else if(category && !sector){
        query={
          category:category
         }
     }else if(sector && !category){
        query={
         sector:sector
       }
     }else{
        query={}
     }
    PostDal.getCollection(query,options, function getPosts(err,docs){
        if(err){
            return next(err);
        }
        res.json(docs);
    });
};
/**
 * Get my Preferences Post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.preferencesPost = function preferencesPost(req,res,next){
    var options={};
    PreferencesDal.getCollection({user:req._user._id},options, function getPreferences(err, docs) {
        if (err) {
          return next(err);
    
        }
    //   console.log(docs.length);
      if(docs.length <= 0){
        PostDal.getCollection({},{},function getPosts(err,posts){
            if(err){
                return next(err);
            }
            res.json(posts);
        });
        return;
      }else{

      
       var allPOsts = [];
        async.eachSeries(docs, function itrate(item, asynccb) {
          if (err) {
            return asynccb(err);
          }
          console.log(item.sectors);

            PostDal.getCollection({category:item.category,sector: {$in: item.sectors}},{}, function getMyPreferences(err,docs){
                    if(err){
                        return next(err);
                    }
                    // res.json(docs);
                    allPOsts = allPOsts.concat(docs);
                    asynccb(null);
                });

         
        }, function done(err) {
          if (err) {
            res, json({ err });
          }
          res.json(allPOsts);
          
        }
    
        )
    }
    
      });
   
};

