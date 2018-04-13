'use strict';
/**
 * Sector Model Definition.

 * Load Module Dependencies.
 */
const mongoose  = require('mongoose');
const moment    = require('moment');
const paginator = require('mongoose-paginate');
var Schema = mongoose.Schema;

// New Sector Schema Instance
var SectorSchema = new Schema({
  name:                { type: String },
  icon_name:          { type: String },
  // parent:        { type: Schema.Types.ObjectId, ref: 'Sector', default:null },
  // childs:        [{ type: Schema.Types.ObjectId, ref: 'Sector'}],
  archived :     { type: Boolean, default:false},
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
SectorSchema.plugin(paginator);
// Expose the Admin Model
module.exports = mongoose.model('Sector', SectorSchema);
