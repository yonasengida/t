'use strict';
// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
       
var config          = require('../config');
var UserModel         = require('../models/user');
var UserDal         = require('../dal/user');
var AdminDal        = require('../dal/admin');
var ClientDal       = require('../dal/client');
var ServiceproviderDal = require('../dal/serviceprovider');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To Implemented!'
  });
};
/**
 * Validate Users
 */
/**
 * @disc UserID id validation interface
 * @param {id} unique UserId ID
 * @param {req} http request
 * @param {res} Http response
 * @param {next} middlware dispatcher
 */
exports.validateUser = function validateUser(req, res, next, id) {
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
    UserDal.get({ _id: id }, function (err, doc) {
      if (doc._id) {
        req.doc = doc;
        next();
      } else {
        res.status(404)
          .json({
            error: true, status: 404,
            msg: 'User _id ' + id + ' not found'
          });
      }
    });
  }
};
/**
 * Signup User
 */
exports.createUser = function createUser(req, res, next) {
  
  debug('create user');
  var now = moment().toISOString();
  var workflow = new events.EventEmitter();
  var body = req.body;
  workflow.on('validateUser', function validateUser() {
    // debug('validate user');
    // Validate User Data
    req.checkBody('username', 'User Name  should not be empty!').isEmail().withMessage("Should be email")
      .notEmpty();
   req.checkBody('password')
      .notEmpty().withMessage('password should not be empty')
      .len(6, 20).withMessage('6 to 20 characters required');
   req.checkBody('user_type', 'User Type is Invalid!')
      .notEmpty().withMessage('User Type should not be Empty')
      .isIn(['admin', 'client']).withMessage('User Type should either be admin,client');
   var validationErrors = req.validationErrors();

    if (validationErrors) {
      res.status(400);
      res.json(validationErrors);
    return;
    } else {
      workflow.emit('checkUserExist');
    }
  });
  /**
   * Check for user exist or not
   */
  workflow.on('checkUserExist', function checkUserExist() {
    debug("checkUserExist")
    var username = body.username;
    // Query DB for a user with the given ID
    UserDal.get({ username: username }, function cb(err, user) {
      if (err) {
        return next(err);
      }
      // If user find return it
      if (user._id) {
        res.status(400);
        res.json({
          error: true,
          msg: 'User Already Exist',
          status: 400
        });

      } else {
        workflow.emit('createUser');
      }
    });

  });
  workflow.on('createUser', function createUser() {
    debug('Creating user');
    // Create User
    body.created_at=now;
    UserDal.create({
      password: body.password,
      username: body.username,
      role: body.user_type,
      // realm: body.realm ? body.realm : 'admin'
    }, function callback(err, user) {
      if (err) {
        return next(err);
      }
      workflow.emit('createUserType', user);
    });
  });
   workflow.on('createUserType', function respond(user) {
     if(body.user_type === 'admin'){
       body.user= user._id;
       body.created_at= now;
       AdminDal.create(body, function createAdmin(err,doc){
         if(err){
           return next(err);
         }
         UserDal.update({_id:user._id},{admin:doc._id,realm:'admin'}, function updateUser(err,udoc){
           if(err){
             return next(err);
           }
            workflow.emit('respond', udoc,doc);
         })
       });
       
     } 
     else if(body.user_type === 'client'){
      
        body.user= user._id;
        body.created_at= now;
        ClientDal.create(body, function createClient(err,doc){
          if(err){
            return next(err);
          }
          UserDal.update({_id:user._id},{client:doc._id,realm:'client'}, function updateUser(err,udoc){
            if(err){
              return next(err);
            }
             workflow.emit('respond', udoc,doc);
          })
 
        });
      }
    });
  workflow.on('respond', function respond(user,doc) {

    res.status(201);
    res.json(user);

  });

  workflow.emit('validateUser');

};
/**
 * Get User
 */
exports.getUser = function getUser(req, res, next) {
 res.json(req.doc);
};

/**
 * Update User
 */
exports.updateUser = function updateUser(req, res, next) {
  var body = req.body;
  UserDal.get({user_name:body.user_name} , function chekuser(err,doc){
    if(doc._id){
      res.status(409);
      res.json({
        error:true,
        msg:"User Name is already taken",
        status:409
        });
        return;
    }else{
       // Update user profile
       body.updated_at=moment().toISOString();
        UserDal.update({ _id: req.doc._id }, body, function update(err, doc) {
          if (err) {
            return next(err);
          }
            res.json(doc);
          
        });
    }
  });
 
};

/**
 * Remove Users
 */
exports.removeUser = function removeUser(req, res, next) {
  
};


/**
 * Get Users
 */
exports.getUsers = function getUsers(req, res, next) {
  console.log(req._user);
  var options={password:0};
  // Retrieve all the Users
  UserDal.getCollection({},options, function getAllUsers(err, docs) {
    if (err) {
      return next(err);
    }
  
    res.json(docs);
  });
};


/**
 * Password Change Interface
 */
