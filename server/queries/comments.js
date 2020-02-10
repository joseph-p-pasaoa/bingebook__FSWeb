/*
JOSEPH P. PASAOA
COMMENTS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getCommentsByUserShow = async (userId, showId) => {
  try {
    const getQuery = `
      SELECT commenter_id
          , username AS commenter
          , avatar_url
          , usershow_id
          , user_id AS watcher_id
          , body
          , time_modified
      FROM comments
      INNER JOIN users_shows ON (comments.usershow_id = users_shows.id)
      INNER JOIN users ON (comments.commenter_id = users.id)
      WHERE users_shows.user_id = $/userId/
          AND users_shows.show_id = $/showId/
      ORDER BY comments.time_modified DESC
          , comments.id DESC;
    `;
    return await db.any(getQuery, { userId, showId });
  } catch (err) {
    throw (err);
  }
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
  getCommentsByUserShow,
  // addComment
}
