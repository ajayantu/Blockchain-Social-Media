import React,{ useContext,useEffect,useState } from 'react'
import "./Chat.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import SideBar from '../Sidebar/Sidebar';
import pic from "../../assets/user.png"
import {useNavigate} from 'react-router-dom'
function ChatPage() {
    const navigate = useNavigate();
    const { state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [friends,setFriends] = useState(null)
    const handleChat=(id)=>{
        navigate(`/chat/${id}`)
    }
    useEffect(()=>{
        const getFriends = async()=>{
            const fri = await contract.getFollowers(currentAccount)
            
            setFriends(fri)
        }
        contract && getFriends()
    },[contract])
  return (
    <>
    <SideBar />
    <div className="chat_main_container">
        <div className="chat_container">
            <div className="friends_box">
                <div className="top_part">
                    <div className="main_user">
                        <img src={pic} alt="" />
                        <div className="names">
                            <p className='name'>Name</p>
                            <p className='username'>@username</p>
                        </div>   
                    </div>
                </div>
                <div className="bottom_part">
                    <div className="search">
                        <input type="text" placeholder='Enter a name to search' />
                        <div className="search_icon">
                            <i class='bx bx-search-alt-2'></i>
                        </div>
                    </div>

                    <div className="chat_users">
                    {
                            friends && friends.map((fr,index)=>{
                                return(
                                    <div className="chat_user_item" key={index} onClick={()=>handleChat(fr.pubkey)}>
                                        <img src={pic} alt="" />
                                        <div className="names">
                                            <p className='name'>{fr.name}</p>
                                            <p className='username'>@{fr.username}</p>
                                        </div> 
                                    </div>

                                )
                            })
                    }
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ChatPage