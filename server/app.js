/*
JOSEPH P. PASAOA
Server App MAIN | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


/* ROUTING */
    // imports
const omdbRouter = require('./routes/omdb');
const usersRouter = require('./routes/users');
const showsRouter = require('./routes/shows');
const genresRouter = require('./routes/genres');
const usersAndShowsRouter = require('./routes/users-shows');
const showsAndGenresRouter = require('./routes/shows-genres');
const commentsRouter = require('./routes/comments');
    // connects
app.use('/omdb', omdbRouter);
app.use('/users', usersRouter);
app.use('/shows', showsRouter);
app.use('/genres', genresRouter);
app.use('/users-shows', usersAndShowsRouter);
app.use('/shows-genres', showsAndGenresRouter);
app.use('/comments', commentsRouter);


/* CONNECT PUBLIC FOLDER + HEROKU DEPLOYMENT CONNECTIONS */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
  app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}


/* ERROR HANDLING */
    // no-route catch
app.use("*", (req, res) => {
    res.status(404).send(
      'error: no such route found on the Bingebook server. Try again after fixing your route.'
    );
});

    // server error catch
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('Server error. Please try again later.');
});


module.exports = app;
