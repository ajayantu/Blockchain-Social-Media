import React,{useContext,useState,useEffect} from 'react'
import SideBar from '../Sidebar/Sidebar'
import "./Friends.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'
import pic1 from "../../assets/user.png"

function Friends() {
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
        <SideBar />
        <div className="friends_container">
            <div className="friends">
                {   friends &&
                    friends.map((fr,index)=>{
                        return (
                            <div className="friend_item" key={index}>
                                <div className="img_user">
                                    <img src={pic1} alt="" />
                                </div>
                                <p>{fr.accountCid}</p>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    </>
  )
}

export default Friends