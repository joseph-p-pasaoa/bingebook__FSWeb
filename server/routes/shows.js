/*
JOSEPH P. PASAOA
SHOWS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError.js');
const processInput = require('../helpers/processInput.js');
const queries = require('../queries/shows.js');


/* ROUTE HANDLERS */
    // getAllShows: get all shows data
router.get("/", async (req, res, next) => {
    try {
      const allShows = await queries.getAllShows();
      res.json({
          status: "success",
          message: "all shows retrieved",
          payload: allShows
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // getshowById: get single show by specified id
router.get("/:id", async (req, res, next) => {
    try {
      const id = processInput(req.params.id, "idNum", "show id");
      const showById = await queries.getShowById(id);
      res.json({
          status: "success",
          message: `show ${id} retrieved`,
          payload: showById
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // addShow: add a single new show
router.post("/", async (req, res, next) => {
    try {
      const imdbId = processInput(req.body.imdbId, "imdbId", "imdb id");
      const title = processInput(req.body.title, "show title", "show title");
      const year = processInput(req.body.year, "softVarchar22", "show year(s)");
      const imgUrl = processInput(req.body.imgUrl, "softPicUrl", "show image url");
      const response = await queries.addShow({
        imdbId, title, year, imgUrl
      });
      res.json({
          status: "success",
          message: `new show '${title}' added`,
          payload: response
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
