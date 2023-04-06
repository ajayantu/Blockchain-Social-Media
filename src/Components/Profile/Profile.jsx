import React, { useState,useContext, useEffect } from 'react'
import SideBar from '../Sidebar/Sidebar'
import "./Profile.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'

function Profile() {
    const { state,currentAccount } = useContext(SocialMediaContext);
    const { contract } = state
    const [disableInput,setDisableInput] = useState(true)
    const [inputVal,setInputVal] = useState("")
    const handleEnable=()=>{
        setDisableInput(false)
    }
    const handleChange=(e)=>{
        setInputVal(e.target.value)
    }
    const handleUpdate=async ()=>{
        contract && await contract.updateProfile(inputVal,currentAccount);
    }
    useEffect(()=>{
        const getProf = async()=>{
            const prof = await contract.getProfile(currentAccount)
            setInputVal(prof.accountCid)
        }
        getProf()
        // eslint-disable-next-line
    },[contract])
  return (
    <>
    <SideBar />
    <div className="profile_container">
       
        <div className="profile_content">
            <div className="edit" onClick={handleEnable}>
                <i class='bx bxs-edit-alt'></i>
            </div>
            <input value={inputVal} type="text" name="username" disabled={disableInput} className='profile_name' onChange={handleChange} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    </div>
    </>
  )
}

export default Profile