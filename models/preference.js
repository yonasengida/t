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

// New Preference Schema Instance
var Preferencechema = new Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  category:      { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  sectors:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sector'}],
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
Preferencechema.plugin(paginator);
// Expose the Preference Model
module.exports = mongoose.model('Preference', Preferencechema);
