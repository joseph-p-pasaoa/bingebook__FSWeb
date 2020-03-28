/*
Joseph P. Pasaoa
UserCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import './UserCard.css';


/* MAIN */
const UserCard = ({ avatarUrl, username, id, userId }) => {
  const [ cardColor, setCardColor ] = useState("#fff");
  const [ borderColor, setBorderColor ] = useState("#777");
  const [ usernameColor, setUsernameColor ] = useState("#444");

  const atUserShowProfile = useRouteMatch("/shows/:show_id/user/:user_id");


  const handleMouseOver = () => {
    setCardColor("#fbf2e3");
    setBorderColor("#000");
    setUsernameColor("#9c5b0a");
  }
  const handleMouseOut = () => {
    setCardColor("#fff");
    setBorderColor("#777");
    setUsernameColor("#444");
  }


  // for userProfile pages that send prop userId instead + tweak styling to suit
  let flexUserCard = null;
  if (atUserShowProfile) {
    id = userId;
    flexUserCard = {
      display: "flex", flexDirection: "column", marginRight: "22px"
    }
  }


  return (
    <Link
      to={`/users/${id}`}
      className="card-user--profile-link"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <li className="card-user" style={{ backgroundColor: cardColor, borderColor: borderColor, ...flexUserCard }}>
        <img src={avatarUrl} alt={`${username} avatar`} className="card-user--avatar"/>

        <div className="card-user--info">
          <h2 className="card-user--username" style={{ color: usernameColor }}>
            {username}
          </h2>
        </div>
      </li>
    </Link>
  );
}


export default UserCard;
