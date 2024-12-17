import React from "react";
import "./SideBar.css";
import avatar from "../../../assets/avatar.svg";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <img className="sidebar__avatar" src={avatar} alt="default avatar" />
        <p className="sidebar__username">UserName</p>
      </div>
    </>
  );
}

export default SideBar;

// import React from "react";
// import "./SideBar.css"; // Ensure this file exists and is correctly imported

// const SideBar = () => {
//   // Hardcoded username and avatar (ensure these are valid)
//   const username = "Jonathan Sanfilippo";
//   const avatarUrl = "../../../assets/avata.svg"; // Ensure the URL is correct

//   return (
//     <div className="sidebar">
//       {/* Ensure this image URL is valid */}
//       <img
//         src={avatar}
//         alt="User Avatar"
//         className="sidebar__avatar"
//         onError={(e) => (e.target.style.display = "none")} // Hide broken images
//       />
//       <p className="sidebar__username">{username}</p>
//     </div>
//   );
// };

// export default SideBar;
