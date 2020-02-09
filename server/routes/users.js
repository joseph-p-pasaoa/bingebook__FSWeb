/*
JOSEPH P. PASAOA
USERS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError.js');
const processInput = require('../helpers/processInput.js');
const queries = require('../queries/users.js');


/* ROUTE HANDLERS */
    // getAllUsers: get all users data
router.get("/", async (req, res, next) => {
    try {
      const allUsers = await queries.getAllUsers();
      res.json({
          status: "success",
          message: "all users retrieved",
          payload: allUsers
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // getUserById: get single user by specified id
router.get("/:id", async (req, res, next) => {
    try {
      const id = processInput(req.params.id, "idNum", "user id");
      const userById = await queries.getUserById(id);
      res.json({
          status: "success",
          message: `user ${id} retrieved`,
          payload: userById
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    // addUser: add a single new user
router.post("/", async (req, res, next) => {
    try {
      const username = processInput(req.body.username, "varchar22", "username");
      const avatarUrl = processInput(req.body.avatarUrl, "softUrl", "avatar url");
      const response = await queries.addUser({ username, avatarUrl });
      res.json({
          status: "success",
          message: `new user ${username} added`,
          payload: response
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
