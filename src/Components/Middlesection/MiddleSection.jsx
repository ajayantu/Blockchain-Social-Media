import Postitem from "../Postitem/Postitem";
import React, {useEffect, useContext } from 'react'
import pic2 from "../../assets/postimg.jpg"
import pic3 from "../../assets/postimg2.jpg"
import pic4 from "../../assets/postimg3.jpg"
import "./Middlesection.css"

import { SocialMediaContext } from '../../Context/SocialMediaContext'

function Middlesection(){
  const arr=[pic2,pic3,pic4]
  const { post,state,setPost } = useContext(SocialMediaContext);
  const { contract } = state
  let x = Math.floor((Math.random() * 4) + 2);
  useEffect(()=>{
    const postGet = async ()=>{
      const posts = await contract.viewPost();
      console.log(posts);
      setPost(posts)
    }
    contract && postGet();
  },[contract])
      return (
        <div className="middle_part">
          <div className="posts_main_container">
            <div className="post_container">
              {post && post.map((pst,index)=>{
                console.log(pst.postNum);
                  return (
                    <Postitem pic={arr[index%3]} postId={parseInt(pst.postNum)} key={index} userId={pst.userId} postHash={pst.postHash} />
                  )  
              })}    
            </div>
          </div>
        </div>
      );
    }
  export default Middlesection