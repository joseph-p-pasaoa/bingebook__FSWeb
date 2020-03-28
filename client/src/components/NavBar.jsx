/*
Joseph P. Pasaoa
NavBar Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter, useRouteMatch } from 'react-router-dom';

import './NavBar.css';
import Logo from './Logo';


/* MAIN */
const NavBar = ({cId}) => {
  let sliderStyle = { transX: "translateX(0px)", opacity: 0 };

  let onCurrentUserRoute = useRouteMatch(`/users/${cId}`);
  let onUsersRoute = useRouteMatch(`/users`);
  let onShowsRoute = useRouteMatch(`/shows`);
  let onAboutRoute = useRouteMatch(`/about`);

  if (onCurrentUserRoute) {
    sliderStyle = { transX: "translateX(0px)", opacity: 1 };
  } else if (onUsersRoute) {
    sliderStyle = { transX: "translateX(154px)", opacity: 1 };
  } else if (onShowsRoute) {
    sliderStyle = { transX: "translateX(308px)", opacity: 1 };
  } else if (onAboutRoute) {
    sliderStyle = { transX: "translateX(462px)", opacity: 1 };
  }


  return (
    <nav>
      <Logo />
      <ul id="navbar">
        <NavLink to={`/users/${cId}`}><li>My Binges</li></NavLink>
        <NavLink to={`/users`} isActive={(match, {pathname}) => pathname.includes("/users/")}><li>Users</li></NavLink>
        <NavLink to={`/shows`}><li>Shows</li></NavLink>
        <NavLink to={`/about`}><li>About</li></NavLink>
        <li id="active-slide" style={{transform: sliderStyle.transX, opacity: sliderStyle.opacity}}></li>
      </ul>
    </nav>
  );
}


export default compose( withRouter, connect(state => state.userAuthState) )(NavBar);
