/*
Joseph P. Pasaoa
Home Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
// import { connect } from 'react-redux';

import './Home.css';


/* MAIN */
const Home = () => {
  return (
    <div className="home-page">
      <p className="welcome-msg">What you watch.</p>
      <p className="welcome-msg">What shows people talk about.<br /><br /></p>
      <p className="welcome-msg"><em>Mastery</em> over everything you binge.</p>
    </div>
  );
}


export default Home;
