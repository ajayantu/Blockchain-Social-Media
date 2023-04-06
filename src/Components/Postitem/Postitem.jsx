import React, { useState,useContext, useEffect } from 'react'
import pic1 from "../../assets/user.png"
import "./Postitem.css"
import CommentMainItem from './CommentMainItem'

function Postitem(props) {
  const [isVisible,setIsVisible] = useState(false)
  const handleShowComment = (e)=>{
    const ele = e.target.parentElement.parentElement.parentElement.querySelector(".comments_main_container");
    const visibility = ele.getAttribute('data-visible');
        if (visibility === "true") {
            ele.setAttribute("data-visible", false);
            setIsVisible(false)
        }
        else{
          ele.setAttribute("data-visible", true);
          setIsVisible(true)
        }
    } 
  return (
    <div className="post_item">
      <div className="user_details">
        <img src={pic1} alt="" />
        <div className="name_details">
          <p className="username">@{props.user.username}</p>
          <p className="name">{props.user.name}</p>
        </div>
      </div>
      <div className="post_contents">
        <span>{props.postHash}</span>
        <img src={props.pic} alt="" />
      </div>
      <div className="post_controls">
        <div className="like">
          <i className="bx bx-like" />
          <span>Like</span>
        </div>
        <div className="comment" onClick={handleShowComment}>
          <i className="bx bx-message-dots" />
          <span>Comment</span>
        </div>
        <div className="share">
        <i className='bx bx-share'></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_main_container" data-visible="false">
        {isVisible && <CommentMainItem postId={props.postId} />}
      </div>
  </div>
  )
}

export default Postitem
