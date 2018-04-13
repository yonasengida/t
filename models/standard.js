'use strict';
/**
 * Business Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Standard Schema Instance
var StandardSchema = new Schema({
  name:          { type: String },
  business:          { type: Schema.Types.ObjectId, ref: 'Bussiness'},
  user:          { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false },
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date, default:new Date()},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
StandardSchema.plugin(paginator);
// Expose the Standard Model
module.exports = mongoose.model('Standard', StandardSchema);
