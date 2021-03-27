const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');
const {Installment, InstallmentSchema} = require('./Installment.js');
const {ExpenceSchema, Expence} = require('./Expense.js');

var HistorySchema = new mongoose.Schema({

  mandalID: {
    type: Number, 
    required: true,
    trim: true,
  },
  totalOldBalance: {
    type: Double,
    required: true,
    trim: true,
  },
  totalOldWithdrawal: {
    type: Double,
    required: true,
    trim: true,
  },
  totalIntrest: {
    type: Double,
    required: true,
    trim: true,
  },
  installments : {type : [InstallmentSchema]},
  totalIntrestDeposited: {
    type: Double,
    required: true,
    trim: true,
  },
  totalDepositedWithdrawal: {
    type: Double,
    required: true,
    trim: true,
  },
  totalNewWithdrawal: {
    type: Double,
    required: true,
    trim: true,
  },
  ontherExpences : [ExpenceSchema],
  ontherExpencesCost: {
    type: Double,
    required: true,
    trim: true,
  },
  totalNewBalance: {
    type: Double,
    required: true,
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
HistorySchema.plugin(autoIncrement.plugin, {
  model: 'Histories',
  field: 'historyID',
  startAt: 1,
  incrementBy: 1,
  unique: true,
});
var History = mongoose.model('History', HistorySchema, 'Histories');
module.exports = History;
//console.log(mongoose.connection);
