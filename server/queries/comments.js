/*
JOSEPH P. PASAOA
COMMENTS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../helpers/db');


/* QUERIES */
const getCommentsByUserShow = async (userId, showId) => {
  try {
    const getQuery = `
      SELECT comments.id AS comment_id
          , commenter_id
          , username AS commenter
          , avatar_url
          , user_show_id
          , user_id AS watcher_id
          , body
          , time_modified
      FROM comments
      INNER JOIN users_shows ON (comments.user_show_id = users_shows.id)
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

const addComment = async (bodyObj) => {
  try {
    const postQuery = `
      INSERT INTO comments (commenter_id
        , user_show_id
        , body
      ) VALUES ($/commenterId/
        , $/userShowId/
        , $/comment/
      ) RETURNING *;
    `;
    return await db.one(postQuery, bodyObj);
  } catch (err) {
    throw (err);
  }
}


/* EXPORT */
module.exports = {
  getCommentsByUserShow,
  addComment
}
