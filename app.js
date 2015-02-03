var express = require('express');

var app = express();

app.disable('x-powered-by');

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  var msg = err.message;
  var status = err.status;
  if (status === undefined || msg === undefined) {
    status = 500;
    msg = 'Internal server error';
  };
  res.status(status).end(msg);
});

module.exports = app;
