import React, { useState, useContext } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onUpdateUser,
  handleCardClick,
  handleCardLike,
  // setCurrentUser, // Ensure this is available for logout logic
  setIsLoggedIn, // Ensure this is available for logout logic
  handleSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    onUpdateUser(updatedUser); // Update the user in state
    // onUpdateUser(updatedUser); // call parent function if needed
  };

  const handleSignOutClick = () => {
    handleSignOut(); // Call the sign-out function
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfile={handleEditProfileClick}
          handleSignOut={handleSignOutClick} // Pass handleSignOut to SideBar
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>
      {isEditProfileOpen && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={handleCloseEditProfile}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default Profile;
