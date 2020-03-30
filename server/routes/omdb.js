/*
JOSEPH P. PASAOA
OMDB Route Handlers | Bingebook (a full-stack binge-facilitating app)
*/


/* MODULE INITS */
const express = require('express');
  const router = express.Router();
const axios = require('axios');

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const apiKey = process.env.NODE_ENV === 'production'
  ? process.env.API_OMDB_KEY
  : require('../helpers/secret')
;


/* MIDDLEWARE */
const getApiSearch = async (req, res, next) => {
  const queries = processInput(req.query.terms, "hardVarchar60", "search query");
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;
  const url = baseUrl + queries;

  let results = null;
  try {
    response = await axios.get(url);
    if (response.data.Response && response.data.Response === "False") {
      results = [];
    } else {
      results = response.data.Search;
    }
  res.status(200);
  res.json({
      status: "success",
      message: "api search results retrieved",
      payload: results
  });
  } catch (err) {
    handleError(err, req, res, next);
  }
}

// get full data on one specific show
const getApiShow = async (req, res, next) => {
  const imdbId = processInput(req.params.imdbid, "imdbId", "imdb id");
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=`;
  const url = baseUrl + imdbId;

  try {
    const response = await axios.get(url);
    res.status(200);
    res.json({
        status: "success",
        message: "api show info retrieved",
        payload: response.data
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
}


/* ROUTE HANDLERS */
router.get("/search", getApiSearch);
router.get("/:imdbid", getApiShow);


module.exports = router;
