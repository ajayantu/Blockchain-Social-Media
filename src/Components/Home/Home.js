import React, { useContext } from 'react'
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import "./Home.css"
import ethlogo from "../../assets/ethlogo.png"
import reactlogo from "../../assets/reactlogo.png"
import metamasklogo from "../../assets/metamasklogo.png"
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    const { connectWallet } = useContext(SocialMediaContext);
    const walletConnect = async ()=>{
        const res = await connectWallet();
        if(res==0){
            navigate("/")
            return alert("Please install metamask")
        }
        else{
            navigate("/home");
            window.location.reload()
        }
    }
  return (
    <>
        <div className="home_main_container">
            <div className="navbar">
                <div className="logo"><p>WeChain</p></div>
                <div className="right_content">
                    <div className="menu_items">
                        <a href="/">Home</a>
                        <a href="/">About</a>
                        <a href="/">Tutorials</a>
                        <button className='login_btn' onClick={walletConnect}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>
 Login</button>
                    </div>
                </div>
            </div>
            <div className="page_contents">
                <div className="left_page">
                    <div className="main_title">Web 3.0 <br /> Social Media Platform</div>
                    <div className="subtitle">The Blockchain social media platform aim to revolutionize the way we think about social networks, providing a more transparent, decentralized, and secure experience for users.</div>
                    <button className='connect_btn' onClick={walletConnect}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
 Connect Wallet</button>
                </div>
                <div className="right_page">
                    {/* <img src={titleimg} alt="" /> */}
                    <div className="eth-img img">
                        <img src={ethlogo} alt="" />
                        <img src={reactlogo} alt="" />
                        <img src={metamasklogo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home