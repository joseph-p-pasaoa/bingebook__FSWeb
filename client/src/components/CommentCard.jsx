/*
Joseph P. Pasaoa
CommentCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';

import './CommentCard.css';


/* MAIN */
const CommentCard = (props) => {
  return (
    <li className="flex-row card-comment">
      <div className="flex-column card-comment-column">
        <h3 className="comment-card--username">{props.commenter}</h3>
        <img src={props.avatarUrl} alt={`${props.commenter}'s avatar`} className="comment-card--avatar" />
        <p className="comment-card--time">{new Date(props.timeModified).toLocaleString()}</p>
      </div>
      <div className="comment-card--comment">{props.comment}</div>
      {/* key, commenterId, usershowId, watcherId */}
    </li>
  );
}


export default CommentCard;
