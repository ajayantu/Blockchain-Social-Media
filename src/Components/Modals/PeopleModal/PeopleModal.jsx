import React, { useContext, useEffect,useState } from 'react'
import "./peoplemodal.css"
import userimg from "../../../assets/user.png"

import { SocialMediaContext } from '../../../Context/SocialMediaContext'


const PeopleModal = () => {
    const handleModalClose = ()=>{
        const modal = document.querySelector("#PeopleModal");
        const overlay = document.querySelector("#overlay");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }
    const handleFollow = async (user)=>{
        console.log(user);
        await contract.follow(currentAccount,user)
    }
    const context = useContext(SocialMediaContext)
    const { state,currentAccount } = context
    const { contract } = state
    const [peoples,setPeoples]=useState(null);
    useEffect(()=>{
        const getPeople = async()=>{
            const peop = await contract.getAllProfiles()
            setPeoples(peop)
            console.log(peop);
        }
        contract && getPeople()
    },[contract])
    return (
        <>
            <div className='PeopleModal' id="PeopleModal">
                    <div className="header">
                        <div className="heading"><b>People</b></div>
                        <i style={{ cursor: "pointer" ,color:"red" }} className='bx bx-x-circle bx-sm' onClick={handleModalClose}></i>
                    </div>
                    <div className="list">
                    {
                        peoples && peoples.map((peop,index)=>{
                            return(
                                <div className="user" key={index}>
                                    <div className='info'>
                                        <img src={userimg} alt="" width={50} />
                                        <div className="name">
                                            <b><p>{peop.name}</p></b>
                                            <span>@{peop.username}</span>
                                        </div>
                                    </div>
                                    <div className="btn follow" onClick={()=>handleFollow(peop.userId)}>
                                        Follow
                                    </div>
                                </div>
                            )
                        })
                    }     
                    </div>
            </div>
        </>
    )
}

export default PeopleModal