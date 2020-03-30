/*
Joseph P. Pasaoa
OMDb API Communication Helper | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import axios from 'axios';

import { hostname } from './urls';

/* FETCHES */
    // get search results
export const getApiSearch = async (query) => {
  try {
    const response = await axios.get(hostname + `/omdb/search?terms=${query}`);
    return response.data.payload;
  } catch (err) {
    console.log("error during API get: ", err);
  }
}

    // get full data on one specific show
export const getApiShow = async (imdbId) => {
  try {
    const response = await axios.get(hostname + `/omdb/${imdbId}`);
    return response.data.payload;
  } catch (err) {
    console.log("error during API get: ", err);
  }
}


export default {
  getApiSearch,
  getApiShow
};
