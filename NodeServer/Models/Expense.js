const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');

var ExpenceSchema = new mongoose.Schema({

  reason: {
    type: String,
    required: [true, 'કારણ દાખલ કરો'],
    trim: true,
  },
  cost: {
    type: Double,
    required: [true, 'રકમ દાખલ કરો'],
    trim: true,
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
ExpenceSchema.plugin(autoIncrement.plugin, {
  model: 'Expences',
  field: 'expenceID',
  startAt: 1,
  incrementBy: 1,
  unique: true,
});
var Expence = mongoose.model('Expence', ExpenceSchema, 'Expences');
module.exports = Expence;
//console.log(mongoose.connection);
