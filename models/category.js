'use strict';
/**
 * Category Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Category Schema Instance
var CategorySchema = new Schema({
  name:             { type: String },
  am_name:          { type: String },
  or_name:          { type: String },
  tig_name:         { type: String },
  type:          { type: String },
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false },
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date, default:new Date()},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
CategorySchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Category', CategorySchema);