exports.passwordChange = function passwordChange(req, res, next) {
 
  var body = req.body;
  var now = moment().toISOString();

  var workflow = new events.EventEmitter();

  workflow.on('validateInput', function validateInput() {
    // req.checkBody('username', "Invalid User Name")
    //   .notEmpty();
    req.checkBody('old_password', "Invalid old_password")
      .notEmpty();
    req.checkBody('new_password', "Invalid new_password")
      .notEmpty();

    var validationErrors = req.validationErrors();
    if (validationErrors) {
      res.json(validationErrors);
    } else {
      workflow.emit('validateUsername')
    }
  });

  workflow.on('validateUsername', function validateUsername() {
  
    UserModel.findOne({ username: req._user.username}, function getUser(err, user) {
      if (err) {
        return next(err);
      }

      if(!user._id){
        res.status(404);
        res.json({error:true,msg:"user is not found",status:404});
        return;
      }
      else{
         workflow.emit('checkPassword', user);
      }
    });

  });
  workflow.on('checkPassword', function checkPassword(user) {
    user.checkPassword(body.old_password, function check(err, isOk) {
      if (err) {
        return next(err);
      }
      if (!isOk) {
       res.status(403);
    //    console.log(body.old_password);
        res.json({
          error:true,
           message: "Wrong old password",
           status:403
          });
        return;
      }
      else {
        workflow.emit('changePassword', user);
      }

    });
  });
  workflow.on('changePassword', function passwordChange(user) {
    bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(body.new_password, salt, function hashPasswd(err, hash) {
        if (err) {
          return next(err);
        }

        var now = moment().toISOString();
        UserDal.update({ _id: user._id }, { password: hash, updated_at: now,logged_in_before:true }, function updatepass(err, user) {
          if (err) {
            return next(err);
          }
          else {
            workflow.emit('respond');
          }
        });// end of update

      });// end of hash


    });// end of gensalt

  });
  workflow.on('respond', function respond() {
    res.json({ 
      error:false,
      message: "Sucessfully changed.",
      status:200
     })
  });
  workflow.emit('validateInput');

};

//Export By Pagination
exports.getByPagination = function getByPagination(req, res, next) {
 var query ={};
 // retrieve pagination query params
  var page   = req.query.page;
  var limit  = req.query.per_page;
 var queryOpts ={
   
   page:page,
   limit:limit
  };
//console.log(queryOpts);
  UserDal.getCollectionBYPagination(query,queryOpts, function getByPaginationCb(err, doc) {
    if (err) {
      return next(err);
    }
    if (!doc) {
      res.status(404),
        res.json({
          error: true,
          message: "Requested Data is not found",
          status: 404
        }
        );
    }
    res.json(doc);
  });

};

/**
 * Reset Password using Email
 */
exports.forgotPassword = function forgotPassword(req,res,next){
 
  var body = req.body;
  var now = moment().toISOString();

  var workflow = new events.EventEmitter();

  workflow.on('validateInput', function validateInput() {
    req.checkBody('email')
      .notEmpty().withMessage('Email should not be Empty').isEmail().withMessage('Should be valid email');

    var validationErrors = req.validationErrors();

    if (validationErrors) {
      res.status(400);
      res.json({ error: true, msg: validationErrors, status: 400 });
      return;
    }
    UserDal.get({ username: body.email }, function getUSerByEmail(err, doc) {
      if (err) {
        return next(err);
      }
      if (!doc._id) {
        res.status(404);
        res.json({
          error: true,
          msg: "Email is not registered",
          status: 404
        });
        return;
      }
      else {
        // Send Email to CLient
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'noreply@gebeya.com',
            pass: 'tas@2017'
          }
        });
       var fn={};
       if(doc.first_name){
         fn=doc.first_name;
       }else{
         fn={};
       }
        var mailOptions = {
          from: 'noreply@gebeya.com',
          to: body.email,
          subject: 'New login to TAS',
          html: 'Dear,'+fn+' </br> This is your new credential for '+doc.user_name+', Please use <b>pass@123</b> to login with TAS mobile app</br> Thank you!</br> Smart Africa©'
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json(error);
          } else {
            // console.log('Email sent: ' + info.response);
            // res.status(200);
            // res.json({ error: false, msg: "SUCESSFULLY SENT", status: 200 });
            workflow.emit('changePassword',doc);
          }
        });
      }
    });
  });
  workflow.on('changePassword', function passwordChange(user) {
    bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash('pass@123', salt, function hashPasswd(err, hash) {
        if (err) {
          return next(err);
        }
        var now = moment().toISOString();
        UserDal.update({ _id: user._id }, { password: hash, updated_at: now,logged_in_before:false}, function updatepass(err, user) {
          if (err) {
            return next(err);
          }
          else {
            workflow.emit('respond');
          }
        });// end of update
      });// end of hash
    });// end of gensalt
  });
  workflow.on('respond', function respond(){
    res.json({error:false,msg:"Suceesfully Reset, Please check your email",status:200});
  });
  workflow.emit('validateInput');
};

/**
 * THis is interface is used to send email using nodemailer
 */
exports.sendEmail = function password(req,res,next){
  var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yonasengida2017@gmail.com',
    pass: 'yoni@2016'
  }
});

var mailOptions = {
  from: 'yengida@gmail.com',
  to: 'yonasengida2017@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};


exports.preference= function preference(req,res,next){
 

  // console.log(req.body.categories[0].sectors[0]);
  var x=req.body.categories[0].sectors;
  console.log(x)
  // res.json(req.body.categories[0]);
  // SessionDal.update({ _id: doc._id }, 
  //   { $addToSet: { "keynotes": { keynote_id: keynote.keynote_id, topic: keynote.topic } } }, function pushKeynote(err, doc) {
  //   if (err) {
  //     return next(err);
  //   }
  UserDal.update({_id:req._user._id},
       {$addToSet: {"categories":  {category:req.body.categories[0].category,sectors:x},}},
  
     function pushPerefences(err,doc){
    if(err){
      return next(err);
    }
    // res.json(doc);
  });
  //   req.checkBody('sector')
  //   .notEmpty().withMessage('sector should not be empty').isMongoId().withMessage('Should be the right Id');
  
  //   var validationErrors = req.validationErrors();
  // if (validationErrors) {
  //   res.status(400);
  //   res.json(validationErrors);

  // }
};