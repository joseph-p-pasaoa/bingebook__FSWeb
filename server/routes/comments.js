/*
JOSEPH P. PASAOA
COMMENTS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError.js');
const processInput = require('../helpers/processInput.js');
const queries = require('../queries/comments.js');


/* ROUTE HANDLERS */
    // getCommentsByUserShow: get all comments for specific user-show relationship
router.get("/:watcher_id/:show_id", async (req, res, next) => {
    try {
      const watcherId = processInput(req.params.watcher_id, "idNum", "watcher id");
      const showId = processInput(req.params.show_id, "idNum", "show id");
      const commentsByUserShow = await queries.getCommentsByUserShow(watcherId, showId);
      res.json({
          status: "success",
          message: `comments for user.${watcherId} - show.${showId} retrieved`,
          payload: commentsByUserShow
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

//     // addShow: add a single new show
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
