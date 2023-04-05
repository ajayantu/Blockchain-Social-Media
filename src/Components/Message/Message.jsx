import React,{useContext} from 'react'
import './Message.css'
import { SocialMediaContext } from '../../Context/SocialMediaContext'

const Message = () => {
    const { errorfilter,successfilter } = useContext(SocialMediaContext);
    return (
        <div className="message">
            {successfilter && <div className="success">
                <div>Success</div>
                <div>Post is successfully Added</div>
            </div>}
            {errorfilter && <div className="error">
                <div>Error</div>
                <div>Illegal Content Please Remove</div>
            </div>}
        </div>
        
    )
}
export default Message 