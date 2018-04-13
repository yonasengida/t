'use strict';
/**
 * Parameter Model Definition.

 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const Schema = mongoose.Schema;

//New Parameter Schema Instance
const ParameterSchema = new Schema({
  product:       { type: Schema.Types.ObjectId, ref: 'Product'},
  name:          { type: String },
  options:       [{ type: String }],
  archived :     { type: Boolean, default:false},
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
ParameterSchema.plugin(paginator);
// Expose the Parameter Model
module.exports = mongoose.model('Parameter', ParameterSchema);
