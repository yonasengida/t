'use strict';
/**
 * Service Model Definition.

 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const Schema = mongoose.Schema;

// New Service Schema Instance
const ServiceSchema = new Schema({
  name:               { type: String },
  icon_name:          { type: String },
  archived :     { type: Boolean, default:false},
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
ServiceSchema.plugin(paginator);
// Expose the Service Model
module.exports = mongoose.model('Service', ServiceSchema);
