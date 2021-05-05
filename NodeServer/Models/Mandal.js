const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var autoIncrement = require('mongoose-auto-increment');
const validator = require('validator');
const {HistorySchema} = require("./History");


var MandalSchema = new mongoose.Schema({

    mandalName: {
        type: String,
        required: [true, 'આપનું નામ દાખલ કરો'],
        trim: true,
        unique : true
    },

    mandalLogosrc: {
        type: String,
        trim: true,
    },

    installmentValue: {
        type: Number,
        trim: true,
    },
    totalWithdrawal: {
        type: Number,
        trim: true,
    },
    totalBalence: {
        type: Number,
        trim: true,
    },
    intrestRate: {
        type: Double,
        required: true,
    },
    history : { type : [HistorySchema] },

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
MandalSchema.plugin(autoIncrement.plugin, {
    model: 'Mandals',
    field: 'mandalID',
    startAt: 10,
    incrementBy: 1,
    unique: true,
});


var Mandal = mongoose.model('Mandal', MandalSchema, 'Mandals');
module.exports = Mandal;
//console.log(mongoose.connection);
