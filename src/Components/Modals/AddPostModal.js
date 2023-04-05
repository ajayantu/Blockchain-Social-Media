import React,{ useContext,useState } from 'react'
import "./AddPostModal.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import Message from '../Message/Message';

function AddPostModal() {
    const { setErrorfilter,setSuccessfilter,state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [postData, setPostData] = useState({})

    const handleModalClose = ()=>{
        const modal = document.querySelector("#modal");
        const modal2 = document.querySelector("#PeopleModal");
        const modal3 = document.querySelector("#FriendModal");
        const overlay = document.querySelector("#overlay");
        const sidebar = document.querySelector(".sidebar")
        sidebar.setAttribute("data-visible",false)
        modal.classList.remove("active");
        modal2.classList.remove("active");
        modal3.classList.remove("active");
        overlay.classList.remove("active");
    }
    const handleChange = (e)=>{
        setPostData({
            ...postData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async ()=>{
        // const res = await filterText({comment:postData.post_text})
        const res={
            msg:"Positive"
        }
        console.log(res);
        if(res.msg==="Positive"){
            setSuccessfilter(true)
            setErrorfilter(false)

            await contract.addPost(currentAccount,postData.post_text,"This is image hash");
            window.location.reload()
        }
        else{
            setSuccessfilter(false)
            setErrorfilter(true)
        }
        
    }
  return (
    <>
        <div className="modal" id="modal">
            <div className="modal_top">
                <h1 className='modal_title'>Add Post</h1>
                <div className="close-icon" onClick={handleModalClose}>
                    <i style={{ cursor: "pointer" ,color:"red" }} className='bx bx-x-circle bx-sm' onClick={handleModalClose}></i>
                </div>
            </div>
            <div className="modal_body">
                <div className="modal-container">
                    <textarea className='post_text' name="post_text" id="" rows="10" onChange={handleChange} placeholder="Enter your post" ></textarea>
                    <input type="file" />
                </div>
                <button className='modal-qstn-submit' onClick={handleSubmit}>Submit</button>
            </div>
            <Message />
        </div>
        <div id="overlay" onClick={handleModalClose}></div>
    </>
  )
}

export default AddPostModal