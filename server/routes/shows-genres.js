/*
JOSEPH P. PASAOA
SHOWS-GENRES Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/shows-genres');
const refGenres = require('../queries/genres');


/* ROUTE HANDLERS */
    // getAllShowsOfGenre: get all shows of one specified genre
router.get("/genre/:genre_name", async (req, res, next) => {
    try {
      const genreName = processInput(req.params.genre_name, "hardVarchar22", "genre name");
      const allShowsOfGenre = await queries.getAllShowsOfGenre(genreName);
      if (allShowsOfGenre.length === 0) {
        await refGenres.getGenreByName(genreName);
      }
      res.status(200);
      res.json({
          status: "success",
          message: `all shows of genre ${genreName} retrieved`,
          payload: allShowsOfGenre
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // addShowGenre: add a show-genre relationship
router.post("/create/:show_id/:genre_name", async (req, res, next) => {
    try {
      // ASSERTING movie already exists in our database...
      // because the movie gets added first and then its genres are added subsequently

      // check if genre exists in db and if not automate creation
      const genreName = processInput(req.params.genre_name, "hardVarchar22", "genre name");
      let genreId = null;
      try {
        const genreObj = await refGenres.getGenreByName(genreName);
        genreId = genreObj.id;
      } catch (err) {
        console.log(`auto-creating genre '${genreName}' in database`);
        const newGenreRes = await refGenres.addGenre({ name: genreName });
        genreId = newGenreRes.id;
      }

      // check if show-genre relationship already exists and FAIL if so
      const showId = processInput(req.params.show_id, "idNum", "show id");
      const doesShowGenreExist = await queries.checkShowGenreExists(showId, genreId);
      if (doesShowGenreExist === true) {
        throw new Error(`403__error: show.${showId} + genre.${genreId
          } connection already exists`);
      } else {

        // checks passed, execute add
        const response = await queries.addShowGenre({ showId, genreId });
        res.status(201);
        res.json({
            status: "success",
            message: `new show.${showId} - genre.${genreId} relationship created`,
            payload: response
        });
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
