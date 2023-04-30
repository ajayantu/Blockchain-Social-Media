import React,{useEffect,useContext,useState} from 'react'
import CommentItem from '../Middlesection/CommentItem/CommentItem'
import "./CommentMain.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import pic1 from "../../assets/user.png"
import Message from '../Message/Message'

function CommentMainItem(props) {
  const { state,filterText,setFilterFeedback } = useContext(SocialMediaContext);
  const { contract } = state
  const [commentData,setCommentData] = useState(null)
  const [comment,setComment] = useState("");
    const handleCommentChange=(e)=>{
        setComment(e.target.value)
      }
      const handlePostComment= async ()=>{
        const res = await filterText(comment,1)
        if(res.msg==1){
          contract && await contract.addComment(props.postId-1,comment);
          window.location.reload()
        }
        else{
          setFilterFeedback({
            isEnable:true,
            msg:"Violence content found in your comment..."
          })
        }
      }
      useEffect(()=>{
        document.querySelector(`.input_comment${props.postId} input`).focus()
        const getComments = async()=>{
            console.log("comments fetched");
            const comments = await contract.viewPostComment(props.postId-1);
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
              <Message />
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