/*
JOSEPH P. PASAOA
GENRES Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError.js');
const processInput = require('../helpers/processInput.js');
const queries = require('../queries/genres.js');


/* ROUTE HANDLERS */
    // getAllGenres: get all genres data
router.get("/", async (req, res, next) => {
    try {
      const allGenres = await queries.getAllGenres();
      res.json({
          status: "success",
          message: "all genres retrieved",
          payload: allGenres
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // addGenre: add a single new genre
router.post("/", async (req, res, next) => {
    try {
      const name = processInput(req.body.name, "hardVarchar22", "genre name");
      const response = await queries.addGenre({ name });
      res.json({
          status: "success",
          message: `new genre ${name} added`,
          payload: response
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
