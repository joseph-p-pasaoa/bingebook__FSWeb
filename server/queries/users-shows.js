/*
JOSEPH P. PASAOA
SHOWS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getAllShowsOfUser = async (userId) => {
  const getQuery = `
    SELECT users_shows.id
        , show_id
        , title
        , year
        , imdb_id
        , img_url
        , is_top3
        , watch_status
    FROM users_shows
    INNER JOIN shows ON (users_shows.show_id = shows.id)
    WHERE user_id = $/userId/
    ORDER BY is_top3 DESC
        , users_shows.id ASC;
  `;
  return await db.any(getQuery, { userId });
}

// const addShow = async (bodyObj) => {
//   try {
//     const postQuery = `
//       INSERT INTO shows (imdb_id
//         , title
//         , year
//         , img_url
//       ) VALUES ($/imdbId/
//         , $/title/
//         , $/year/
//         , $/imgUrl/
//       ) RETURNING *;
//     `;
//     return await db.one(postQuery, bodyObj);
//   } catch (err) {
//     if (err.message.includes("violates unique constraint")) {
//       throw new Error(`403__error: Show '${bodyObj.title}' already exists in database`);
//     }
//     throw (err);
//   }
// }


/* EXPORT */
module.exports = {
  getAllShowsOfUser,
  // getShowById,
  // addShow
}
