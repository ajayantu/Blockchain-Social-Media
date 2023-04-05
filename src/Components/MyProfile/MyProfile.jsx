import React from 'react'
import "./myprofile.css"
import userimg from "../../assets/user.png"
import SideBar from '../Sidebar/Sidebar'

const MyProfile = () => {
    const name = "Ashna Saju"
    return (
        <>
        <SideBar />
        <div className='MyProfile'>
            <form>
                <div className="profileimg">
                    <img src={userimg} alt="" width={75} />
                    <button>Change Profile Photo</button>
                </div>

                <div className="name row">
                    <div className='field'>
                        <div>
                            Name
                        </div>
                        <input className='txtbox' type="text" placeholder='Enter your Name' />
                    </div>
                    <div className='field'>
                        <div>
                            Username
                        </div>
                        <input className='txtbox' type="text" placeholder='Enter your username' />
                    </div>
                </div>


                <div className="phonenumber row">
                    <div className="field">
                        <div>
                            Phone Number
                        </div>
                        <input className='txtbox' type="text" placeholder='Enter your Phone Number' />
                    </div>
                    <div className="field">
                        <div>
                            E-Mail
                        </div>
                        <input className='txtbox' type="text" placeholder='Enter your E-Mail' />
                    </div>

                </div>
                <div className="bio row">
                    <div className="field">
                        <div style={{ fontSize: "large" }}>
                            Bio
                        </div>
                        <textarea name="bio" id="" rows="2" style={{ width: "100%", borderRadius: "5px", padding: "2%", fontSize: "large" }} placeholder='About Yourself'></textarea>
                    </div>
                </div>

                <div className="gender">
                <h3 >
                    Gender :
                </h3>
                    <div className="male">
                        <input type="radio" name="gender" id="Male" value="Male" />
                        <label for="Male">Male</label>
                    </div>
                    <div className="female">
                        <input type="radio" name="gender" id="Female" value="Female" />
                        <label for="Female">Female</label>
                    </div>
                    <dv className="none">
                        <input type="radio" name="gender" id="none" value="none" />
                        <label for="none">Prefer not to say</label>
                    </dv>
                </div>

                <div className="btn">
                    <button>Update</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default MyProfile