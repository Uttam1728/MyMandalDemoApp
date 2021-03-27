require('./config/config');
require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const memberController = require('./Controllers/MemberController');
const installmentController = require('./Controllers/InstallmentController');
const historyController = require('./Controllers/HistoryController');

const rtsIndex = require('./router/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);


app.listen(process.env.PORT, () => {
  console.log(`Node Server Started at port ${process.env.PORT}`);
});

