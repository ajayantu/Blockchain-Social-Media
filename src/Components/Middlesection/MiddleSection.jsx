import Postitem from "../Postitem/Postitem";
import React, {useEffect, useContext, useState } from 'react'
import pic2 from "../../assets/postimg.jpg"
import pic3 from "../../assets/postimg2.jpg"
import pic4 from "../../assets/postimg3.jpg"
import "./Middlesection.css"

import { SocialMediaContext } from '../../Context/SocialMediaContext'

function Middlesection(){
  const arr=[pic2,pic3,pic4]
  const { post,state,setPost } = useContext(SocialMediaContext);
  const { contract } = state
  const [postUsers,setpostUsers] = useState([])
  let x = Math.floor((Math.random() * 4) + 2);
  useEffect(()=>{
    const postGet = async ()=>{
      const posts = await contract.viewPost();
      const users=[]
      for(let i=0;i<posts.length;i++)
      {
        const user = await contract.getProfile(posts[i].userId)
        users.push(user)
      }
      setpostUsers(users)
      setPost(posts)
    }
    contract && postGet();
  },[contract])
      return (
        <div className="middle_part">
          <div className="posts_main_container">
            <div className="post_container">
              {post && postUsers.length>0 && post.map((pst,index)=>{
                  return (
                    <Postitem user={postUsers[index]} pic={arr[index%3]} postId={parseInt(pst.postNum)} key={index} userId={pst.userId} postHash={pst.postHash} />
                  )  
              })}    
            </div>
          </div>
        </div>
      );
    }
  export default Middlesection