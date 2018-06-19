'use strict';
/**
 * Type Model Definition.

 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Type Schema Instance
var TypeSchema = new Schema({
  name:          { type: String },
  icon_name:     { type: String }, 
  archived :     { type: Boolean, default:false},
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
TypeSchema.plugin(paginator);
// Expose the Type Model
module.exports = mongoose.model('Type', TypeSchema);
