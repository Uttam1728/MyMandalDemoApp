const {Installment} = require("../Models/Installment");
const express = require("express");
const { isValidObjectId } = require("mongoose");



module.exports.getAll = (req, res) => {
    Installment.find(function (err, docs) {
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
    Installment.findById(req.params.id, (err, docs) => {
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
        {
            "memberID" : 9,
            "installment": 500,
            "oldWithdrawal": 15000,
            "depositWithdrawal": 10000,
            "newWithdrawal": 0,
            "totalWithdrawal": 5000,
            "isInterestgiven": true,
            "isInstallmentGiven": false,
            "intrestOnOldWithdrawal": 250.30,
            "createdBy"  : 13245
        
        }

*/

module.exports.AddInstallment =   (req, res) => {
    var memberID = req.body.memberID;
    var installment = req.body.installment;
    var oldWithdrawal = req.body.oldWithdrawal;
    var depositWithdrawal = req.body.depositWithdrawal;
    var newWithdrawal = req.body.newWithdrawal;
    var isInterestgiven = req.body.isInterestgiven;
    var isInstallmentGiven = req.body.isInstallmentGiven;
    var intrestOnOldWithdrawal = req.body.intrestOnOldWithdrawal;
    var totalWithdrawal = req.body.totalWithdrawal;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //


    var installmentModel = new Installment({
        memberID: memberID,
        installment: installment,
        oldWithdrawal: oldWithdrawal,
        depositWithdrawal: depositWithdrawal,
        newWithdrawal: newWithdrawal,
        totalWithdrawal: totalWithdrawal,
        isInterestgiven: isInterestgiven,
        isInstallmentGiven: isInstallmentGiven,
        intrestOnOldWithdrawal: intrestOnOldWithdrawal,
        createdDate: Date.now(),
        createdBy: req.body.createdBy,
        lastUpdatedDate: null,
        lastUpdatedBy: null,
    });

    installmentModel.save((err, docs) => {
        if (!err) {
            //console.log(docs);
            return res.send(docs);
        } else {
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
};


module.exports.ChangeDetailsOfInstallmentById = (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    var memberID = req.body.memberID;
    var installment = req.body.installment;
    var oldWithdrawal = req.body.oldWithdrawal;
    var depositWithdrawal = req.body.depositWithdrawal;
    var newWithdrawal = req.body.newWithdrawal;
    var isInterestgiven = req.body.isInterestgiven;
    var isInstallmentGiven = req.body.isInstallmentGiven;
    var intrestOnOldWithdrawal = req.body.intrestOnOldWithdrawal;
    var totalWithdrawal = req.body.totalWithdrawal;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //


    var installmentModel = {
        memberID: memberID,
        installment: installment,
        oldWithdrawal: oldWithdrawal,
        depositWithdrawal: depositWithdrawal,
        newWithdrawal: newWithdrawal,
        totalWithdrawal: totalWithdrawal,
        isInterestgiven: isInterestgiven,
        isInstallmentGiven: isInstallmentGiven,
        intrestOnOldWithdrawal: intrestOnOldWithdrawal,
        lastUpdatedDate: Date.now(),
        lastUpdatedBy: req.body.createdBy,
    };
    // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
    Installment.findByIdAndUpdate(req.params.id,
        installmentModel,
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

module.exports.RemoveInstallmentById = (req, res) => {

    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    // if ObjectId not passed than use findOneAndRemove(filter,(err),docs)
    Installment.findByIdAndDelete(req.params.id, (err, docs) => {
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
