import React, { useState, useEffect } from "react";
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
}) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onEditProfile={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </section>
      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={handleCloseEditProfile}
          currentUser={currentUser}
          onUpdateUser={onUpdateUser}
        />
      )}
    </div>
  );
}

export default Profile;
