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

// New Bussiness Schema Instance
var BusinessSchema = new Schema({
  name:          { type: String },
  type:          { type: Schema.Types.ObjectId, ref: 'BussinessType'},
  user:          { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false },
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date, default:new Date()},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
BusinessSchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Business', BusinessSchema);
