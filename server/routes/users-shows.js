/*
JOSEPH P. PASAOA
USERS-SHOWS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError.js');
const processInput = require('../helpers/processInput.js');
const queries = require('../queries/users-shows.js');
const checkUserExists = require('../queries/users.js');
const checkShowExistsInDb = require('../queries/shows.js');


/* ROUTE HANDLERS */
    // getAllShowsOfUser: get all shows of one user
router.get("/user/:user_id", async (req, res, next) => {
    try {
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const allShowsOfUser = await queries.getAllShowsOfUser(userId);
      if (allShowsOfUser.length === 0) {
        await checkUserExists.getUserById(userId);
      }
      res.json({
          status: "success",
          message: `all shows of user ${userId} retrieved`,
          payload: allShowsOfUser
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // addUserShow: add a user-show relationship
router.post("/add/:user_id/:imdb_id/:watch_status", async (req, res, next) => {
    try {
      const watchStatus = processInput(req.params.watch_status, "watchStatus", "watch status");

      // check if show exists in db and if so grab show_id
      const showImdbId = processInput(req.params.imdb_id, "imdbId", "imdb id");
      let showId = null;
      try {
        const response = await checkShowExistsInDb.getShowByImdbId(showImdbId);
        showId = response.id;
      } catch (err) {
        console.log("add show here placeholder");
      }

      // check if user-show relationship already exists and FAIL if so
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const doesUserShowExist = await queries.checkUserShowExists(userId, showId);
      if (doesUserShowExist === true) {
        throw new Error(`403__error: user '${userId}' - show '${showId
          }' (imdb_id: ${showImdbId}) connection already exists`);
      } else {

        // checks passed and add
        const response = await queries.addUserShow({ userId, showId, watchStatus });
        res.json({
            status: "success",
            message: `new user '${userId}' - show '${showId}' relationship created`,
            payload: response
        });
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
