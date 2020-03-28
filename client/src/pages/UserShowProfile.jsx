/*
Joseph P. Pasaoa
UserShowProfile Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './UserShowProfile.css';
import UserCard from '../components/UserCard';
import ShowCard from '../components/ShowCard';
import CommentCard from '../components/CommentCard';
import { hostname } from '../helpers/urls';


/* MAIN */
const UserShowProfile = (props) => {
  const [ userShowData, setUserShowData ] = useState({
    username: "",
    title: ""
  });
  const [ commentTxt, setCommentTxt ] = useState("");
  const [ comments, setComments ] = useState([]);
  const [ errorMsg, setErrorMsg ] = useState("");

  const refCommentInput = React.createRef();
  const refBtnSubmit = React.createRef();
  const refStageTop = React.createRef();

  const showId = props.match.params.show_id;
  const userId = props.match.params.user_id;

  const {
    avatar_url,
    username,
    title, 
    year,
    imdb_id,
    img_url,
    genres,
    is_top3,
    watch_status,
    usershow_id
  } = userShowData;

  const getComments = useCallback(async () => {
    const response = await axios.get(hostname + `/comments/${userId}/${showId}`);
      setComments(response.data.payload);
  }, [userId, showId]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    const getUserShowData = async () => {
      const response = await axios.get(hostname + `/users-shows/show/${showId}/user/${userId}`);
      setUserShowData(response.data.payload);
    }
    getUserShowData();
  }, [showId, userId]);


  const handleChange = (e) => {
    setCommentTxt(e.target.value);
  }

  const handleKeydown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    refBtnSubmit.current.blur();

    if (!commentTxt || !commentTxt.trim()) {
      refCommentInput.current.focus();
      setErrorMsg("Please enter a valid comment! :/");
    } else {
      const newCommentObj = {
        commenterId: props.cId.toString(),
        userShowId: usershow_id,
        comment: commentTxt
      };
      setErrorMsg("");
      setCommentTxt("");
      refCommentInput.current.blur();
      try {
        await axios.post(hostname + `/comments/add/${usershow_id}`, newCommentObj);
        getComments();
      } catch (err) {
        console.log ("error: ", err);
      }
    }
  }

  const handleReturnToTop = () => {
    refStageTop.current.scrollIntoView({
          behaviour: 'smooth',
          block: 'end',
          inline: 'center',
      });
  }


  let listComments = null;
  if (comments.length) {
    listComments = comments.map(comment => {
        return (
          <CommentCard
            key={comment.comment_id}
            commenterId={comment.commenter_id}
            commenter={comment.commenter}
            avatarUrl={comment.avatar_url}
            usershowId={comment.user_show_id}
            watcherId={comment.watcher_id}
            comment={comment.body}
            timeModified={comment.time_modified}
          />
        );
    });
  }


  return (
    <>
      <h1>{`${userShowData.username}'s ${userShowData.title.length < 22 ? `'${userShowData.title}'` : ""} binge`}</h1>

      <div ref={refStageTop}></div>

      <div className="user-show--header-grid">
        <UserCard
          userId={userId}
          avatarUrl={avatar_url}
          username={username}
        />
        <ShowCard
          showId={showId}
          title={title}
          year={year}
          imdbId={imdb_id}
          imgUrl={img_url}
          genres={genres}
          isTop3={is_top3}
          watchStatus={watch_status}
        />
      </div>

      <form className="form-comments" onSubmit={handleSubmit}>
          <label htmlFor="commentTxt">Leave a Comment</label>
          <textarea 
            type="text"
            name="commentTxt"
            id="commentTxt"
            className="input-comment"
            ref={refCommentInput}
            value={commentTxt}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            placeholder={`Love or hate ${title}?`}
          />
          <div className="flex-row">
            <button className="btn-comment" ref={refBtnSubmit}>Submit</button>
            <p className="msg-error">{errorMsg}</p>
          </div>
      </form>

      <ul className="flex-column comments--container">
        {listComments}
      </ul>

      {comments.length > 0
        ? <Link
          to={() => false}
          className="regular-copy return-to-top-link"
          onClick={(e) => {
              e.preventDefault();
              handleReturnToTop();
          }}
        >Return to top</Link>
        : null
      }
    </>
  );
}


export default connect(state => state.userAuthState)(UserShowProfile);
