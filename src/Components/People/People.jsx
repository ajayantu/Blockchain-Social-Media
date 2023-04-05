import React, { useEffect, useState, useContext } from 'react'
import SideBar from '../Sidebar/Sidebar'
import "./People.css"
import pic1 from "../../assets/user.png"
import { SocialMediaContext } from '../../Context/SocialMediaContext'

function People() {
    const { state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [peoples,setPeoples]=useState(null);

    const handleFollow = async (user)=>{
        console.log(user);
        await contract.follow(currentAccount,user)
    }
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
        <SideBar />
        <div className="users_container">
            <div className="users">

                {
                    peoples && peoples.map((peop,index)=>{
                        return (
                                <div className="people_item_users" key={index}>
                                    <div className="user_info">
                                        <div className="img_user">
                                            <img src={pic1} alt="" />
                                        </div>
                                        <p>{peop.accountCid}</p>
                                    </div>
                                    <div className="follow_btn">
                                        <button onClick={()=>handleFollow(peop.userId)}>Follow</button>
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

export default People