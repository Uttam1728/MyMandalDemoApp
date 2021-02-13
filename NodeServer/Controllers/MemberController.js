const Member = require("../Models/Member");
const express = require("express");
const { isValidObjectId } = require("mongoose");

var router = express.Router();


router.get('/', (req, res) => {
    Member.find(function (err, docs) {
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
    Member.findById(req.params.id, (err, docs) => {
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
        "memberFirstName" : "test"
        "memberMiddleName" : "middle"
        "memberLastName" : "last"
        "memberImgSrc" : "/img",
        "memberEmail" : 'test@email.com',
        "memberMobileNumbers" : ["123456789","465789123"]
        "memberAddress" : "testAddress",
        "withdrawal" : "50000"
        "createdDate"  : Date.now(),
        "createdBy"  : 13245, 
        "lastUpdatedDate"  : null,
        "lastUpdatedBy"  : null,
*/

router.post('/', (req, res) => {
    var memberFirstName = req.body.memberFirstName;
    var memberMiddleName = req.body.memberMiddleName;
    var memberLastName = req.body.memberLastName;
    var memberImgSrc = req.body.memberImgSrc;
    var memberEmail = req.body.memberEmail;
    var memberMobileNumbers = req.body.memberMobileNumbers;
    var memberAddress = req.body.memberAddress;
    var withdrawal = req.body.withdrawal;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //


    var member = new Member({
        memberFirstName: memberFirstName,
        memberMiddleName: memberMiddleName,
        memberLastName: memberLastName,
        memberImgSrc: memberImgSrc,
        memberEmail: memberEmail,
        memberMobileNumbers: memberMobileNumbers,
        memberAddress: memberAddress,
        withdrawal: withdrawal,
        createdDate: Date.now(),
        createdBy: req.body.createdBy,
        lastUpdatedDate: null,
        lastUpdatedBy: null,
    });

    member.save((err, docs) => {
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
    var memberFirstName = req.body.memberFirstName;
    var memberMiddleName = req.body.memberMiddleName;
    var memberLastName = req.body.memberLastName;
    var memberImgSrc = req.body.memberImgSrc;
    var memberEmail = req.body.memberEmail;
    var memberMobileNumbers = req.body.memberMobileNumbers;
    var memberAddress = req.body.memberAddress;
    var withdrawal = req.body.withdrawal;

    // ------------------- Business logic section Start ------------------- //



    // ------------------- Business logic section End --------------------- //


    var member = {
        memberFirstName: memberFirstName,
        memberMiddleName: memberMiddleName,
        memberLastName: memberLastName,
        memberMobileNumbers: memberMobileNumbers,
        memberAddress: memberAddress,
        withdrawal: withdrawal,
        memberImgSrc: memberImgSrc,
        memberEmail: memberEmail,
        lastUpdatedDate: Date.now(),
        lastUpdatedBy: req.body.createdBy,
    };
    // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
    Member.findByIdAndUpdate(req.params.id,
        member,
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
    Member.findByIdAndDelete(req.params.id, (err, docs) => {
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
