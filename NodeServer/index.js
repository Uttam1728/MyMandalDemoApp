const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const expencesControler = require('./Controllers/ExpensesController');
const memberController = require('./Controllers/MemberController');
const { mongoose } = require('./db');
var app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Node Server Started at port 3000");
});


app.use('/expences', expencesControler);
app.use('/members', memberController);