/*
Joseph P. Pasaoa
UserProfile Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './UserProfile.css';
import ShowCard from '../components/ShowCard';
import { hostname } from '../helpers/urls';


/* MAIN */
const UserProfile = (props) => {
  const [ peekedUser, setPeekedUser ] = useState({ username: "" });
  const [ usersShows, setUsersShows ] = useState([]);

  const peekedId = Number(props.match.params.id);
  const isCurrentUser = peekedId === props.cId;

  useEffect(() => {
    const getPeekedUserComplete = async () => {
      const [ userRes, showsRes ] = await Promise.all([
        axios.get(hostname + `/users/${peekedId}`),
        axios.get(hostname + `/users-shows/user/${peekedId}`)
      ]);
      setPeekedUser(userRes.data.payload);
      setUsersShows(showsRes.data.payload);
    }

    getPeekedUserComplete();
  }, [peekedId]);


  // LINK BUTTON TO ADD SHOW IF ON CURRENT USER'S PROFILE
  let addShowBtn = null;
  if (isCurrentUser) {
    addShowBtn = (
      <Link to={`/users/${props.cId}/addShow`}>
        <button type="button" className="addshow-btn">Add New Binge</button>
      </Link>
    );
  }

  // BUILD SHOW CARDS SECTION
  const listFavs = [];
  const favIdxsToExtract = [];
  const listShows = usersShows.map((show, index) => {
    if (show.is_top3 === true) {
      favIdxsToExtract.push(index);
    }
    return (
      <ShowCard
        key={show.id}
        userId={peekedId}
        relationshipId={show.id}
        showId={show.show_id}
        title={show.title}
        year={show.year}
        imdbId={show.imdb_id}
        imgUrl={show.img_url}
        isTop3={show.is_top3}
        watchStatus={show.watch_status}
        genres={show.genres}
      />
    );
  });
  for (let index of favIdxsToExtract) {
    listFavs.push(listShows.splice(index, 1));
  }


  return (
    <>
      <h1>{isCurrentUser ? "my binges" : `${peekedUser.username}'s binges`}</h1>

      <div className="peeked-user--info-container">
        <h2 className="peeked-user--username">{peekedUser.username}</h2>
        <img src={peekedUser.avatar_url} className="peeked-user--avatar" alt={`${peekedUser.username}'s avatar`} />
      </div>

      {addShowBtn}
      {console.log("YES", hostname)}
      <h2 className="list-users-shows--container--label">
        {isCurrentUser ? "my favorites" : `${peekedUser.username}'s favorites`}
      </h2>
      <div className="list-users-shows--container">
        {listFavs}
      </div>

      <div className="list-users-shows--container">
        {listShows}
      </div>
    </>
  );
}


export default connect(state => state.userAuthState)(UserProfile);
