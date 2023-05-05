import React,{useEffect,useState} from 'react'
import { ethers } from 'ethers';
import abi from "../../src/contracts/SocialMedia.json"
const { ethereum } = window;


export const SocialMediaContext = React.createContext();

export const SocialMediaProvider = ({ children }) => {
    const [post,setPost] = useState(null);
    const [state,setState] = useState({
        provider:null,
        signer:null,
        contract:null
    })
    
    const [currentAccount, setCurrentAccount] = useState("");
    const [errorfilter,setErrorfilter] = useState(false)
    const [successfilter,setSuccessfilter] = useState(false)
    const [filterFeedback,setFilterFeedback] = useState({
        isEnable:false,
        msg:"",
        color:""
    })
    const [progress,setProgress] = useState({
        msg:"",
        prog:0
    })
    const [isVisible,setIsvisible] = useState(false)

    const [openView, setOpenView] = useState(false)
    const openViewModal = ()=>{
        setOpenView(true)
    }

    const closeViewModal = ()=>{
        setOpenView(false)
    }

    const [openPeople, setOpenPeople] = useState(false)
    const openPeopleModal = ()=>{
        setOpenPeople(true)
    }
  
    const closePeopleModal = ()=>{
        setOpenPeople(false)
    }

    const checkIfWalletIsConnect = async ()=>{
        if(!ethereum){
            return alert("Install metamask first");
        }
        if(currentAccount){
            return 1
        }
        const accounts = await ethereum.request({method:"eth_accounts"});

        if(accounts.length>0) {
            setCurrentAccount(accounts[0]);

            // const contractAddress1="0x4353c29e8b6a3f4FF6958570F8D77a5659E04E33";
            const contractAddres ="0x85C2Ad2d8d9e4d26301566C06523f00b19D290e3";
            
            const contractAbi = abi.abi;

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddres,contractAbi,signer);

            setState({provider,signer,contract})


        }
        else {
            console.log("No accounts found");
        }

    }

    const connectWallet = async ()=>{
        if (!ethereum)
        {
            return 0
        }
        if(currentAccount){
            return 1
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setCurrentAccount(accounts[0]);

        const contractAddres = process.env.REACT_APP_BLOCKCHAIN;
        const contractAbi = abi.abi;

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddres,contractAbi,signer);

        setState({provider,signer,contract})

        return 1;

    }

    const filterText = async (input,flag=0)=>{
        let data;
        if(flag==1){
            data = {
                comment:input
            }
        }
        else{
            data = {
                comment:input.post_text
            }
        }
        
        console.log(input);
        const response = await fetch("http://127.0.0.1:5000/media/text", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        });
        const result = await response.json()
        return result
    }
    const filterImage = async (input)=>{
        const formData = new FormData()
        formData.append('file', input[0]);
        const response = await fetch("http://127.0.0.1:5000/media/image", {
            method: 'POST',
            mode: 'cors',
            body: formData
        });
        const result = await response.json()
        return result
    }

    useEffect(() => {
     checkIfWalletIsConnect();
    },[]);
    
    return (
    <SocialMediaContext.Provider
        value={{
            connectWallet,
            currentAccount,
            filterText,
            state,
            post,
            setPost,
            isVisible,
            setIsvisible,
            openView,
            openViewModal,
            closeViewModal,
            openPeople,
            openPeopleModal,
            closePeopleModal,
            filterImage,
            filterFeedback,
            setFilterFeedback,
            progress,
            setProgress
        }}
        >
          {children}
    </SocialMediaContext.Provider>
    );
}

