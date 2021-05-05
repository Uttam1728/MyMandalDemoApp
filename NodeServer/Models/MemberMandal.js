const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');
const validator = require('validator');



var MemberMandalSchema = new mongoose.Schema({

  memberId : { type : mongoose.Schema.Types.ObjectId, ref:'Member', required: true },

  mandalId : { type : mongoose.Schema.Types.ObjectId, ref:'Mandal', required: true },

  isAdmin : { type : Number, required : true, default: 0 },

  createdDate: {
    type: Date,
    required: [true, 'not proper request']
  },
  createdBy: {
    type: Number,
    required: [true, 'not proper request']
  },
  lastUpdatedDate: {
    type: Date
  },
  lastUpdatedBy: {
    type: Number
  },

});

autoIncrement.initialize(mongoose.connection);
MemberMandalSchema.plugin(autoIncrement.plugin, {
  model: 'MemberMandals',
  field: 'memberMandalID',
  startAt: 1,
  incrementBy: 1,
  unique: true,
});



var MemberMandal = mongoose.model('MemberMandal', MemberMandalSchema, 'MemberMandals');
exports.MemberMandal = MemberMandal;
exports.MemberMandalSchema = MemberMandalSchema;
//console.log(mongoose.connection);
