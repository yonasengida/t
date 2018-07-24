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

// New Admin Schema Instance
var AdminSchema = new Schema({
  user:          { type: Schema.Types.ObjectId, ref: 'User' },
  picture:       { type: String },
  title:         { type: String },
  first_name:    { type: String },
  middle_name:   { type: String },
  last_name:     { type: String },
  email:         { type: String },
  mobile:        { type:String},
  city:          { type: String },
  country:       { type: String },
  address:       { type: String },
  gender:        { type: String },
  about:         { type: String },
  position:      { type: String },
  code:          { type: String },
  archived:      { type: Boolean , default:null},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  created_by :    { type: Schema.Types.ObjectId, ref: 'User' }
},{versionKey: false});
// add middleware to support pagination
AdminSchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Admin', AdminSchema);
