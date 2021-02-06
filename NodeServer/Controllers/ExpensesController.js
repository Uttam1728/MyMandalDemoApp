const Expence = require("../Models/Expense");
const express = require("express");

var router = express.Router();


router.get('/', (req, res) => {
  Expence.find(function (err, docs) {
    if (!err) {
      return res.send(docs);
    } else {
      return res.send(JSON.stringify(err, undefined, 2));
    }
  });
});
/*
Sample Data
        "reason" : 'test reason',
        "cost" : 111.111,
        "createdDate"  : Date.now(),
        "createdBy"  : 13245,
        "lastUpdatedDate"  : null,
        "lastUpdatedBy"  : null,


*/
router.post('/', (req, res) => {

  var expence = new Expence({
    reason: req.body.reason,
    cost: req.body.cost,
    createdDate: Date.now(),
    createdBy: req.body.createdBy,
    lastUpdatedDate: null,
    lastUpdatedBy: null,
  });

  expence.save((err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      return res.send(JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
