import React,{useContext} from 'react'
import './Message.css'
import { SocialMediaContext } from '../../Context/SocialMediaContext'

const Message = () => {
    const { errorfilter,filterFeedback } = useContext(SocialMediaContext);
    return (
        <div className="message">
            {filterFeedback.isEnable && 
            <div className="error">
                <div className='toppart'>
                    <p>Error</p>
                </div>
                <div className='bottompart'>{filterFeedback.msg}</div>
            </div>}
        </div>
        
    )
}
export default Message 