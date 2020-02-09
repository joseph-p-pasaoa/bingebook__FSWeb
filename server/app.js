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
const usersRouter = require('./routes/users');
const showsRouter = require('./routes/shows');
const genresRouter = require('./routes/genres');
    // connects
app.use('/users', usersRouter);
app.use('/shows', showsRouter);
app.use('/genres', genresRouter);


/* ERROR HANDLING */
    // no-route catch
app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found on Bingebook server. Try again after fixing your route.');
});

    // server error catch
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('Server error. Please try again later.');
});


module.exports = app;
