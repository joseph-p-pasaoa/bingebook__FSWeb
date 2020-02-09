/*
JOSEPH P. PASAOA
USERS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getAllUsers = async () => {
  const getQuery = `
    SELECT *
    FROM users
    ORDER BY id ASC;
  `;
  return await db.any(getQuery);
}


/* EXPORT */
module.exports = {
  getAllUsers
}
