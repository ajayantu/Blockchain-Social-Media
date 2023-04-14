import React,{ useContext,useEffect,useState } from 'react'
import SideBar from '../Sidebar/Sidebar'
import pic from "../../assets/user.png"
import { SocialMediaContext } from '../../Context/SocialMediaContext'

import {useParams} from 'react-router-dom'
function Chatting() {
  const { state,currentAccount } = useContext(SocialMediaContext);
  const { contract } = state
  const { userId } = useParams();
  const [chatUser,setChatUser] = useState(null)
  const [chatText,setChatText] = useState("")
  const [chats,setChats] = useState(null)
  const handleChange = (e)=>{
    setChatText(e.target.value)
  }
  const handleSubmit = async()=>{
    await contract.sendMessage(userId,chatText);
    setChats([...chats,{
      sender:1,
      message:chatText
    }])
  }
  const myStyle = {
    backgroundColor:"#666585",
    color:"white",
    borderBottomRightRadius:"8px",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  }
  const myStyle1={
    alignItems:"flex-end"
  }
  const senderStyle = {
    backgroundColor:"#505050",
    color:"white",
    borderTopRightRadius:"8px",
    borderTopLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  }
  const senderStyle1={
    alignItems:"flex-start"
  }
  useEffect(()=>{
    const getProf = async()=>{
        const fri = await contract.getProfile(userId)
        const chats = await contract.readMessage(userId)
        setChats(chats)
        setChatUser(fri)
    }
    contract && getProf()
},[contract])
  return (
    <>
    <SideBar />
      <div className="user_chat_main_container">
        <div className="user_chat_container">
          <div className="user_chat_box">
            <div className="user_top_part">
                <img src={pic} alt="" />
                <div className="names">
                    <p className='name'>{chatUser && chatUser.name}</p>
                    <p className='username'>@{chatUser && chatUser.username}</p>
                </div>  
            </div>
            <div className="chat_part">
              {
                chats && chats.length>0 && chats.map((ch,index)=>{
                  return(
                  <div className="chat_item" style={chatUser.userId!=ch.sender?myStyle1:senderStyle1} key={index}>
                    <div className="chat_item_container" style={chatUser.userId!=ch.sender?myStyle:senderStyle}>
                      <p className="sender">{chatUser.userId!=ch.sender?"you":chatUser.name}</p>
                      <p className="chat_text">{ch.message}</p>
                    </div>
                  </div>
                  )
                  
                }) 
              }
              
            </div>
            <div className="send_part">
              <input name="chat" type="text" placeholder='Send a message....' value={chatText} onChange={handleChange} />
              <div className="send_chat" onClick={handleSubmit}>
                <i className='bx bxs-send'></i>
              </div>
            </div> 
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatting