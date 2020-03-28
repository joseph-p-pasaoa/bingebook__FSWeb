/*
Joseph P. Pasaoa
Client Redux UserSimAuth Reducer | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
// import { AN_ACTION } from '../actionTypes';


/* MAIN */
const INITIAL_STATE = {
  cId: 6,
  cUsername: "just judi",
  cAvatarUrl: "http://localhost:11211/images/uploaded-avatars/avatar-sporty-her.svg"
}

const userAuthReducer = (state = INITIAL_STATE, action) => {
  const newState = { ...state };
  return newState;
}


export default userAuthReducer;
