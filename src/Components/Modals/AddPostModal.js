import React,{ useContext,useState } from 'react'
import "./AddPostModal.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import Message from '../Message/Message';
import { Web3Storage } from 'web3.storage'

function AddPostModal() {
    const { setErrorfilter,setSuccessfilter,state,currentAccount,filterImage,filterText } = useContext(SocialMediaContext);
    const { contract } = state
    const [postData, setPostData] = useState({})
    const [ipfsFile,setIpfsFile] = useState(null)
    function getAccessToken () {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA5MzQzQzUzOTM2MTE4NTNCZDNiNjY3RjZjNWQwZTkzOTkzMzhDQjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODEwMzU4ODY1MTcsIm5hbWUiOiJ0b2tlbjEifQ.BwE_yRAZijnjQ-_RvgB6entVfS0gRboSxCkowK7DgsU"
    }
    function makeStorageClient () {
        return new Web3Storage({ token: getAccessToken() })
    }
    function getFiles (e) {
        const fileInput = e.target.files
        setIpfsFile(fileInput)
    }
    async function storeFiles (files) {
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid
    }

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
        // await filterImage(ipfsFile)
        
        const res = await filterText({comment:postData.post_text})
        // const res={
        //     msg:"Positive"
        // }
        console.log(res);
        if(res.msg==="Positive"){
            setSuccessfilter(true)
            setErrorfilter(false)
            let cid,url;
            if(ipfsFile){
                cid = await storeFiles(ipfsFile)
                url = `${cid}.ipfs.dweb.link/${ipfsFile[0].name}`
                console.log("Url is : ",url);
            }

            contract && await contract.addPost(currentAccount,postData.post_text,cid?url:"");
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
                    <input type="file" onChange={getFiles} />
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