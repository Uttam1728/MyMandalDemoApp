const {Member} = require("../Models/Member");
const express = require("express");
const { isValidObjectId } = require("mongoose");
const _ = require('lodash');
const passport = require('passport');
module.exports.getAll =  (req, res) => {
    Member.find(function (err, docs) {
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
};


/*
        Sample Data
        {
            "memberFirstName" : "test",
            "memberMiddleName" : "middle",
            "memberLastName" : "last",
            "memberImgSrc" : "/img",
            "memberEmail" : "test@email.com",
            "memberMobileNumbers" : ["123456789","465789123"],
            "memberAddress" : "testAddress",
            "withdrawal" : 50000,
            "createdBy"  : 13245
        
        }
        
*/

module.exports.AddMember =  (req, res, next) => {
    var memberFirstName = req.body.memberFirstName;
    var memberMiddleName = req.body.memberMiddleName;
    var memberLastName = req.body.memberLastName;
    var memberImgSrc = req.body.memberImgSrc;
    var memberEmail = req.body.memberEmail;
    var memberMobileNumbers = req.body.memberMobileNumbers;
    var memberAddress = req.body.memberAddress;
    var withdrawal = req.body.withdrawal;
    var password = req.body.password;
    var mandals = req.body.mandals;

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
        password : password,
        mandals : mandals,
        // saltSecret : "4566",
        createdDate: Date.now(),
        createdBy: req.body.createdBy,
        lastUpdatedDate: null,
        lastUpdatedBy: null,
    });

    member.save((err, docs) => {
        if (!err) {
            //console.log(docs);
            return res.send(docs);
        } 
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
};


module.exports.ChangeDetailsOfMemberById =  (req, res) => {
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
};

module.exports.RemoveMemberById = (req, res) => {
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
};


module.exports.authenticateUser = (req, res, next) => {
    // call for passport authentication
    console.log('in Ctrl',req.body);
    passport.authenticate('addmember', (err, user, info) => { 
        console.log('in CtrlAuth',req.body);      
        // error from passport middleware
        if (err){ 
            console.log('in err',req.body,err);
            return res.status(400).json(err);
        }
        // registered user
        else if (user){
            console.log('in user',req.body);
             return res.status(200).json({ "token": user.generateJwt() });
        }
        // unknown user or wrong password
        else{
            console.log('in unkmowqn',err,user,info);
             return res.status(404).json(info);
        }
    })(req, res);
};

module.exports.MemberHome = (req, res, next) =>{
    
    Member.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
};