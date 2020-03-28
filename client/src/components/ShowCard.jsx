/*
Joseph P. Pasaoa
ShowCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { withRouter, Link, useRouteMatch } from 'react-router-dom';

import './ShowCard.css';
const placeholder = require('../assets/images/placeholder-show.svg');


/* MAIN */
const ShowCard = (props) => {
  /* MAIN OBJECTIVE IS TO BUILD COMPONENT ACCORDING TO PRESENT ROUTE */

  // CARD SECTION DEFAULTS
  let imgUrl = placeholder;
  if (props.imgUrl && props.imgUrl !== "N/A") {
    imgUrl = props.imgUrl;
  }
  let sectionImage = (
        <img src={imgUrl} alt={`${props.title} poster`} className="card-show--img" />
  );
  let sectionTitle = (
        <h2 className="card-show--title">
          {props.title}
        </h2>
  );
  let sectionYear = (
        <h3 className="card-show--year">
          y.{props.year}
        </h3>
  );
  let sectionGenres = (
        <p className="card--text-single card-show--genres">
          <strong>Genre(s):</strong> {props.genres}
        </p>
  );
  let sectionImdbLink = (
        <a className="card--text-single regular-copy"
          href={`https://www.imdb.com/title/${props.imdbId}/`}
          target="_blank" rel="noopener noreferrer"
        >
          IMDb page
        </a>
  );
  let
    sectionWatchers = null,
    watchStatus = null,
    sectionAddButton = null
  ;


  // CARD SECTION VARIATIONS (dependent on route)
  const displayAddButton =
    props.related === true
      ? (
          <button
            type="button"
            className="addshow-btn disabled"
          >
            Already Binging!
          </button>
      )
      : (
          <button
            type="button"
            onClick={(e) => props.handleAddShowClick(e, props.imdbId)}
            className="addshow-btn"
          >
            Add Show
          </button>
      )
  ;
  const imageLink = (
      <Link to={`/shows/${props.showId}/user/${props.userId}`}>
        <img src={imgUrl} alt={`${props.title} poster`} className="card-show--img" />
      </Link>
  );
  const titleLink = (
      <Link to={`/shows/${props.showId}/user/${props.userId}`} className="card-show--title-link">
        <h2 className="card-show--title">
          {props.title}
        </h2>
      </Link>
  );
  const describe = {
    "now": "CURRENTLY BINGING",
    "onRadar": "ON MY WATCHLIST",
    "watched": "ANOTHER BINGE COMPLETED!"
  };
  const displayStatus = (
      <p className="card--text-single">{`Binge status: ${ describe[props.watchStatus] }`}</p>
  );
  const displayWatchers = (
      <>
        <p className="card--text-single">
          <strong>Who's binging this:</strong>
        </p>
        <ul className="card-show--watchers">
          {props.watchers}
        </ul>
      </>
  );


  // TOGGLE VARIATIONS BY ROUTE
  const onAddShowPage = useRouteMatch("/users/:id/addShow");
  const onUsersRoute = useRouteMatch("/users/:id");
  const onShowsRoute = useRouteMatch({ exact: true, path: "/shows" });

  // for add a show page
  if (onAddShowPage) {
    sectionAddButton = displayAddButton;

  // for user profile page
  } else if (onUsersRoute) {
    sectionImage = imageLink;
    sectionTitle = titleLink;
    watchStatus = displayStatus;

  // for all shows page
  } else if (onShowsRoute) {
    sectionWatchers = displayWatchers;

  }


  return (
    <li className="card-show">

      {sectionImage}

      <div className="card-show--right-side">
        <div className="card-show--header">
          {sectionTitle}
          {sectionYear}
        </div>

        {sectionGenres}
        {sectionImdbLink}
        {sectionWatchers}{/* USERS WHO WATCH SHOW */}
        {watchStatus}{/* BINGE STATUS */}
        {sectionAddButton}{/* ADD SHOW BUTTON */}

      </div>

    </li>
  );
}


export default withRouter(ShowCard);
