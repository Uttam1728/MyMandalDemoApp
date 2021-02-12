const Installment = require("../Models/Installment");
const express = require("express");
const { isValidObjectId } = require("mongoose");

var router = express.Router();


router.get('/', (req, res) => {
    Installment.find(function (err, docs) {
        if (!err) {
            return res.send(docs);
        } else {
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
});


router.get('/:id', (req, res) => {

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
});


/*
Sample Data
        "memberID" : 9,
        "installment": 500,
        "oldWithdrawal": 15000,
        "depositWithdrawal": 10000,
        "newWithdrawal": 0,
        "totalWithdrawal": 5000,
        "isInterestgiven": true,
        "isInstallmentGiven": false,
        "intrestOnOldWithdrawal": 250.30,


*/

router.post('/', (req, res) => {
    memberID = req.body.memberID;
    installment= req.body.installment;
    oldWithdrawal= req.body.oldWithdrawal;
    depositWithdrawal= req.body.depositWithdrawal;
    newWithdrawal= req.body.newWithdrawal;
    isInterestgiven= req.body.isInterestgiven;
    isInstallmentGiven= req.body.isInstallmentGiven;
    intrestOnOldWithdrawal= req.body.intrestOnOldWithdrawal;

    totalWithdrawal= oldWithdrawal - depositWithdrawal + newWithdrawal;

    var installment = new Installment({
        memberID : memberID,
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

    installment.save((err, docs) => {
        if (!err) {
            //console.log(docs);
            return res.send(docs);
        } else {
            return res.send(JSON.stringify(err, undefined, 2));
        }
    });
});


router.put('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400).send("In Valid Object Id");
    }
    memberID = req.body.memberID;
    installment= req.body.installment;
    oldWithdrawal= req.body.oldWithdrawal;
    depositWithdrawal= req.body.depositWithdrawal;
    newWithdrawal= req.body.newWithdrawal;
    isInterestgiven= req.body.isInterestgiven;
    isInstallmentGiven= req.body.isInstallmentGiven;
    intrestOnOldWithdrawal= req.body.intrestOnOldWithdrawal;

    totalWithdrawal= oldWithdrawal - depositWithdrawal + newWithdrawal;
    var installment = {
        memberID : memberID,
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
        installment,
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
});

router.delete('/:id', (req, res) => {

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
});
module.exports = router;
