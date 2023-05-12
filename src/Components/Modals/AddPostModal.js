import React,{ useContext,useState } from 'react'
import "./AddPostModal.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import Message from '../Message/Message';
import { Web3Storage } from 'web3.storage'
import ProgressBar from '../ProgessBar/ProgressBar';

function AddPostModal() {
    const { state,currentAccount,filterImage,filterText, setFilterFeedback,setProgress } = useContext(SocialMediaContext);
    const { contract } = state
    const [postData, setPostData] = useState({})
    const [enableProgress,setEnableProgress] = useState(false)
    const [ipfsFile,setIpfsFile] = useState(null)
    function getAccessToken () {
        return process.env.REACT_APP_IPFS
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
        setEnableProgress(true)
        setProgress({
            msg:"Starting Upload...",
            prog:0
        })
        setFilterFeedback({
            isEnable:false,
        })
        if(!postData.post_text && !ipfsFile){
            setFilterFeedback({
                isEnable:true,
                msg:"Add some contents to the post..."
            })
            return
        }
        setProgress({
            msg:"Filtering..",
            prog:10
        })
        if(postData.post_text){

            const res = await filterText(postData)

            if(res.msg==0){
                setFilterFeedback({
                    isEnable:true,
                    msg:"Violence detected in post text. Please modify your post..."
                })
                return
            }
            else{
                console.log("passed filter text",res);
            }
        }
        setProgress({
            msg:"Filtering..",
            prog:20
        })
        if(ipfsFile){
            const res = await filterImage(ipfsFile)
            if(res.msg==0){
                setFilterFeedback({
                    isEnable:true,
                    msg:"Violence detected in your image..."
                })
                return
            }
            else{
                console.log("passed filter image",res);
            }
        }
        setProgress({
            msg:"Uploading to IPFS..",
            prog:40
        })
        //upload to ipfs and store in blockchain

        let cid,url;
        if(ipfsFile){
            cid = await storeFiles(ipfsFile)
            url = `${cid}.ipfs.dweb.link/${ipfsFile[0].name}`
            console.log("Url is : ",url);
        }
        setProgress({
            msg:"Uplaoding to Blockchain..",
            prog:60
        })
        contract && await contract.addPost(currentAccount,postData.post_text?postData.post_text:"",cid?url:"");
        setProgress({
            msg:"Uplaoding to Blockchain..",
            prog:100
        })
        window.location.reload()
        
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
                    <textarea className='post_text' name="post_text" id="" rows="5" onChange={handleChange} placeholder="Enter your post" ></textarea>
                    <input type="file" onChange={getFiles} />
                </div>
                <button className='modal-qstn-submit' onClick={handleSubmit}>Submit</button>
            </div>
            <Message />
            {enableProgress && <ProgressBar />}
        </div>
        <div id="overlay" onClick={handleModalClose}></div>
    </>
  )
}

export default AddPostModal