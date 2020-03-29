/*
JOSEPH P. PASAOA
URL Reference Helper | Bingebook (a full-stack binge-facilitating app)
*/


const hostname = process.env.NODE_ENV === 'production'
  ? ""
  : "http://localhost:11211"
;


module.exports = { hostname };
