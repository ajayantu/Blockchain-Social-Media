import React, { useEffect, useState,useContext } from 'react'
import SideBar from '../Sidebar/Sidebar'
import "./UserPost.css"
import pic from "../../assets/postimg.jpg"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import Navbar from '../Navbar/Navbar'

function UserPost() {
    const { state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [userposts,setUserposts] = useState([]);

    useEffect(()=>{
        const getUserPost = async()=>{
            const uposts = await contract.viewUserPost(currentAccount)
            setUserposts(uposts)
        }
        contract && getUserPost()
    },[contract])
  return (
    <>
        <Navbar />
        <SideBar />
        <div className="userpost_container">
            <h1>Your Posts</h1>
            <div className="userpost">
                {
                    userposts.length>0?userposts.map((post,index)=>{
                        return (
                        <div className="userpost_item">
                            <div className="userpost_img">
                                <img src={pic} alt="" />
                            </div>
                            <p>{post.postHash}</p>
                        </div>
                        )
                    }):<p className='nopost'>You have not posted yet</p>
                }
            </div>
        </div>
    </>
  )
}

export default UserPost