import React,{ useContext } from 'react'
import "./ProgressBar.css"
import { SocialMediaContext } from '../../Context/SocialMediaContext'

function ProgressBar() {
  const { progress } = useContext(SocialMediaContext);
  const myStyle = {
    width:`${progress.prog}%`
  }
  return (
    <div className="progress_container">
        <div className="progress">
            <div className="bar_container">
                <div className='bar' style={myStyle}></div>
            </div>
            <p className='progress_text'>{progress.msg}</p>
        </div>
    </div>
  )
}

export default ProgressBar