'use strict';
/**
 *
 * Load Module Dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var crypto       = require('crypto');
var debug     = require('debug')('api:user-controller');
var async     = require('async');
var moment    = require('moment');
var validator = require('validator');
var _         = require('lodash');
var events    = require('events');


var UserModel       = require('../models/user');
var UserDal         = require('../dal/user');
var TokenDal        = require('../dal/token');
var AdminDal        = require('../dal/admin');
var ClientDal       = require('../dal/client');


var config      = require('../config');
var CustomError = require('../lib/custom-error');

function createToken() {
  debug('generate a token');

  var sha256 = crypto.createHash('sha256');
  var retry = 1;
  var randomBytes;

  try {
    randomBytes = crypto.randomBytes(config.TOKEN.RANDOM_BYTE_LENGTH).toString('hex');

    return tsha256.update(randomBytes).digest('base64');

  } catch(ex) {
    if(retry <= 5) {
      createToken();
    }

    throw ex;
  }
}


/**
 * Login a user
 *
 * @desc login a user using thei email and password.
 * Return profile and user data with an authentication token.
 */
//Login Controller
exports.login = function login(req, res, next) {
    debug('Login User');
     var body = req.body;
    var workflow = new events.EventEmitter();
     workflow.on('validateData', function validateData() {
      req.checkBody('username')
      .notEmpty().withMessage(config.errorResponse.userNameEmpty).isEmail().withMessage(config.errorResponse.userNameEmail);
      req.checkBody('password')
      .notEmpty().withMessage(config.errorResponse.passwordEmpty)
      .len(6, 20).withMessage(config.errorResponse.passwordLength);

        var errs = req.validationErrors();
        if (errs) {
            res.status(400);
            res.json({
                error:true,
                msg:errs,
                status:400});
            return;
        }
        workflow.emit('validateUsername');
    });

    workflow.on('validateUsername', function validateUsername() {
        debug('Auth: Validate User Name')
        UserModel.findOne({username: req.body.username }, function done(err, user) {
            if(err){
                return next(err);
            }
            if(!user) {
                res.status(404);
                res.json({
                    error:true,
                    msg: "User Not Found!",
                    status:404
                });
                return;
            }
            workflow.emit('validateUserpassword', user);
        });
    });
    workflow.on('validateUserpassword', function validateUserpassword(user) {
       debug('Auth: Valdiate Password');
       
        user.checkPassword(body.password, function done(err, isOk) {
            if (err) {
                return next(err);
            }
             if (!isOk) {
                res.status(403);
                res.json({
                    error:true,
                    msg: "Wrong credentials",
                    status:403
                });
                return;
            }
          workflow.emit('generateToken', user);
        });

    });

    workflow.on('generateToken', function generateToken(user) {
        debug('Auth: Generate Token')

        TokenDal.get({ user: user._id}, function done(err, token) {
            if (err) {
                return next(err);
            }
            crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buff) {
                if (err) {
                    return next(err);
                }
                var tokenValue = buff.toString('base64');
                // Generate a new token
                if (!token._id) {
                    TokenDal.create({ user: user._id, value: tokenValue, revoked: false }, function createToken(err, token) {
                        if (err) {
                            return next(err);
                        }
                        // console.log(token.value)
                        workflow.emit('respond', user, token.value);

                    });
                } else {
                    // Update Value
                    TokenDal.update({ _id: token._id }, { value: tokenValue, revoked: false }, function updateToken(err, token) {
                        if (err) {
                            return next(err);
                        }
                        console.log(token.value)
                        workflow.emit('respond', user, token.value);
                    });
                }

            });
        });
    });
    workflow.on('respond', function respond(user, tokenValue) {
        debug('Auth:Respond')
        var now = moment().toISOString();
        UserDal.update({ _id: user._id }, { last_login: now }, function updateLogin(err, user) {
            if (err) {
                return next(err);
            }
            user = user.toJSON();
            delete user.password;
            req._user = user;

            res.json({
                token: tokenValue,
                user: user,
            });
        });
    });

    workflow.emit('validateData');

};

/**
 * Log out a user.
 */
exports.logout = function logoutUser(req, res, next) {
  debug('logout user');

  if(!req._user) {
    return next(CustomError({
      name: 'LOGOUT_ERROR'
    }));
  }
  var user  = req._user;
  var now   = moment().toISOString();
  var query = {
    user: req._user._id
  };
  var updates = {
    $set: {
      value: 'EMPTY',
      revoked: true
    }
  };

  Token.update(query, updates, function(err, token) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message
      }));
    }

    res.json({
      logged_out: true
    });
  });
};


exports.accessControl = function accessControl(roles, action) {
  debug('Access controll management');

  action = action || 'ALLOW';

  return function (req, res, next) {
    var user = req._user;

    if(!user) {
      return next(CustomError({
        name: 'AUTHORIZATION_ERROR',
        message: 'Please Login or register to continue'
      }));
    }

    var userRole  = user.role;
    var userRealm = user.realm;
    var allowed   = false;

    roles = Array.isArray(roles) ? roles: [roles];

    roles.forEach(function(role) {
      switch(role) {
        case '*':
        case userRole:
        case userRealm:
          allowed = true;
          break;
      }

    });

    if(!allowed) {
      return next(CustomError({
        name: 'AUTHORIZATION_ERROR'
      }));

    } else {
      return next();

    }

  };
};


