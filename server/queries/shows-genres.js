/*
JOSEPH P. PASAOA
SHOWS-GENRES Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getAllShowsOfGenre = async (name) => {
  const getQuery = `
    SELECT shows_genres.id
        , show_id
        , title
        , year
        , imdb_id
        , img_url
    FROM shows_genres
    INNER JOIN genres ON (shows_genres.genre_id = genres.id)
    INNER JOIN shows ON (shows_genres.show_id = shows.id)
    WHERE name = $/name/
    ORDER BY shows.title ASC
        , shows.year DESC;
  `;
  return await db.any(getQuery, { name });
}

const checkShowGenreExists = async (showId, genreId) => {
  try {
    const getQuery = `
      SELECT *
      FROM shows_genres
      WHERE show_id = $/showId/ AND
          genre_id = $/genreId/;
    `;
    await db.one(getQuery, { showId, genreId });
    return true;
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      return false;
    } else {
      throw (err);
    }
  }
}

const addShowGenre = async (bodyObj) => {
  const postQuery = `
    INSERT INTO shows_genres (show_id
        , genre_id
    ) VALUES ($/showId/
        , $/genreId/
    ) RETURNING *;
  `;
  return await db.one(postQuery, bodyObj);
}

// const updateUserShow = async ({ userId, showId, watchStatus, isTop3 }) => {
//   try {
//     let insertArr = [];
//     if (watchStatus) {
//       insertArr.push(`watch_status = $/watchStatus/`);
//     }
//     if (isTop3) {
//       insertArr.push(`is_top3 = $/isTop3/`);
//     }
//     const updatesInsert = insertArr.join(', ');
//     console.log(updatesInsert);
//     const updateQuery = `
//       UPDATE users_shows
//       SET ${updatesInsert}
//       WHERE user_id = $/userId/
//           AND show_id = $/showId/
//       RETURNING *;
//     `;
//     return await db.one(updateQuery, { userId, showId, watchStatus, isTop3 });
//   } catch (err) {
//     if (err.message === "No data returned from the query.") {
//       throw new Error(
//         `404__error: user.${bodyObj.userId} - show.${bodyObj.showId
//           } relationship not found. Please check ids and try again`
//       );
//     }
//     throw (err);
//   }
// };


/* EXPORT */
module.exports = {
  getAllShowsOfGenre,
  checkShowGenreExists,
  addShowGenre,
  // updateUserShow
}
