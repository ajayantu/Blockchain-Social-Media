import React, { useContext,useEffect,useState } from 'react'
import "./friendmodal.css"
import userimg from "../../../assets/user.png"
import { SocialMediaContext } from '../../../Context/SocialMediaContext'


const FriendModal = () => {
    const handleModalClose = ()=>{
        const modal = document.querySelector("#FriendModal");
        const overlay = document.querySelector("#overlay");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }
    const { state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [friends,setFriends] = useState(null)

    useEffect(()=>{
        const getFriends = async()=>{
            const friends = await contract.getFollowers(currentAccount)
            const arr=[]
            for(let i=0;i<friends.length;i++){
                const fri=await contract.getProfile(friends[i]);
                arr.push(fri);
            }
            console.log(arr);
            setFriends(arr)
        }
        contract && getFriends()
    },[contract])

    return (
        <>
            <div className='FriendModal' id='FriendModal'>
                    <div className="header">
                        <div className="heading"><b>Friends</b></div>
                        <i style={{ cursor: "pointer" ,color:"red" }} className='bx bx-x-circle bx-sm' onClick={handleModalClose}></i>
                    </div>
                    <div className="list">
                        {
                            friends && friends.map((fr,index)=>{
                                return(
                                    <div className="user" key={index}>
                                        <div className='info'>
                                            <img src={userimg} alt="" width={50} />
                                            <div className="name">
                                                <b><p>{fr.accountCid}</p></b>
                                                <span>@name</span>
                                            </div>
                                        </div>
                                        <div className="btn">
                                            Following
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

export default FriendModal