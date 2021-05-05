const express = require("express");
const { isValidObjectId } = require("mongoose");
const Mandal = require('../Models/Mandal');
const { IfNullOrEmptyOrBlankThan } = require('../utils/strings');
const { MemberMandal } = require("../Models/MemberMandal");


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

module.exports.AddMandal = (req, res, next) => {
    console.log('in add ADD MANDAL', JSON.parse(req.body.mandal), req.file.filename);
    tempMandalObj = JSON.parse(req.body.mandal);
    var mandalName = tempMandalObj.mandalName;
    var mandalLogosrc = 'http://localhost:3000/images/' + req.file.filename;
    var installmentValue = tempMandalObj.installmentValue;
    var totalWithdrawal = tempMandalObj.totalWithdrawal;
    var totalBalence = tempMandalObj.totalBalence;
    var intrestRate = tempMandalObj.intrestRate;
    var history = tempMandalObj.history;
    var createdDate = Date.now();
    var createdBy = tempMandalObj.createdBy;
    var lastUpdatedDate = null;
    var lastUpdatedBy = null;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //

    var mandal = new Mandal({
        mandalName: mandalName,
        mandalLogosrc: mandalLogosrc,
        installmentValue: installmentValue,
        totalWithdrawal: totalWithdrawal,
        totalBalence: totalBalence,
        intrestRate: intrestRate,
        history: history,
        createdDate: createdDate,
        createdBy: createdBy,
        lastUpdatedDate: lastUpdatedDate,
        lastUpdatedBy: lastUpdatedBy,
    });
    console.log('in add', mandal);
    mandal.save((err, docs) => {
        if (!err) {
            //console.log(docs);
            return res.send(docs);
        } else {
            // if (err.code == 11000)
            //     res.status(422).send(JSON.stringify(err, undefined, 2));
            // else
            console.log('in err',err);
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
            if (docs){
              MemberMandal.deleteMany({ mandalId: docs._id }, function(err) {
                console.log(err);
              });
                  res.send(docs);
            }
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


module.exports.SearchMandal = (req, res) => {
    var searchparam = JSON.parse(req.query.searchparam);
    console.log(searchparam)
    var isPresentdate = IfNullOrEmptyOrBlankThan(searchparam.fromdate,null);
    var isPresentName = IfNullOrEmptyOrBlankThan(searchparam.mandalname,null);
    var searchObj = {};
    if(isPresentName){
        searchObj.mandalName = { $regex: '.*' + searchparam.mandalname + '.*',
            $options: 'i'
        };
    }
    if(isPresentdate){
        searchObj.createdDate = { $gte: searchparam.fromdate,
            $lte: searchparam.todate
        };
    }
    console.log(searchObj)
    var query = Mandal.find(searchObj).limit(100);
    query.exec(function (err, docs) {
        if (!err) {

            return res.send(docs);
        } else {

            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
};
