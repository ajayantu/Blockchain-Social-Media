import React,{ useContext } from 'react'
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import "./MainHome.css"
import Navbar from "../Navbar/Navbar"
import Feed from "../Feed/Feed"
import AddPostModal from '../Modals/AddPostModal'
function MainHome() {
  const { currentAccount,state } = useContext(SocialMediaContext);
  const handleModal = (e)=>{
      const modal = document.querySelector(".modal-background");
      const visibility = modal.getAttribute('data-visible');
      if (visibility === "true") {
        modal.setAttribute("data-visible", false);
      }
      else if(visibility === "false"){
        modal.setAttribute("data-visible", true);
      }  
  }
  return (
    <> 
      <div className="main_home_container">
        <button onClick={handleModal}>Add Post</button>
        <div className="app">
          <Navbar wallet={currentAccount} />
          <Feed />
        </div>
      </div>
      <AddPostModal />
    </>

  )
}

export default MainHome