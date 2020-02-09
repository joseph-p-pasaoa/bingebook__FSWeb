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
// router.post("/", async (req, res, next) => {
//     try {
//       const imdbId = processInput(req.body.imdbId, "imdbId", "imdb id");
//       const title = processInput(req.body.title, "show title", "show title");
//       const year = processInput(req.body.year, "softVarchar22", "show year(s)");
//       const imgUrl = processInput(req.body.imgUrl, "softPicUrl", "show image url");
//       const response = await queries.addShow({
//         imdbId, title, year, imgUrl
//       });
//       res.json({
//           status: "success",
//           message: `new show '${title}' added`,
//           payload: response
//       });
//     } catch (err) {
//       handleError(err, req, res, next);
//     }
// });


module.exports = router;
