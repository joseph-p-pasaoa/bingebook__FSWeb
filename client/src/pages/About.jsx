/*
Joseph P. Pasaoa
About Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { connect } from 'react-redux';

import './About.css';


/* MAIN */
const About = ({cUsername}) => {
  return (
    <>
      <h1>about</h1>

      <p className="about-page--welcome">
        Thanks <span className="username">{cUsername}</span>!
      </p>

      <h3 className="about-page--header">On Bingebook</h3>
      <p className="about-page--copy">
        Bingebook was borne from the pyres of Mount Pursuit by the hands of
        developer Joseph P. Pasaoa. It is a labor of love work-in-progress.
      </p>

      <p className="about-page--copy salutations">
        Happy binging!
      </p>
    </>
  );
}


export default connect(state => state.userAuthState)(About);
