'use strict';
/**
 * Survey Model Definition.
 */
/**
 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Survey Schema Instance
var SurveySchema = new Schema({
  
  bussiness:   { type: Schema.Types.ObjectId, ref: 'Bussiness'},
  type:        { type: Schema.Types.ObjectId, ref: 'BusinessType'},
  standard:    { type: Schema.Types.ObjectId, ref: 'Standard'},
  client:      { type: Schema.Types.ObjectId, ref: 'Client'},
  status:      { type: String },
  region:      { type: String },
  zone:        { type: String },
  woreda:      { type: String },
  kebele:      { type: String },
  street:      { type: String },
  city:      { type: String },
  subcity:      { type: String },
  quantity:    { type: Number },
  user:        { type: Schema.Types.ObjectId, ref: 'User'},
  archived :   { type: Boolean, default:false },
  archived_at: { type: Date, default:null},
  created_at:  { type: Date, default:new Date()},
  updated_at:  { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
SurveySchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Survey', SurveySchema);
