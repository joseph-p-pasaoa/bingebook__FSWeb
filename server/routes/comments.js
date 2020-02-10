/*
JOSEPH P. PASAOA
COMMENTS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/comments');


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

    // addComment: add a new comment to a userShow relationship
router.post("/add/:user_show_id", async (req, res, next) => {
    try {
      const commenterId = processInput(req.body.commenterId, "idNum", "commenter id");
      const userShowId = processInput(req.params.user_show_id, "idNum", "user-show id");
      const comment = processInput(req.body.comment, "hardText", "comment");
      const response = await queries.addComment({
        commenterId, userShowId, comment
      });
      res.json({
          status: "success",
          message: `new comment on user-show.${userShowId} added`,
          payload: response
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
