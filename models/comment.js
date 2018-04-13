'use strict';
/**
 * Comment Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Comment Schema Instance
var CommentSchema = new Schema({
  post:          { type: Schema.Types.ObjectId, ref: 'Post' },
  comment:       { type: String },
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived:      { type: Boolean , default:false},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
},{versionKey: false});
// add middleware to support pagination
CommentSchema.plugin(paginator);
// Expose the Client Model
module.exports = mongoose.model('Comment', CommentSchema);
