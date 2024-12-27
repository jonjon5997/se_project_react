import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
        </section>
        <section className="profile__clothing-items">
          <ClothesSection
            onCardClick={onCardClick}
            handleAddClick={handleAddClick}
            clothingItems={clothingItems}
            // onSubmit={onSubmit}
          />
        </section>
      </div>
    </>
  );
}

export default Profile;
