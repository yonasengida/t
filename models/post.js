'use strict';
/**
 * Post Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Post Schema Instance
var PostSchema = new Schema({
  subject:       { type: String },
  content:       { type: String },
  category:      { type: Schema.Types.ObjectId, ref: 'Category'},
  type :         { type: Schema.Types.ObjectId,ref: 'Type'},
  image :        { type: String},
  video :        { type: String},
  comments:      [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  complains:      [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  status:        {type: String, default:'active'},
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
PostSchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Post', PostSchema);
