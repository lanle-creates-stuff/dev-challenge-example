"use strict";
var config = require('./config');
var express = require('express');

// challenge server
var challengeServer = require('./devChallenge');
var app = challengeServer.spinUp(config);

// serve static files
app.use('/' , express.static(__dirname + '/public/'));

// server
var port = process.env.PORT || 'https://immense-eyrie-85471.herokuapp.com/';
app.set('port', port);
app.listen(port, function () {
  console.log('***** app listening on port: ' + port);
});
