/*
JOSEPH P. PASAOA
SHOWS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/shows');
const refUsersShows = require('../queries/users-shows');


/* ROUTE HANDLERS */
    // getAllShows: get all shows data
router.get("/", async (req, res, next) => {
    try {
      // helper function to get all user-show relationships and format into hashmap
      const getUserShowsHashmap = async () => {
        const allUserShows = await refUsersShows.getAllUserShows();
        const uSHashmap = {};
        for (let userShow of allUserShows) {
          let showId = userShow.show_id;
          if (!uSHashmap[showId]) {
            uSHashmap[showId] = [];
          }
          uSHashmap[showId].push({ watcherId: userShow.user_id, username: userShow.username });
        }
        return uSHashmap;
      }
      
      // get allShows query and user-shows hashmap
      const [ allShows, uSHashmap ] = await Promise.all([
          queries.getAllShows(),
          getUserShowsHashmap()
      ]);

      // combine user-shows data into allShows and respond
      for (let showObj of allShows) {
        showObj["watchers"] = uSHashmap[showObj.id];
      }
      res.status(200);
      res.json({
          status: "success",
          message: "all shows retrieved",
          payload: allShows
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

  // getAllShowsOfGenre: get all shows that have a specified genre
router.get("/genre/:genre_id", async (req, res, next) => {
    try {
      const genreId = processInput(req.params.genre_id, "idNum", "genre id");
      const allShowsOfGenre = await queries.getAllShowsOfGenre(genreId);
      res.status(200);
      res.json({
          status: "success",
          message: `all shows of genre ${genreId} retrieved`,
          payload: allShowsOfGenre
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
      res.status(200);
      res.json({
          status: "success",
          message: `show ${id} retrieved`,
          payload: showById
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // getshowByImdbId: get single show by specified IMDB id
router.get("/imdb/:imdb_id", async (req, res, next) => {
    try {
      const imdbId = processInput(req.params.imdb_id, "imdbId", "imdb id");
      const showByImdbId = await queries.getShowByImdbId(imdbId);
      res.status(200);
      res.json({
          status: "success",
          message: `show '${showByImdbId.title}' using imdb_id '${imdbId}' retrieved`,
          payload: showByImdbId
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
      res.status(201);
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
