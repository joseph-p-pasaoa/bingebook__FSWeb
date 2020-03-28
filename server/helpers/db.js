/*
JOSEPH P. PASAOA
Server Database Connector | Bingebook (a full-stack binge-facilitating app)
*/


const pgp = require('pg-promise')();
  const connectString = process.env.DATABASE_URL || 'postgres://localhost:5432/bingebook_db';
  const db = pgp(connectString);


module.exports = db;
