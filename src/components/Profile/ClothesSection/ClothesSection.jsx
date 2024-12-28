import React, { useState } from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClothingItem,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__item-container">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          Add new +
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
