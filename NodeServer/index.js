require('./config/config');
require('./db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var path = require('path');

const rtsIndex = require('./router/index.router');

var app = express();

// middleware
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use(express.static(__dirname + '/assests/LogoAndImg'));
app.use('/images', express.static(__dirname + '/assests/LogoAndImg'));


// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Node Server Started at port ${process.env.PORT}`);
});

