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


var ProductSchema = new Schema({
  name:          { type: String },
  icon_name:     { type: String },
  sector :       { type: Schema.Types.ObjectId, ref:'Sector' },
  service:       { type: Schema.Types.ObjectId, ref:'Service'},
  parameters:    [{ type: Schema.Types.ObjectId, ref: 'Parameter' }],
  created_by:    { type: Schema.Types.ObjectId, ref: 'User' },
  archived :     { type: Boolean, default:false  },
  archived_at:   { type: Date, default:null      },
  created_at:    { type: Date, default:new Date()},
  updated_at:    { type: Date, default:null      }

  
},{versionKey: false});
// add middleware to support pagination
ProductSchema.plugin(paginator);
// Expose the Product Model
module.exports = mongoose.model('Product',ProductSchema);
