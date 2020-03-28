/*
JOSEPH P. PASAOA
GENRES Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../helpers/db');


/* QUERIES */
const getAllGenres = async () => {
  const getQuery = `
    SELECT *
    FROM genres
    ORDER BY name ASC;
  `;
  return await db.any(getQuery);
}

const addGenre = async (bodyObj) => {
  try {
    const postQuery = `
      INSERT INTO genres (name
      ) VALUES ($/name/
      ) RETURNING *;
    `;
    return await db.one(postQuery, bodyObj);
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: genre ${bodyObj.name
          } already exists. Please try a different genre name`
      );
    }
    throw (err);
  }
}

const getGenreByName = async (name) => {
  try {
    const getQuery = `
      SELECT *
      FROM genres
      WHERE name = $/name/;
    `;
    return await db.one(getQuery, { name });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: genre '${name}' does not exist in the database`);
    }
    throw (err);
  }
}


/* EXPORT */
module.exports = {
  getAllGenres,
  addGenre,
  getGenreByName
}
