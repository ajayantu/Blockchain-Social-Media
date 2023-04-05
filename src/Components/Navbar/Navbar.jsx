import React from 'react'
import './Navbar.css'
import pic3 from "../../assets/blockchain.png"
const Navbar = (props) => {
    const handleSidebar = ()=>{
        const sidebar = document.querySelector(".sidebar")
        if(sidebar.getAttribute("data-visible")==="true"){
            document.querySelector("#overlay").classList.remove("active");

            sidebar.setAttribute("data-visible",false)
        }
        else{
            sidebar.setAttribute("data-visible",true)
            document.querySelector("#overlay").classList.add("active");
        }
    }
    return (
        <>
        <nav>
                <div className="nav-content">
                    <div className="bars" onClick={handleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </div>
                    <div className="logo">
                        <img src={pic3} alt="" />
                        <h1 className="logo">Wechain</h1>
                    </div>
                    <div></div>
                </div>
            </nav>
        
        </>
    )
}

export default Navbar