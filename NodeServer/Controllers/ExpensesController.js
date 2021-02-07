const Expence = require("../Models/Expense");
const express = require("express");
const {
  isValidObjectId
} = require("mongoose");

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


router.get('/:id', (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).send("In Valid Object Id");
  }

  Expence.find(yreq.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error retriving in data', JSON.stringify(err, undefined, 2));
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
  var expence = {
    reason: req.body.reason,
    cost: req.body.cost,
    lastUpdatedDate: Date.now(),
    lastUpdatedBy: req.body.createdBy,
  };

  Expence.findByIdAndUpdate(req.params.id,
    expence,
    { new: true },
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log('Error saving data', JSON.stringify(err, undefined, 2));
      }
    });
});

router.delete('/:id', (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).send("In Valid Object Id");
  }

  Expence.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error saving data', JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;
