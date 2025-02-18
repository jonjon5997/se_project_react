// import React from "react";
// import "./SideBar.css";

// function SideBar({ currentUser, onEditProfile }) {
//   return (
//     <div className="sidebar">
//       <div className="sidebar__user">
//         <img
//           className="sidebar__avatar"
//           src={currentUser?.avatar || "/path-to-default-avatar.svg"}
//           alt="User Avatar"
//         />
//         <p className="sidebar__username">{currentUser?.name || "User Name"}</p>
//       </div>
//       <button className="sidebar__edit-button" onClick={onEditProfile}>
//         Edit Profile
//       </button>
//     </div>
//   );
// }

// export default SideBar;

// // import React, { useContext } from "react";
// import "./SideBar.css";
// // import Token from "../../../utils/token";
// // import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

// function SideBar({ currentUser, onEditProfile, handleSignOut }) {
//   // const { setIsLoggedIn, setCurrentUser } = useContext(CurrentUserContext);

//   // const handleSignOut = () => {
//   //   localStorage.removeItem("jwt"); // Remove token
//   //   setIsLoggedIn(false); // Update login state
//   //   setCurrentUser(null); // Clear user data
//   // };

//   return (
//     <div className="sidebar">
//       <div className="sidebar__user">
//         <img
//           className="sidebar__avatar"
//           src={currentUser?.avatar || "/path-to-default-avatar.svg"}
//           alt="User Avatar"
//         />
//         <p className="sidebar__username">{currentUser?.name || "User Name"}</p>
//       </div>
//       <button className="sidebar__edit-button" onClick={onEditProfile}>
//         Edit Profile
//       </button>
//       <button className="sidebar__signout-button" onClick={handleSignOut}>
//         Sign Out
//       </button>
//     </div>
//   );
// }

// export default SideBar;

import React from "react";
import "./SideBar.css";

function SideBar({ currentUser, onEditProfile, handleSignOut }) {
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
      <button className="sidebar__signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;
