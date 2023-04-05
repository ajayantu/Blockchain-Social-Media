import React from 'react'
import "./CommentItem.css"
import pic1 from "../../../assets/user.png"

function CommentItem(props) {
  return (
    <>
    <div className="user_comments">
      <div className="user_pic">
        <img src={pic1} alt="" />
      </div>
      <div className="comment_content">
          <div className="user_detail">
            Ajay Antu
          </div>
          <div className="comment_text">
            <p>{props.cmt}</p>
          </div>
      </div>
    </div>
    </>
  )
}

export default CommentItem