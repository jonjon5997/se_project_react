// import React from "react";
// import "./ItemCard.css";

// function ItemCard({ item, onCardClick }) {
//   const handleCardClick = () => {
//     onCardClick(item);
//   };

//   console.log(item, onCardClick);
//   return (
//     <li className="card">
//       <h2 className="card__name"> {item.name} </h2>
//       <img
//         onClick={handleCardClick}
//         className="card__image"
//         src={item.imageUrl}
//         alt={item.name}
//       />
//     </li>
//   );
// }

// export default ItemCard;

import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    if (onCardClick) onCardClick(item);
  };

  console.log("Item:", item);
  console.log("onCardClick:", onCardClick);

  return (
    <li className="card">
      <h2 className="card__name">{item.name || "No Name Available"}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || "https://via.placeholder.com/150"}
        alt={item.name || "No Image Available"}
      />
    </li>
  );
}

export default ItemCard;
