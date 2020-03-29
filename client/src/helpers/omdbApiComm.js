/*
Joseph P. Pasaoa
OMDb API Communication Helper | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import axios from 'axios';

import localKey from './secret';

const apiKey = process.env.NODE_ENV === 'production'
  ? process.env.API_OMDB_KEY
  : localKey
;


/* FETCHES */
    // get search results
export const getApiSearch = async (search) => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;
  const url = baseUrl + search;

  try {
    const response = await axios.get(url);
    if (response.data.Response && response.data.Response === "False") {
      return [];
    } else {
      return response.data.Search;
    }
  } catch (err) {
    console.log("error during API get: ", err);
  }
}

    // get full data on one specific show
export const getApiShow = async (imdbId) => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=`;
  const url = baseUrl + imdbId;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log("error during API get: ", err);
  }
}


export default {
  getApiSearch,
  getApiShow
};
