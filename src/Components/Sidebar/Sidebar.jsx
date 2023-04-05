import React, { useContext } from "react";
import "./Sidebar.css"
import pic3 from "../../assets/blockchain.png"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import { Link } from "react-router-dom"
function SideBar(){

  const {openViewModal,openPeopleModal} = useContext(SocialMediaContext)
  const handleModal = (e)=>{
    e.preventDefault()
    const modal = document.querySelector("#modal");
    const overlay = document.querySelector("#overlay");
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  const handlePeopleModal = (e)=>{
    e.preventDefault()
    const modal = document.querySelector("#PeopleModal");
    const overlay = document.querySelector("#overlay");
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  const handleFriendModal = (e)=>{
    e.preventDefault()
    const modal = document.querySelector("#FriendModal");
    const overlay = document.querySelector("#overlay");
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  return (
            <div className="sidebar" data-visible="false">
              
              <div className="sidebar_contents">
                <div className="image-text">
                  <div className="img">
                    <img src={pic3} alt="" />
                  </div>
                  <div className="logo-text">
                    <span>WeChain</span>
                  </div>
                </div>
                <div className="list_items">
                  <div className="menu">
                    <ul className="menu_links">
                      <div className="main_links">
                        <li>
                          {console.log(window.location.pathname)}
                          <Link to="/home" id={window.location.pathname.includes("/home")?"selected-sidemenu":""}>
                            <i className="bx bxs-home" />
                            <span>Home</span>
                          </Link>
                        </li>
                        <li>
                          <Link onClick={handleFriendModal} id={window.location.pathname.includes("/friends")?"selected-sidemenu":""}>
                            <i className='bx bx-user-plus' ></i>
                            <span>Friends</span>
                          </Link>
                        </li>
                        <li>
                          <a href="/">
                            <i className="bx bx-message-square-dots" />
                            <span>Chat</span>
                          </a>
                        </li>
                        <li>
                          <a href="/home" onClick={handleModal}>
                            <i className="bx bx-edit-alt" />
                            <span>Create</span>
                          </a>
                        </li>
                        <li>
                          <Link to="/mypost" id={window.location.pathname.includes("/mypost")?"selected-sidemenu":""}>
                            <i className="bx bx-archive-in" />
                            <span>Your Posts</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/profile" id={window.location.pathname.includes("/profile")?"selected-sidemenu":""}>
                            <i className="bx bx-user-pin" />
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link onClick={handlePeopleModal} id={window.location.pathname.includes("/people")?"selected-sidemenu":""}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>

                            <span>People</span>
                          </Link>
                        </li>
                      </div>
                      <div className="bottom_content">
                        <li>
                          <a href="/">
                            <i className="bx bx-log-out" />
                            <span>Logout</span>
                          </a>
                        </li>
                        <li className="mode">
                          <div className="sun-moon">
                            <i className="bx bx-moon icon moon" />
                            <i className="bx bx-sun icon sun" />
                          </div>
                          <span className="mode-text text">Dark mode</span>
                          <div className="toggle-switch">
                            <span className="switch" />
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }
export default SideBar