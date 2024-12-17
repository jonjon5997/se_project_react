import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import { defaultClothingItems } from "../../../utils/constants";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>Add new +</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            // TODO pass as prop // onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
