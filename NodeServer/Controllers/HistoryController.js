const History = require("../Models/History");
const express = require("express");
const { isValidObjectId } = require("mongoose");


module.exports.getAll =  (req, res) => {
    History.find(function (err, docs) {
        if (!err) {
            return res.send(docs);
        } else {
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
};


module.exports.getById =  (req, res) => {

    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
    History.findById(req.params.id, (err, docs) => {
        if (!err) {
            if (docs)
                res.send(docs);
            else
                //send specific status code status - it is remaining
                res.send('-1');
        } else {
            res.send('Error retriving in data' + JSON.stringify(err, undefined, 2));
        }
    });
};



/*
        Sample Data
        "mandalID"  : 1,   
        "totalOldBalance"  : 150000,
        "totalOldWithdrawal"  : 10000,
        "totalIntrest"  : 0,
        "totalIntrestDeposited"  : 0,
        "totalDepositedWithdrawal"  : 0,
        "totalNewWithdrawal"  : 0,
        "ontherExpencesCost"  : 0,
        "totalNewBalance"  : 0,

*/

module.exports.AddHistory =  (req, res) => {
    var mandalID = req.body.mandalID;   
    var totalOldBalance = req.body.totalOldBalance;
    var totalOldWithdrawal = req.body.totalOldWithdrawal;
    var totalIntrest = req.body.totalIntrest;
    var totalIntrestDeposited = req.body.totalIntrestDeposited;
    var totalDepositedWithdrawal = req.body.totalDepositedWithdrawal;
    var totalNewWithdrawal = req.body.totalNewWithdrawal;
    var ontherExpencesCost = req.body.ontherExpencesCost;
    var totalNewBalance = req.body.totalNewBalance;
    

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //


    var historyModel = new History({
        mandalID  : mandalID,   
        totalOldBalance  : totalOldBalance,
        totalOldWithdrawal  : totalOldWithdrawal,
        totalIntrest  : totalIntrest,
        totalIntrestDeposited  : totalIntrestDeposited,
        totalDepositedWithdrawal  : totalDepositedWithdrawal,
        totalNewWithdrawal  : totalNewWithdrawal,
        ontherExpencesCost  : ontherExpencesCost,
        totalNewBalance  : totalNewBalance,
        installments : null,
        ontherExpences : null,
        createdDate: Date.now(),
        createdBy: req.body.createdBy,
        lastUpdatedDate: null,
        lastUpdatedBy: null,
    });

    historyModel.save((err, docs) => {
        if (!err) {
            //console.log(docs);
            return res.send(docs);
        } else {
            console.log(err);
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
};


module.exports.ChangeDetailsOfHistoryById =  (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    var mandalID = req.body.mandalID;   
    var totalOldBalance = req.body.totalOldBalance;
    var totalOldWithdrawal = req.body.totalOldWithdrawal;
    var totalIntrest = req.body.totalIntrest;
    var totalIntrestDeposited = req.body.totalIntrestDeposited;
    var totalDepositedWithdrawal = req.body.totalDepositedWithdrawal;
    var totalNewWithdrawal = req.body.totalNewWithdrawal;
    var ontherExpencesCost = req.body.ontherExpencesCost;
    var totalNewBalance = req.body.totalNewBalance;
    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //


    var historyModel = {
        mandalID  : mandalID,   
        totalOldBalance  : totalOldBalance,
        totalOldWithdrawal  : totalOldWithdrawal,
        totalIntrest  : totalIntrest,
        totalIntrestDeposited  : totalIntrestDeposited,
        totalDepositedWithdrawal  : totalDepositedWithdrawal,
        totalNewWithdrawal  : totalNewWithdrawal,
        ontherExpencesCost  : ontherExpencesCost,
        totalNewBalance  : totalNewBalance,
        installments : [],
        ontherExpences : [],
        lastUpdatedDate: Date.now(),
        lastUpdatedBy: req.body.createdBy,
    };
    // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
    History.findByIdAndUpdate(req.params.id,
        historyModel,
        { new: true },
        (err, docs) => {
            if (!err) {
                if (docs)
                    res.send(docs);
                else
                    //send specific status code status - it is remaining
                    res.send('-1');
            } else {
                console.log('Error saving data', JSON.stringify(err, undefined, 2));
            }
        });
};

module.exports.RemoveHistoryById = (req, res) => {

    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    // if ObjectId not passed than use findOneAndRemove(filter,(err),docs)
    History.findByIdAndDelete(req.params.id, (err, docs) => {
        if (!err) {
            if (docs)
                res.send(docs);
            else
                //send specific status code status - it is remaining
                res.send('-1');
        } else {
            console.log('Error saving data', JSON.stringify(err, undefined, 2));
        }
    });
};