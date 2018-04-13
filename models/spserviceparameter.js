'use strict';
/**
 * ServiceParameter Model Definition.

 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
const Schema = mongoose.Schema;

//New ServiceParameter Schema Instance
const SPServiceParameterSchema = new Schema({
  service:         { type: Schema.Types.ObjectId, ref: 'Service'},
  client:          { type: Schema.Types.ObjectId, ref: 'Client'},
  parameter:       { type: Schema.Types.ObjectId, ref: 'Parameter'},
  value:           [{ type: String }],
  archived :       { type: Boolean, default:false},
  created_by:      { type: Schema.Types.ObjectId, ref: 'User'},
  archived_at:     { type: Date, default:null},
  created_at:      { type: Date},
  updated_at:      { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
SPServiceParameterSchema.plugin(paginator);
// Expose the Service Parameter Model
module.exports = mongoose.model('SPServiceParameter', SPServiceParameterSchema);
