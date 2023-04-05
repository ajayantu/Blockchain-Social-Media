import React from "react"
import Middlesection from "../Middlesection/MiddleSection"
import AddPostModal from "../Modals/AddPostModal"
import Navbar from "../Navbar/Navbar"
import Rightsection from "../Rightsection/Rightsection"
import SideBar from "../Sidebar/Sidebar"
import "./HomePage.css"
function HomePage(){
    return(
        <>
            <Navbar />
            <div className="main_container">
                <SideBar/>
                <Middlesection/>
                <Rightsection/>
            </div>
        </>
    )
}
export default HomePage