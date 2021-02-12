const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');
const validator = require('validator');
var InstallmentSchema = new mongoose.Schema({

    memberID: {
        type: Number,
        required: true,
        trim: true,
    },
    installment: {
        type: Number,
    },
    oldWithdrawal: {
        type: Number,
        required: true,
    },
    depositWithdrawal: {
        type: Number,
        required: true,
    },
    newWithdrawal: {
        type: Number,
        required: true,
    },
    totalWithdrawal: {
        type: Number,
        required: true,
    },
    intrestOnOldWithdrawal: {
        type: Double,
        required: true,
    },
    isInterestgiven: {
        type: Boolean,
        required: true,
    },
    isInstallmentGiven: {
        type: Boolean,
        required: true,
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
InstallmentSchema.plugin(autoIncrement.plugin, {
    model: 'Installments',
    field: 'InstallmentsID',
    startAt: 1,
    incrementBy: 1,
    unique: true,
});
var Installment = mongoose.model(
    'Installment',
    InstallmentSchema,
    'Installments'
);
module.exports = Installment;

