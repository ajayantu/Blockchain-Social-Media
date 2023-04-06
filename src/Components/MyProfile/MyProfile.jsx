import React, { useState, useContext, useEffect } from "react";
import "./myprofile.css";
import userimg from "../../assets/user.png";
import SideBar from "../Sidebar/Sidebar";
import { SocialMediaContext } from "../../Context/SocialMediaContext";

const MyProfile = () => {
  const { state, currentAccount } = useContext(SocialMediaContext);
  const { contract } = state;
  const [disableInput, setDisableInput] = useState(true);
  const [inputVal, setInputVal] = useState({
    name: "",
    username: "",
    phonenum: "",
    email: "",
    bio: "",
    gender: "",
  });
  const handleEnable = () => {
    setDisableInput(false);
  };
  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(inputVal);
    contract &&
      (await contract.updateProfile(
        inputVal.name,
        inputVal.username,
        inputVal.phonenum,
        inputVal.email,
        inputVal.bio,
        "Male",
        currentAccount
      ));
  };
  useEffect(() => {
    const ele=document.querySelector(".namebox")
    ele.focus()
    const getProf = async () => {
      const prof = await contract.getProfile(currentAccount);
      setInputVal(prof);
    };
    contract && getProf();
    // eslint-disable-next-line
  }, [contract,disableInput]);
  return (
    <>
      <SideBar />
      <div className="MyProfile">
        <form>
            <div className="top_part">
                <div className="edit-icon" onClick={handleEnable}>
                    <i className="bx bx-edit-alt"></i>
                </div>
                <div className="profileimg">
                    <img src={userimg} alt="" width={75} />
                    {/* <button>Change Profile Photo</button> */}
                </div>   
            </div>
          
          
          <div className="name row">
            <div className="field">
              <div>Name</div>
              <input
                value={inputVal.name}
                name="name"
                disabled={disableInput}
                onChange={handleChange}
                className="txtbox namebox"
                type="text"
                placeholder="Enter your Name"
              />
            </div>
            <div className="field">
              <div>Username</div>
              <input
                value={inputVal.username}
                name="username"
                disabled={disableInput}
                onChange={handleChange}
                className="txtbox"
                type="text"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="phonenumber row">
            <div className="field">
              <div>Phone Number</div>
              <input
                value={inputVal.phonenum}
                name="phonenum"
                disabled={disableInput}
                onChange={handleChange}
                className="txtbox"
                type="text"
                placeholder="Enter your Phone Number"
              />
            </div>
            <div className="field">
              <div>E-Mail</div>
              <input
                value={inputVal.email}
                name="email"
                disabled={disableInput}
                onChange={handleChange}
                className="txtbox"
                type="text"
                placeholder="Enter your E-Mail"
              />
            </div>
          </div>
          <div className="bio row">
            <div className="field">
              <div style={{ fontSize: "1rem" }}>Bio</div>
              <textarea
                value={inputVal.bio}
                disabled={disableInput}
                onChange={handleChange}
                name="bio"
                id=""
                rows="2"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  padding: "2%",
                  fontSize: "1rem",
                }}
                placeholder="About Yourself"
              ></textarea>
            </div>
          </div>

          <div className="gender" onChange={handleChange}>
            <h3>Gender :</h3>
            <div className="male">
              <input disabled={disableInput} checked={`${inputVal && inputVal.gender==="Male"?"checked":""}`} type="radio" name="gender" id="Male" value="Male" />
              <label htmlFor="Male">Male</label>
            </div>
            <div className="female">
              <input disabled={disableInput} checked={`${inputVal && inputVal.gender==="Female"?"checked":""}`} type="radio" name="gender" id="Female" value="Female" />
              <label htmlFor="Female">Female</label>
            </div>
            <div className="none">
              <input disabled={disableInput} checked={`${inputVal && inputVal.gender==="none"?"checked":""}`} type="radio" name="gender" id="none" value="none" />
              <label htmlFor="none">Prefer not to say</label>
            </div>
          </div>
          <div className="btn">
            <button type="button" disabled={disableInput} onClick={handleUpdate}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyProfile;
