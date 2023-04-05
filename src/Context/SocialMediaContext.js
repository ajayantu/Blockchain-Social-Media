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
        if(!ethereum) return alert("Install metamask first");

        const accounts = await ethereum.request({method:"eth_accounts"});

        if(accounts.length>0) {
            setCurrentAccount(accounts[0]);
            console.log(accounts[0]);

            // const contractAddress1="0x4353c29e8b6a3f4FF6958570F8D77a5659E04E33";
            const contractAddres ="0x9B5266fAAdac6216d1750a8Abc93bA7603867eef";
            
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
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setCurrentAccount(accounts[0]);

        const contractAddres = "0x4353c29e8b6a3f4FF6958570F8D77a5659E04E33";
        const contractAbi = abi.abi;

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddres,contractAbi,signer);

        setState({provider,signer,contract})

    }

    const filterText = async (input)=>{
        const response = await fetch("http://127.0.0.1:5000/", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(input)
        });
        const result = response.json()
        return result
    }

    const getPostComments = async (postId)=>{
        // const { contract } = state
        // const comments = await contract.viewPostComment(postId);
        // setCommentData(comments)
        // console.log(comments);
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
            errorfilter,
            successfilter,
            setErrorfilter,
            setSuccessfilter,
            state,
            post,
            setPost,
            getPostComments,
            isVisible,
            setIsvisible,
            openView,
            openViewModal,
            closeViewModal,
            openPeople,
            openPeopleModal,
            closePeopleModal
        }}
        >
          {children}
    </SocialMediaContext.Provider>
    );
}

