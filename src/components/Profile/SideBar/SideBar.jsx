import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

function SideBar({ onEditProfile, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSignOut(); // Calls the sign-out function from props
    navigate("/"); // Redirects to home after signing out
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || "/path-to-default-avatar.svg"}
          alt="User Avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "User Name"}</p>
      </div>
      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Edit Profile
      </button>
      <button className="sidebar__signout-button" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;
