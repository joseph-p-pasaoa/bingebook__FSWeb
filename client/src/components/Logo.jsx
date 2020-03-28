/*
Joseph P. Pasaoa
Logo Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';


/* MAIN */
const Logo = () => {
  return (
    <Link to="/" className="logo--container">
      <p id="logo">
        BingebOOk
      </p>
    </Link>
  );
}


export default Logo;
