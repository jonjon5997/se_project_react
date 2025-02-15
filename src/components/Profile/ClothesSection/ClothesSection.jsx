import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  // Ensure currentUser is passed as a prop
}) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!currentUser) {
    return <p>Loading...</p>; // Prevents errors if currentUser isn't loaded yet
  }
  console.log(clothingItems);
  // Filter items to only show those added by the current user
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__item-container">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          Add new +
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.length > 0 ? (
          userClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p className="clothes-section__empty">
            You haven't added any items yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
