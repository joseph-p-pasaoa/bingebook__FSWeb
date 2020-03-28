/*
Joseph P. Pasaoa
ShowsList Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './ShowsList.css';
import { hostname } from '../helpers/urls';
import ShowCard from '../components/ShowCard';


/* MAIN */
const ShowsList = () => {
  const [ shows, setShows ] = useState([]);

  useEffect(() => {
      const getAllShows = async () => {
        const response = await axios.get(hostname + "/shows/");
        setShows(response.data.payload);
      };

      getAllShows();
  }, []);


  const listShows = shows.map((show, index) => {
      const listWatchers = show.watchers.map((watcher, index, arr) => {
          return (
            <li key={watcher.watcherId}>
              <Link
                key={watcher.watcherId}
                to={`/shows/${show.id}/user/${watcher.watcherId}`}
                className="regular-copy"
              >
                {watcher.username}
              </Link>
              {index !== arr.length - 1 ? "," : ""}
            </li>
          );
      });
      return (
        <ShowCard
          key={show.id}
          index={index}
          watchers={listWatchers}
          id={show.id}
          imdbId={show.imdb_id}
          title={show.title}
          year={show.year}
          imgUrl={show.img_url}
          genres={show.genres}
        />
      );
  });

  return (
    <>
      <h1>all shows</h1>

      <div className="list-shows--container">
        {listShows}
      </div>
    </>
  );
}


export default ShowsList;
