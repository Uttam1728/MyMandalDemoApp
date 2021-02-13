const Expence = require("../Models/Expense");
const express = require("express");
const { isValidObjectId } = require("mongoose");

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
	// if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))

	Expence.findById(req.params.id, (err, docs) => {
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
	"reason" : 'test reason',
	"cost" : 111.111,
	"createdDate"  : Date.now(),
	"createdBy"  : 13245,
	"lastUpdatedDate"  : null,
	"lastUpdatedBy"  : null,
*/

router.post('/', (req, res) => {

	var reason = req.body.reason;
	var cost = req.body.cost;

	// ------------------- Business logic section Start ------------------- //



	// ------------------- Business logic section End --------------------- //


	var expence = new Expence({
		reason: reason,
		cost: cost,
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
	var reason = req.body.reason;
	var cost = req.body.cost;

	// ------------------- Business logic section Start ------------------- //



	// ------------------- Business logic section End --------------------- //

	var expence = {
		reason: reason,
		cost: cost,
		lastUpdatedDate: Date.now(),
		lastUpdatedBy: req.body.createdBy,
	};

	// if ObjectId not passed than use findOneAndupdate(filter,options,(err,docs))
	Expence.findByIdAndUpdate(req.params.id,
		expence,
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
	Expence.findByIdAndDelete(req.params.id, (err, docs) => {
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
