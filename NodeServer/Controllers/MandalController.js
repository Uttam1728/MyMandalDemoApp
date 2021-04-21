const express = require("express");
const { isValidObjectId } = require("mongoose");
const Mandal = require('../Models/Mandal');


module.exports.getAll = (req, res, next) => {
    console.log('in all');
    Mandal.find(function (err, docs) {
        if (!err) {
            return res.send(docs);
        } else {
            if (!docs) {
                return res.send(-21);
            }
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
};


module.exports.getById = (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))

    Mandal.findById(req.params.id, (err, docs) => {
        if (!docs) {
            res.send('Error retriving in data' + JSON.stringify(err, undefined, 2));
        }
        else if (err) {
            res.send('Error retriving in data' + JSON.stringify(err, undefined, 2));
        }
        else {
            res.send(docs);
        }
    });
};


/*
    Sample Data
    mandalName: "testMandal",
    mandalLogosrc: "test",
    installmentValue: 500,
    totalWithdrawal:150000,
    totalBalence: 150000,
    intrestRate:1.5,
    history : [],
    mandalAdmins : [],
    mandalMembers: [],
    "createdDate"  : Date.now(),
    "createdBy"  : 13245,
    "lastUpdatedDate"  : null,
    "lastUpdatedBy"  : null,
*/

module.exports.AddMandal = (req, res) => {
    console.log('in add', req.body);

    var mandalName = req.body.mandalName;
    var mandalLogosrc = req.body.mandalLogosrc;
    var installmentValue = req.body.nstallmentValue;
    var totalWithdrawal = req.body.totalWithdrawal;
    var totalBalence = req.body.totalBalence;
    var intrestRate = req.body.intrestRate;
    var history = req.body.history;
    var mandalAdmins = req.body.mandalAdmins;
    var mandalMembers = req.body.mandalMembers;
    var createdDate = Date.now();
    var createdBy = req.body.createdBy;
    var lastUpdatedDate = null;
    var lastUpdatedBy = null;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //

    console.log('in add');
    var mandal = new Mandal({
        mandalName: mandalName,
        mandalLogosrc: mandalLogosrc,
        installmentValue: installmentValue,
        totalWithdrawal: totalWithdrawal,
        totalBalence: totalBalence,
        intrestRate: intrestRate,
        history: history,
        mandalAdmins: mandalAdmins,
        mandalMembers: mandalMembers,
        createdDate: createdDate,
        createdBy: createdBy,
        lastUpdatedDate: lastUpdatedDate,
        lastUpdatedBy: lastUpdatedBy,
    });
    console.log('in add', Mandal);
    mandal.save((err, docs) => {
        if (!err) {
            //console.log(docs);
            return res.send(docs);
        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
};


module.exports.ChangeDetailsOfMandalById = (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    var mandalName = req.body.mandalName;
    var mandalLogosrc = req.body.mandalLogosrc;
    var installmentValue = req.body.nstallmentValue;
    var totalWithdrawal = req.body.totalWithdrawal;
    var totalBalence = req.body.totalBalence;
    var intrestRate = req.body.intrestRate;
    var history = req.body.history;
    var mandalAdmins = req.body.mandalAdmins;
    var mandalMembers = req.body.mandalMembers;
    var lastUpdatedDate = Date.now();
    var lastUpdatedBy = req.body.createdBy;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //

    var mandal = {
        mandalName: mandalName,
        mandalLogosrc: mandalLogosrc,
        installmentValue: installmentValue,
        totalWithdrawal: totalWithdrawal,
        totalBalence: totalBalence,
        intrestRate: intrestRate,
        history: history,
        mandalAdmins: mandalAdmins,
        mandalMembers: mandalMembers,
        lastUpdatedDate: lastUpdatedDate,
        lastUpdatedBy: lastUpdatedBy,
    };

    // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
    Mandal.findByIdAndUpdate(req.params.id,
        mandal,
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


module.exports.RemoveMandalById = (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    // if ObjectId not passed than use findOneAndRemove(filter,(err),docs)
    Mandal.findByIdAndDelete(req.params.id, (err, docs) => {
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


module.exports.getAllMandalName = (req, res) => {
    var query = Mandal.find({}).select('mandalName');
    query.exec(function (err, docs) {
        if (!err) {
            return res.send(docs);
        } else {
            if (!docs) {
                return res.send(-21);
            }
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
};
