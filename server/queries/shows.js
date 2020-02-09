/*
JOSEPH P. PASAOA
SHOWS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getAllShows = async () => {
  const getQuery = `
    SELECT *
    FROM shows
    ORDER BY id ASC;
  `;
  return await db.any(getQuery);
}

// const getUserById = async (id) => {
//   try {
//     const getQuery = `
//       SELECT *
//       FROM shows
//       WHERE id = $/id/;
//     `;
//     return await db.one(getQuery, { id });
//   } catch (err) {
//     if (err.message === "No data returned from the query.") {
//       throw new Error(`404__error: user ${id} does not exist`);
//     }
//     throw (err);
//   }
// }

// const addUser = async (bodyObj) => {
//   try {
//     const postQuery = `
//       INSERT INTO shows (username
//         , avatar_url
//       ) VALUES ($/username/
//         , $/avatarUrl/
//       ) RETURNING *;
//     `;
//     return await db.one(postQuery, bodyObj);
//   } catch (err) {
//     if (err.message.includes("violates unique constraint")) {
//       throw new Error(
//         `403__error: username ${bodyObj.username
//           } already exists. Please try again with a new username.`
//       );
//     }
//     throw (err);
//   }
// }


/* EXPORT */
module.exports = {
  getAllShows,
  // getUserById,
  // addUser
}
