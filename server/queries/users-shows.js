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

const checkUserShowExists = async (userId, showId) => {
  try {
    const getQuery = `
      SELECT *
      FROM users_shows
      WHERE user_id = $/userId/ AND
          show_id = $/showId/;
    `;
    await db.one(getQuery, { userId, showId });
    return true;
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      return false;
    } else {
      throw (err);
    }
  }
}

const addUserShow = async (bodyObj) => {
  const postQuery = `
    INSERT INTO users_shows (user_id
      , show_id
      , watch_status
    ) VALUES ($/userId/
      , $/showId/
      , $/watchStatus/
    ) RETURNING *;
  `;
  return await db.one(postQuery, bodyObj);
}


/* EXPORT */
module.exports = {
  getAllShowsOfUser,
  checkUserShowExists,
  addUserShow
}
