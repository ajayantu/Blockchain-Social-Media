import React, { useEffect, useState, useContext } from "react";
import "./Rightsection.css"
import pic1 from "../../assets/user.png"
import { SocialMediaContext } from '../../Context/SocialMediaContext'

function Rightsection(){
  const { state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [peoples,setPeoples]=useState(null);

    const handleFollow = async (user)=>{
        await contract.follow(currentAccount,user)
    }
    useEffect(()=>{
        const getPeople = async()=>{
            const peop = await contract.getAllProfiles()
            console.log(peop[0]);
            setPeoples(peop)
            console.log(peop);
        }
        contract && getPeople()
    },[contract])
      return (
        <>
        <div className="peoples">
          <p>Peoples</p>
        
                {
                    peoples && peoples.map((peop,index)=>{
                        return (
                          <>
                            <div className="people_container">
                              <div className="people_box">
                                <div className="people_item">
                                  <img src={pic1} alt="" />
                                  <span>{peop.name}</span>
                                </div>
                                <button onClick={()=>handleFollow(peop.userId)}>Follow</button>
                              </div>
                              
                            </div>
                          </>
                        )
                    })
                }
        </div> 
        
        </>
        
      );
    }
export default Rightsection