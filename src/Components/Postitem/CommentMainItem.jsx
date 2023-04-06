import React,{useEffect,useContext,useState} from 'react'
import CommentItem from '../Middlesection/CommentItem/CommentItem'
import "./CommentMain.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import pic1 from "../../assets/user.png"

function CommentMainItem(props) {
  const { state } = useContext(SocialMediaContext);
  const { contract } = state
  const [commentData,setCommentData] = useState(null)
  const [comment,setComment] = useState("");
    const handleCommentChange=(e)=>{
        setComment(e.target.value)
      }
      const handlePostComment= async ()=>{
        console.log(comment);
        console.log(props.postId);
        contract && await contract.addComment(props.postId-1,comment);
        window.location.reload()
      }
      useEffect(()=>{
        document.querySelector(`.input_comment${props.postId} input`).focus()
        const getComments = async()=>{
            console.log("comments fetched");
            const comments = await contract.viewPostComment(props.postId-1);
            console.log(comments);
            setCommentData(comments)
        }
        getComments()
        // eslint-disable-next-line
      },[contract])
  return (
    <>
            <div className="add_comment">
              <div className="user_img">
                <img src={pic1} alt="" />
              </div>
              <div className={`input_comment input_comment${props.postId}`}>
                <input type="text" placeholder="Add a comment..." value={comment} onChange={handleCommentChange} />
                <div className="send_comment" onClick={handlePostComment}>
                  <i className='bx bxs-send'></i>
                </div>
              </div>
            </div>
            <div className="comments_container">
              <div className="comments_part">
                {commentData && commentData.map((ele,index) => {
                    return <CommentItem key={index} cmt={ele} />
                })}
              </div>
            </div>
    </>
  )
}

export default CommentMainItem