/*
JOSEPH P. PASAOA
USERS-SHOWS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/users-shows');
const refUsers = require('../queries/users');
const refShows = require('../queries/shows');


/* ROUTE HANDLERS */
    // getAllShowsOfUser: get all shows of one user
router.get("/user/:user_id", async (req, res, next) => {
    try {
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const allShowsOfUser = await queries.getAllShowsOfUser(userId);
      // checks because of empty response whether user exists and FAILS if not
      if (allShowsOfUser.length === 0) {
        await refUsers.getUserById(userId);
      }
      res.status(200);
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
router.post("/add/:user_id/:imdb_id", async (req, res, next) => {
    try {
      const watchStatus = processInput(req.body.watch_status, "watchStatus", "watch status");

      // check if show exists in db and if so grab show_id
      const imdbId = processInput(req.params.imdb_id, "imdbId", "imdb id");
      let showId = null;
      try {
        const response = await refShows.getShowByImdbId(imdbId);
        showId = response.id;
      } catch (err) {
        console.log(`auto-creating show (imdb_id: ${imdbId}) in database`);
        const title = processInput(req.body.title, "show title", "show title");
        const year = processInput(req.body.year, "softVarchar22", "show year(s)");
        const imgUrl = processInput(req.body.imgUrl, "softPicUrl", "show image url");
        const response = await refShows.addShow({
          imdbId, title, year, imgUrl
        });
        showId = response.id;
      }

      // check if user-show relationship already exists and FAIL if so
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const doesUserShowExist = await queries.checkUserShowExists(userId, showId);
      if (doesUserShowExist === true) {
        throw new Error(`403__error: user.${userId} + show.${showId
          } (imdb_id: ${imdbId}) connection already exists`);
      } else {

        // checks passed, execute add
        const response = await queries.addUserShow({ userId, showId, watchStatus });
        res.status(201);
        res.json({
            status: "success",
            message: `new user.${userId} - show.${showId} relationship created`,
            payload: response
        });
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // updateUserShow: update a user-show relationship
router.patch("/update/:user_id/:show_id", async (req, res, next) => {
    try {
      // required identifiers
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const showId = processInput(req.params.show_id, "idNum", "show id");

      // optional fields gated beneath conditionals requiring defined to check
      let watchStatus = null, isTop3 = null;
      if (req.body.watchStatus) {
        watchStatus = processInput(req.body.watchStatus, "watchStatus", "watch status");
      }
      if (req.body.isTop3) {
        isTop3 = processInput(req.body.isTop3, "bool", "isTop3 status");
      }

      // FAIL if no optional fields are being updated
      if (watchStatus === null && isTop3 === null) {
        throw new Error("403__error: no valid update request found");
      }

      const response = await queries.updateUserShow({ userId, showId, watchStatus, isTop3 });
      res.status(201);
      res.json({
          status: "success",
          message: `Updated user.${userId} - show.${showId} relationship data`,
          payload: response
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
