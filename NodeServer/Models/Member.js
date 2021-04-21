const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');
const validator = require('validator'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    required: [true, 'આપની Email દાખલ કરો'],
    trim: true,
    unique : true
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
    type : String,
    required: [true,'Password can\'t be empty'],
    minlength : [4,'Password must be atleast 4 character long']
  },
  saltSecret : {
    type : String
  },
  mandals:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'Mandal'}
  ],
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

// Events
MemberSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
});

// Methods
MemberSchema.methods.verifyPassword = function (password) {
  console.log('In model');
  return bcrypt.compareSync(password, this.password);
};

MemberSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id, FirstName : this.FirstName},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
};

var Member = mongoose.model('Member', MemberSchema, 'Members');
exports.Member = Member;
exports.MemberSchema = MemberSchema;
//console.log(mongoose.connection);
 