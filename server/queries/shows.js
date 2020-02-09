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

const getShowById = async (id) => {
  try {
    const getQuery = `
      SELECT *
      FROM shows
      WHERE id = $/id/;
    `;
    return await db.one(getQuery, { id });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: Show ${id} does not exist`);
    }
    throw (err);
  }
}

// const addShow = async (bodyObj) => {
//   try {
//     const postQuery = `
//       INSERT INTO shows (Showname
//         , avatar_url
//       ) VALUES ($/Showname/
//         , $/avatarUrl/
//       ) RETURNING *;
//     `;
//     return await db.one(postQuery, bodyObj);
//   } catch (err) {
//     if (err.message.includes("violates unique constraint")) {
//       throw new Error(
//         `403__error: Showname ${bodyObj.Showname
//           } already exists. Please try again with a new Showname.`
//       );
//     }
//     throw (err);
//   }
// }


/* EXPORT */
module.exports = {
  getAllShows,
  getShowById,
  // addShow
}
