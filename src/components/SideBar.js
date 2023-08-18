import React from "react";
import imgProfile from "../icons/imgProfile.jpg";
export default function SideBar() {
  return (
    <div className="sideBar">
      <img src={imgProfile} alt="img Profile" />
      <h3>Hello welcome to my projects page</h3>
      <h4>About me</h4>
      <p>
        I have been preparing myself as a full stack programmer for 2 years
        since I had a great interest in being able to develop an app from start
        to finish even though I prefer to focus more on the backend
      </p>
      <button> bar</button>
    </div>
  );
}
