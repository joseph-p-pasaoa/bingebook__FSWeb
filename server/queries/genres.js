/*
JOSEPH P. PASAOA
GENRES Route Queries | Bingebook (a full-stack binge-facilitating app)
*/


/* DB CONNECTION */
const db = require('../db');


/* QUERIES */
const getAllGenres = async () => {
  const getQuery = `
    SELECT *
    FROM genres
    ORDER BY id ASC;
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
          } already exists. Please use a new genre name.`
      );
    }
    throw (err);
  }
}


/* EXPORT */
module.exports = {
  getAllGenres,
  addGenre
}
