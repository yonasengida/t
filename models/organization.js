'use strict';
/**
 * Admin Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Organization Schema Instance
var OrganizationSchema = new Schema({
  user:          {type: Schema.Types.ObjectId, ref: 'User' },
  picture:       { type: String },
  org_name:      { type: String },
  email:         { type: String },
  mobile:        [{ type:String}],
  city:          { type: String },
  country:       { type: String },
  address:       { type: String },
  about:         { type: String },
  fax:           { type: String },
  pobox:         { type: String },
  tel:           [{ type: String}],
  facebook_link:      { type:String},
  twitter_link:       { type:String},
  instagram_link:     { type:String},
  website_link:       { type:String},
  linkedin_link:      { type:String},
  google_link:        { type:String},
  established_date:   { type: Date},
  org_follower:          [{type: Schema.Types.ObjectId, ref: 'Organization'}],
  client_follower:       [{type: Schema.Types.ObjectId, ref: 'Client'}],
  org_folowing:          [{type: Schema.Types.ObjectId, ref: 'Organization'}],
  client_following:      [{type: Schema.Types.ObjectId, ref: 'Client'}],
  archived :     { type: Boolean, default:false},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
},{versionKey: false});
// add middleware to support pagination
OrganizationSchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Organization', OrganizationSchema);
