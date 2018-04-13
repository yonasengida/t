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


var CostSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product'},
  parameter: { type: Schema.Types.ObjectId, ref: 'Parameter'},                      
  opt_name: { type:String },
  est_price:{ type:Number},                
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false },
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date, default:new Date()},
  updated_at:    { type: Date, default:null},
  
},{versionKey: false});
// add middleware to support pagination
CostSchema.plugin(paginator);
// Expose the Product Model
module.exports = mongoose.model('Cost',CostSchema);
