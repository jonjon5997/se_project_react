import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  currentUser,
  onUpdateUser,
  handleCardClick,
  handleCardLike,
  setCurrentUser, // Ensure this is available for logout logic
  setIsLoggedIn, // Ensure this is available for logout logic
  handleSignOut,
}) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser); // Update the user in state
    // onUpdateUser(updatedUser); // call parent function if needed
  };

  // const handleSignOut = () => {
  //   localStorage.removeItem("jwt"); // Remove token
  //   setCurrentUser(null); // Clear user data
  //   setIsLoggedIn(false); // Update login state
  // };
  const handleSignOutClick = () => {
    handleSignOut(); // Call the sign-out function
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onEditProfile={handleEditProfileClick}
          handleSignOut={handleSignOutClick} // Pass handleSignOut to SideBar
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          currentUser={currentUser}
          handleCardLike={handleCardLike}
        />
      </section>
      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={handleCloseEditProfile}
          currentUser={currentUser}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default Profile;
