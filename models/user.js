'use strict';
/**
 * Load Module Depencencies
 */
var mongoose  = require('mongoose');
var bcrypt    = require('bcryptjs');
var config    = require('../config');
var moment    = require('moment');

var paginate  = require('mongoose-paginate');
var Schema = mongoose.Schema;

// creating schema for user
var UserSchema = new Schema({
  
  client:         { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
  admin:          { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  username:       { type: String },
  password:       { type: String },
  last_login:     { type: Date   },
  realm:          { type:String  },
  role:           { type: String },
  status:         { type:String, default: 'active' },
  created_at:             { type:Date},
  updated_at:             { type:Date },
  archived:               { type: Boolean, default: false },
  archived_at:            { type: Date, default: null },
  reset_password_token:   { type: String },
  reset_password_expires: { type: Date },
  password_changed:       { type: Boolean}

},{versionKey: false});
/**
 * Model attributes to expose
 */
UserSchema.statics.whitelist = {
      _id: 1,
      serviceprovider:     1,
      client:     1,
      admin:         1,
      username:     1,
      last_login:  1,
       realm:         1,
      role:       1,
      status:      1,
      created_at:   1,
      updated_at:          1,
      archived:             1,
      archived_at:            1,
      reset_password_token:  1,
      reset_password_expires: 1,
      password_changed:      1
};
/**
 * Pagination
 */
UserSchema.plugin(paginate);

// Add a pre save hook
UserSchema.pre('save', function preSaveHook(next) {
  let model = this;

  bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
    if(err) {
      return next(err);
    }

    bcrypt.hash(model.password, salt, function hashPasswd(err, hash) {
      if(err) {
        return next(err);
      }
      var now = moment().toISOString();
      model.password = hash;
      model.date_created = now;
      model.last_modified = now;

      next();

    });
  });

});

// Compare Passwords Method
UserSchema.methods.checkPassword = function checkPassword(password, cb) {
//  console.log("hello");

  bcrypt.compare(password, this.password, function done(err, res) {
    if(err) {
     return cb(err);
    }

    cb(null, res);
   
   console.log(res);
  });

};

// Expose the User Model
module.exports = mongoose.model('User', UserSchema);
