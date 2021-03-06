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
    // getAllUserShows: gets all relationships, responding with HASHMAP of (showId: watcher_id_arr)
router.get("/", async (req, res, next) => {
    try {
      const allUserShows = await queries.getAllUserShows();
      const uSHashmap = {};
      for (let userShow of allUserShows) {
        let showId = userShow.show_id;
        if (!uSHashmap[showId]) {
          uSHashmap[showId] = [];
        }
        const userIdName = {};
        userIdName[userShow.user_id] = userShow.username;
        uSHashmap[showId].push(userIdName);
      }
      res.status(200);
      res.json({
          status: "success",
          message: `all user-show relationships retrieved`,
          payload: uSHashmap
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

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

    // getOneFullUserShow: get the complete data of one user-show relationship
router.get("/show/:show_id/user/:user_id", async (req, res, next) => {
    try {
      const showId = processInput(req.params.show_id, "idNum", "show id");
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const oneFullUserShow = await queries.getOneFullUserShow(showId, userId);
      res.status(200);
      res.json({
          status: "success",
          message: `target user.${userId} - show.${showId} retrieved`,
          payload: oneFullUserShow
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // checkIsAlreadyBinging: get boolean if whether user-show (by imdbId) already exists or not
router.get("/user/:user_id/imdb/:imdb_id", async (req, res, next) => {
    try {
      const userId = processInput(req.params.user_id, "idNum", "user id");
      const imdbId = processInput(req.params.imdb_id, "imdbId", "imdb id");
      const isAlreadyBinging = await queries.checkIsAlreadyBinging(userId, imdbId);
      res.status(200);
      res.json({
          status: "success",
          message: `target user.${userId} - show imdb.${imdbId} retrieved`,
          payload: { imdbId, isAlreadyBinging }
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // addUserShow: add a user-show relationship
router.post("/add/:user_id/:imdb_id", async (req, res, next) => {
    try {
      const watchStatus = processInput(req.body.watchStatus, "watchStatus", "watch status");

      // check if show exists in db and if so grab show_id
      const imdbId = processInput(req.params.imdb_id, "imdbId", "imdb id");
      let showId = null, wasShowJustCreated = null;
      try {
        const response = await refShows.getShowByImdbId(imdbId);
        showId = response.id;
        wasShowJustCreated = false;
      } catch (err) {
        console.log(`auto-creating show (imdb_id: ${imdbId}) in database`);
        const title = processInput(req.body.title, "show title", "show title");
        const year = processInput(req.body.year, "softVarchar22", "show year(s)");
        const imgUrl = processInput(req.body.imgUrl, "softPicUrl", "show image url");
        const response = await refShows.addShow({
          imdbId, title, year, imgUrl
        });
        showId = response.id;
        wasShowJustCreated = true;
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
            payload: { ...response, wasShowJustCreated: wasShowJustCreated }
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
