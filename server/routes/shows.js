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

//     // addshow: add a single new show
// router.post("/", async (req, res, next) => {
//     try {
//       const showname = processInput(req.body.showname, "hardVarchar22", "showname");
//       const avatarUrl = processInput(req.body.avatarUrl, "softUrl", "avatar url");
//       const response = await queries.addshow({ showname, avatarUrl });
//       res.json({
//           status: "success",
//           message: `new show ${showname} added`,
//           payload: response
//       });
//     } catch (err) {
//       handleError(err, req, res, next);
//     }
// });


module.exports = router;
