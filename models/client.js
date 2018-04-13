'use strict';
/**
 * Client Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Client Schema Instance
var ClientSchema = new Schema({
  user:          { type: Schema.Types.ObjectId, ref: 'User' },
  picture:       { type: String },
  title:         { tdype: String },
  first_name:    { type: String },
  middle_name:   { type: String },
  last_name:     { type: String },
  org_name:      { type: String },
  email:         { type: String },
  mobile:        { type: String },
  fax:           { type: String },
  pobox:         { type: String },
  tel:           { type: String },
  city:          { type: String },
  country:       { type: String },
  address:       { type: String },
  gender:        { type: String },
  about:         { type: String },
  facebook_link:      { type:String},
  twitter_link:       { type:String},
  instagram_link:     { type:String},
  linkedin_link:      { type:String},
  google_link:        { type:String},
  date_of_birth:      { type: Date },
  language :          { type: String },
  following:          [{type: Schema.Types.ObjectId, ref: 'Client'}],
  follower:           [{type: Schema.Types.ObjectId, ref: 'Client'}],
  archived:           { type: Boolean , default:false},
  archived_at:        { type: Date, default:null},
  created_at:         { type: Date},
  updated_at:         { type: Date, default:null},
},{versionKey: false});
// add middleware to support pagination
ClientSchema.plugin(paginator);
// Expose the Client Model
module.exports = mongoose.model('Client', ClientSchema);
