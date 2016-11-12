'use strict';

var config = require('../common/config.js');
var log = require('util').log;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, '../../public/images/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('*', function (req, res) {
  log(req.method + ' ' + req.url);
  res.render('index', {
    cdnStatic: config.cdnStatic
  });
});

app.listen(config.port);

process.on('uncaughtException', function (err) {
  console.error('Global:');
  console.error(err);
  process.exit(0);
});

console.log('server starting on port: %d', config.port);
