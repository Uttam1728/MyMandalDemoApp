const { Member } = require("../Models/Member");
const express = require("express");
const { isValidObjectId } = require("mongoose");
const mongoose = require('mongoose');
const _ = require('lodash');
const passport = require('passport');
const { IfNullOrEmptyOrBlankThan } = require('../utils/strings');
const { MemberMandal } = require("../Models/MemberMandal");


module.exports.getAll = (req, res) => {
  MemberMandal.find(function (err, docs) {
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
  MemberMandal.findById(req.params.id, (err, docs) => {
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

module.exports.AddMemberMandal = (req, res, next) => {
  console.log('in add ADD Member Mandal');

  var memberId = req.body.memberId;
  var mandalId = req.body.mandalId;
  var isAdmin = req.body.isAdmin
  var createdDate = Date.now();
  var createdBy = req.body.createdBy;
  var lastUpdatedDate = null;
  var lastUpdatedBy = null;

  // ------------------- Business logic section Start ------------------- //



  // ------------------- Business logic section End --------------------- //

  var memberMandal = new MemberMandal({
    memberId : mongoose.mongo.ObjectId(memberId),
    mandalId : mongoose.mongo.ObjectId(mandalId),
    isAdmin : isAdmin,
    // saltSecret : "4566",
    createdDate: createdDate,
    createdBy: createdBy,
    lastUpdatedDate: lastUpdatedDate,
    lastUpdatedBy: lastUpdatedBy,
  });

  memberMandal.save((err, docs) => {
    if (!err) {
      console.log(docs);

      return res.send(docs);
    }
    else {
      if (err.code == 11000)
        res.status(422).send(['Duplicate found.']);
      else
        return next(err);
    }
  });
};



module.exports.ChangeDetailsOfMemberMandalById = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).send("In Valid Object Id");
  }
  var memberId = req.body.memberId;
  var mandalId = req.body.mandalId;
  var isAdmin = req.body.isAdmin

  // ------------------- Business logic section Start ------------------- //



  // ------------------- Business logic section End --------------------- //


  var memberMandal = {
    memberId : memberId,
    mandalId : mandalId,
    isAdmin : isAdmin,
    lastUpdatedDate: Date.now(),
    lastUpdatedBy: req.body.createdBy,
  };
  // if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
  MemberMandal.findByIdAndUpdate(req.params.id,
    memberMandal,
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

module.exports.RemoveMemberMandalById = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).send("In Valid Object Id");
  }
  // if ObjectId not passed than use findOneAndRemove(filter,(err),docs)
  MemberMandal.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      if (docs) {
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
