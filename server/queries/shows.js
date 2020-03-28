/*
JOSEPH P. PASAOA
SHOWS Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../helpers/db');


/* QUERIES */
const getAllShows = async () => {
  const getQuery = `
    SELECT *
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
          , (
              SELECT string_agg(name, ', ' ORDER BY name ASC)
              FROM shows_genres
              INNER JOIN genres ON (shows_genres.genre_id = genres.id)
              WHERE shows.id = shows_genres.show_id
          ) AS genres
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

const getAllShowsOfGenre = async (genreId, cId) => {
  return await db.task(async t => {

    // get ids of all shows with specified genre
    const getShowIdsQuery = `
      SELECT STRING_AGG(show_id::CHARACTER VARYING, ',') AS show_ids
      FROM shows_genres
      WHERE genre_id = $/genreId/;
    `;
    const resShowIds = await t.one(getShowIdsQuery, { genreId });
    const showIds = resShowIds.show_ids.split(',');

    // get full datasets of shows whose ids were previously fetched
    const getShowsQuery = `
      SELECT *
          , (
              SELECT STRING_AGG(name, ', ' ORDER BY name ASC)
              FROM shows_genres
              INNER JOIN genres ON (shows_genres.genre_id = genres.id)
              WHERE shows.id = shows_genres.show_id
          ) AS genres
      FROM shows
      WHERE id IN ($/showIds:list/)
      ORDER BY title ASC;
    `;
      // retry later for adding user-show existence check into query
      // -- , (
      // --     SELECT users_shows.user_id
      // --     FROM shows
      // --     LEFT JOIN users_shows ON (shows.id = users_shows.show_id)
      // --     WHERE shows.id = id
      // --         AND users_shows.user_id = $/cId/
      // -- )
    const resShowsFull = await t.any(getShowsQuery, { showIds });

    // get current user's show relations so we can add to server response
    const getUsersShowsIdsQuery = `
      SELECT STRING_AGG(show_id::CHARACTER VARYING, ',') AS show_ids
      FROM users_shows
      WHERE user_id = $/cId/;
    `;
    const usersShowsIds = await t.one(getUsersShowsIdsQuery, { cId })
      .then(res => res.show_ids.split(','));

    // create hashmap for current user's show ids
    const usersShowsIdsHash = {};
    for (let id of usersShowsIds) {
      usersShowsIdsHash[id] = true;
    }

    // add to server response whether or not current user already has relationship
    for (let showFull of resShowsFull) {
      showFull["related"] = usersShowsIdsHash[showFull.id] ? true : false;
    }
    return resShowsFull;
  });
}

const getShowByImdbId = async (imdbId) => {
  try {
    const getQuery = `
      SELECT *
          , (
              SELECT string_agg(name, ', ' ORDER BY name ASC)
              FROM shows_genres
              INNER JOIN genres ON (shows_genres.genre_id = genres.id)
              WHERE shows.id = shows_genres.show_id
          ) AS genres
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
  getAllShowsOfGenre,
  getShowById,
  getShowByImdbId,
  addShow
}
