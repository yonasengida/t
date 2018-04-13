'use strict';
/**
 * Service Provider Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Service Provider Schema Instance
var ServiceProviderSchema = new Schema({
  user:               { type: Schema.Types.ObjectId, ref: 'User' },
  services:           [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  picture:            { type: String },
  name:               { type: String },
  email:              { type: String },
  mobile:             [{ type:String}],
  city:               { type: String },
  country:            { type: String },
  address:            { type: String },
  about:              { type: String },
  fax:                { type: String },
  pobox:              { type: String },
  tel:                [{ type: String}],
  facebook_link:      { type:String},
  twitter_link:       { type:String},
  instagram_link:     { type:String},
  website_link:       { type:String},
  linkedin_link:      { type:String},
  google_link:        { type:String},
  established_date:   { type: Date},
  archived :          { type: Boolean, default:false},
  archived_at:        { type: Date, default:null},
  created_at:         { type: Date},
  updated_at:         { type: Date, default:null},
},{versionKey: false});
// add middleware to support pagination
ServiceProviderSchema.plugin(paginator);
// Expose the ServiceProvider Model
module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
