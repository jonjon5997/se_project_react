// import React from "react";
// import "./ClothesSection.css";
// import ItemCard from "../../ItemCard/ItemCard";
// // import { defaultClothingItems } from "../../../utils/constants";
// function ClothesSection({ onCardClick, clothingItems }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newItem = { _id, name, imageUrl, weather };
//     onAddClothingItem(newItem); // Call the handler passed via props
//     setName(""); // Reset the form
//     setImageUrl("");
//     setWeather("");
//   };

//   return (
//     <div className="clothes-section">
//       <div>
//         <p>Your items</p>
//         <button className="clothes-section__button" onClick={onCardClick}>
//           Add new +
//         </button>
//       </div>
//       <ul className="clothes-section__items">
//         {clothingItems.map((item) => (
//           <ItemCard
//             key={item._id}
//             item={item}
//             // TODO pass as prop
//             onCardClick={onCardClick}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default ClothesSection;

import React, { useState } from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClothingItem,
  handleAddClick,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      _id: Date.now().toString(),
      name,
      imageUrl,
      weather,
    };
    onAddClothingItem(newItem);
    setName("");
    setImageUrl("");
    setWeather("");
  };

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
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="">Select Weather</option>
          <option value="Cold">Cold</option>
          <option value="Warm">Warm</option>
        </select>
        <button type="submit">Add Item</button>
      </form> */}
    </div>
  );
}

export default ClothesSection;
