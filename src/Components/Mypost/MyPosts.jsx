import React from 'react'
import MyPostitem from './MyPostitem'
import "./myposts.css"

const MyPosts = () => {
    return (
        <div className='myPosts'>
            <h2>
                My Posts
            </h2>
            
             <MyPostitem/>
             
             <MyPostitem/>
             
             <MyPostitem/>
             
            
        </div>
    )
}

export default MyPosts