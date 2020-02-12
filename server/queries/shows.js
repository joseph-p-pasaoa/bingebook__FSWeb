/*
JOSEPH P. PASAOA
SHOWS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getAllShows = async () => {
  const getQuery = `
    SELECT id
        , imdb_id
        , title
        , year
        , img_url
        , (
            SELECT string_agg(name, ', ' ORDER BY name ASC)
            FROM shows_genres
            INNER JOIN genres ON (shows_genres.genre_id = genres.id)
            WHERE shows.id = shows_genres.show_id
        ) AS genres
    FROM shows
    ORDER BY title ASC;
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

const getShowByImdbId = async (imdbId) => {
  try {
    const getQuery = `
      SELECT *
      FROM shows
      WHERE imdb_id = $/imdbId/;
    `;
    return await db.one(getQuery, { imdbId });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: No show with imdb id '${imdbId
        }' exists in our database`);
    }
    throw (err);
  }
}

const addShow = async (bodyObj) => {
  try {
    const postQuery = `
      INSERT INTO shows (imdb_id
        , title
        , year
        , img_url
      ) VALUES ($/imdbId/
        , $/title/
        , $/year/
        , $/imgUrl/
      ) RETURNING *;
    `;
    return await db.one(postQuery, bodyObj);
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(`403__error: Show '${bodyObj.title}' already exists in database`);
    }
    throw (err);
  }
}


/* EXPORT */
module.exports = {
  getAllShows,
  getShowById,
  getShowByImdbId,
  addShow
}
