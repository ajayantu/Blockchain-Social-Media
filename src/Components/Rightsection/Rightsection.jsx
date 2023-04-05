import React from "react";
import "./Rightsection.css"
import pic1 from "../../assets/user.png"
function Rightsection(){
      return (
        <div className="peoples">
          <p>Peoples</p>
          <div className="people_container">
            <div className="people_item">
              <img src={pic1} alt="" />
              <span>Rahul Ram</span>
            </div>
            <div className="people_item">
              <img src={pic1} alt="" />
              <span>Rahul Ram</span>
            </div>
            <div className="people_item">
              <img src={pic1} alt="" />
              <span>Rahul Ram</span>
            </div>
            <div className="people_item">
              <img src={pic1} alt="" />
              <span>Rahul Ram</span>
            </div>
          </div>
        </div>
      );
    }
export default Rightsection