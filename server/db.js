/*
JOSEPH P. PASAOA
Server Database Connector | Bingebook (a full-stack binge-facilitating app)
*/


const pgp = require('pg-promise')();
  const connectString = 'postgres://localhost:5432/bingebook_db';
  const db = pgp(connectString);


module.exports = db;
