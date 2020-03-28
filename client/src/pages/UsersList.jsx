/*
Joseph P. Pasaoa
UsersList Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './UsersList.css';
import UserCard from '../components/UserCard';
import { hostname } from '../helpers/urls';


/* MAIN */
const UsersList = ({cId}) => {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(hostname + `/users/`);
      setUsers(response.data.payload);
    };

    getAllUsers();
  }, []);


  // helper function to separate current user from others but also scoped to make emptyVariable garbage in mem
  let cUserCard = null, listUsers = null;
  const cUserSplitter = () => {
    let emptyIndex = null;
    listUsers = users.map((user, index) => {
        if (user.id === cId) {
          cUserCard =
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              avatarUrl={user.avatar_url}
            />
          emptyIndex = index;
          return null;
        } else {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              avatarUrl={user.avatar_url}
            />
          );
        }
    });
    listUsers.splice(emptyIndex, 1);
  }
  cUserSplitter();


  return (
    <>
      <h1>find users</h1>

      <div className="list-users--container">
        <div className="card-user--current-box">
          {cUserCard}
          <h2 className="card-user--current-label">Your Profile</h2>
        </div>

        {listUsers}
      </div>
    </>
  );
}


export default connect(state => state.userAuthState)(UsersList);
