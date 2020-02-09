/*
JOSEPH P. PASAOA
USERS Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError.js');
// const processInput = require('../helpers/processInput.js');
const {
  getAllUsers,
  // getUserById,
  // addUser
} = require('../queries/users.js');


/* ROUTE HANDLERS */
//    getAllUsers: get all users data
router.get("/", async (req, res, next) => {
    try {
      const allUsers = await getAllUsers();
      res.json({
          status: "success",
          message: "all users retrieved",
          payload: allUsers
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});


module.exports = router;
