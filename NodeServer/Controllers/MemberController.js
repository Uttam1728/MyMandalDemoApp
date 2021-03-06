const { Member } = require("../Models/Member");
const express = require("express");
const { isValidObjectId } = require("mongoose");
const mongoose = require('mongoose');
const _ = require('lodash');
const passport = require('passport');
const { IfNullOrEmptyOrBlankThan } = require('../utils/strings');
const { MemberMandal } = require("../Models/MemberMandal");


module.exports.getAll = (req, res) => {
  Member.find(function (err, docs) {
    if (!err) {
      return res.send(docs);
    } else {
      return res.send(JSON.stringify(err, undefined, 2));
    }
  });
};


module.exports.getById = (req, res) => {
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

module.exports.AddMember = (req, res, next) => {
  console.log('in add ADD Member', JSON.parse(req.body.member), req.file.filename);
  tempMemberObj = JSON.parse(req.body.member);
  var memberFirstName = tempMemberObj.memberFirstName;
  var memberMiddleName = tempMemberObj.memberMiddleName;
  var memberLastName = tempMemberObj.memberLastName;
  var memberImgSrc = 'http://localhost:3000/images/' + req.file.filename;
  var memberEmail = tempMemberObj.memberEmail;
  var memberMobileNumbers = tempMemberObj.memberMobileNumbers;
  var memberAddress = tempMemberObj.memberAddress;
  var withdrawal = tempMemberObj.withdrawal;
  var mandals = tempMemberObj.mandals;
  var password = tempMemberObj.password;
  var createdDate = Date.now();
  var createdBy = tempMemberObj.createdBy;
  var lastUpdatedDate = null;
  var lastUpdatedBy = null;

  // ------------------- Business logic section Start ------------------- //



  // ------------------- Business logic section End --------------------- //

  console.log(member);
  var member = new Member({
    memberFirstName: memberFirstName,
    memberMiddleName: memberMiddleName,
    memberLastName: memberLastName,
    memberImgSrc: memberImgSrc,
    memberEmail: memberEmail,
    memberMobileNumbers: memberMobileNumbers,
    memberAddress: memberAddress,
    withdrawal: withdrawal,
    password: password,
    // saltSecret : "4566",
    createdDate: createdDate,
    createdBy: createdBy,
    lastUpdatedDate: lastUpdatedDate,
    lastUpdatedBy: lastUpdatedBy,
  });

  member.save((err, docs) => {
    if (!err) {
      console.log(docs);
        mandals.forEach(mandalId => {
          var memberMandal = new MemberMandal({
            memberId : docs._id,
            mandalId : mongoose.mongo.ObjectId(mandalId),
            isAdmin : 0,
            // saltSecret : "4566",
            createdDate: docs.createdDate,
            createdBy: docs.createdBy,
            lastUpdatedDate: docs.lastUpdatedDate,
            lastUpdatedBy: docs.lastUpdatedBy,
          });
          memberMandal.save((err, docs) => {
          });
        });-2-9
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


module.exports.ChangeDetailsOfMemberById = (req, res) => {
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
      if (docs) {

        MemberMandal.deleteMany({ memberId: docs._id }, function(err) {
          console.log(err);
        });
        res.send(docs);
      }
      else
        //send specific status code status - it is remaining
        res.send('-1');
    } else {
      res.status(400).send(['Error saving data', JSON.stringify(err, undefined, 2)]);
    }
  });
};


module.exports.authenticateUser = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('addmember', (err, user, info) => {
    // error from passport middleware
    if (err) {
      return res.status(400).json(err);
    }
    // registered user
    else if (user) {
      return res.status(200).json({ "token": user.generateJwt() });
    }
    // unknown user or wrong password
    else {
      return res.status(404).json(info);
    }
  })(req, res);
};

module.exports.MemberHome = (req, res, next) => {
  console.log(' in member home')
  Member.findOne({ _id: req._id },
    (err, user) => {
      if (!user)
        return res.status(404).json({ status: false, message: 'User record not found.' });
      else
        return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
    }
  );
};



module.exports.SearchMember = (req, res) => {
  var searchparam = JSON.parse(req.query.searchparam);
  console.log(searchparam);
  var searchObj = {};

  if (IfNullOrEmptyOrBlankThan(searchparam.memberemail, null)) {
    searchObj.memberEmail = {
      $regex: '.*' + searchparam.memberemail + '.*',
      $options: 'i'
    };
  }

  if (IfNullOrEmptyOrBlankThan(searchparam.memberFirstName, null)) {
    searchObj.memberFirstName = {
      $regex: '.*' + searchparam.memberFirstName + '.*',
      $options: 'i'
    };
  }

  if (IfNullOrEmptyOrBlankThan(searchparam.memberMiddleName, null)) {
    searchObj.memberMiddleName = {
      $regex: '.*' + searchparam.memberMiddleName + '.*',
      $options: 'i'
    };
  }

  if (IfNullOrEmptyOrBlankThan(searchparam.memberLastName, null)) {

    searchObj.memberLastName = {
      $regex: '.*' + searchparam.memberLastName + '.*',
      $options: 'i'
    };
  }




  if (searchparam.date.length > 0) {
    searchObj.createdDate = {
      $gte: searchparam.date[0],
      $lte: searchparam.date[1]
    };
  }

  var query = Member.find(searchObj).limit(100);
  query.exec(function (err, docs) {
    if (!err) {
      console.log(docs.length);
      return res.send(docs);
    } else {
      console.log(err);
      return res.send(JSON.stringify(err, undefined, 2));
    }
  });
};
