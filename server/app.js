/*
JOSEPH P. PASAOA
Server App MAIN | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
var express = require('express');
  var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* ROUTING */
    // imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
    // connects
app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
