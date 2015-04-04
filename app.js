// Configuration
// ============================================================

var config = require('./config');


// Core
// ============================================================

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Databse
// ============================================================

var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.dbuser + ':' + config.dbpassword + config.dbport + config.dbname);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connected to database');
});


// CORS
// ============================================================

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});


// Routes
// ============================================================

var artists = require('./routes/artists');

app.use('/api/artists', artists);

module.exports = app;
