import React from "react";
import "./SideBar.css";
import avatar from "../../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatar} alt="default avatar" />
        <p className="sidebar__username">UserName</p>
      </div>
    </div>
  );
}

export default SideBar;
