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

// New Group Schema Instance
var GroupSchema = new Schema({
  name:      { type: String },
  parameters:[
     { 
         param_name: { type: String},        
         options:[
             
               {  opt_name: { type:String }}
                
             
         ]
        }
  ],
  created_by:    { type: Schema.Types.ObjectId, ref: 'User'},
  archived :     { type: Boolean, default:false },
  archived_at:   { type: Date, default:null},
  created_at:    { type: Date, default:new Date()},
  updated_at:    { type: Date, default:null},
  },{versionKey: false});
// add middleware to support pagination
GroupSchema.plugin(paginator);
// Expose the Group Model
module.exports = mongoose.model('Group',GroupSchema);
