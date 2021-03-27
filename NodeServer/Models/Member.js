const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');
const validator = require('validator'); 

var MemberSchema = new mongoose.Schema({

  memberFirstName: {
    type: String,
    required: [true, 'આપનું નામ દાખલ કરો'],
    trim: true,
  }, 
  memberMiddleName: {
    type: String,
    required: [true, 'નામ દાખલ કરો'],
    trim: true,
  },
  memberLastName: {
    type: String,
    required: [true, 'આપની અટક દાખલ કરો'],
    trim: true,
  },
  memberImgSrc: {
    type: String,
    trim: true,
  },
  memberEmail: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email'],
    trim: true,
  },
  memberMobileNumbers: {
    type: [String],
    required: [true, 'મોબાઈલ નંબર દાખલ કરો'],
    trim: true,
  },
  memberAddress: {
    type: String,
    trim: true,
  },
  withdrawal: {
    type: Number,
    trim: true,
  },
  password : {
    type : String
  },
  saltSecret : {
    type : String
  },

  

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
MemberSchema.plugin(autoIncrement.plugin, {
  model: 'Members',
  field: 'memberID',
  startAt: 1,
  incrementBy: 1,
  unique: true,
});
var Member = mongoose.model('Member', MemberSchema, 'Members');
module.exports = Member;
//console.log(mongoose.connection);
