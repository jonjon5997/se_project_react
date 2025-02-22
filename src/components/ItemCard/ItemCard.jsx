// import React from "react";
// import "./ItemCard.css";
// import likeButton from "../../assets/like-button.png";
// import likedButton from "../../assets/liked-button.png";

// function ItemCard({ item, onCardClick, handleCardLike, currentUser }) {
//   const handleCardClick = () => {
//     if (onCardClick) onCardClick(item);
//   };

//   const handleLike = () => {
//     handleCardLike({ id: item._id, isLiked });
//   };

//   // Check if the item was liked by the current user
//   // The likes array should be an array of ids
//   const isLiked = item.likes?.some((id) => id === currentUser?._id);

//   // Hide like button if the user is not logged in
//   const showLikeButton = currentUser && currentUser._id;

//   // Create a variable which you then set in `className` for the like button
//   const itemLikeButtonClassName = `...`;

//   return (
//     <li className="card">
//       <h2 className="card__name">{item.name || "No Name Available"}</h2>
//       <img
//         onClick={handleCardClick}
//         className="card__image"
//         src={item.imageUrl || "https://via.placeholder.com/150"}
//         alt={item.name || "No Image Available"}
//       />
//       {showLikeButton && (
//         <button
//           className={`card__like-button ${
//             isLiked ? "card__like-button_active" : ""
//           }`}
//           style={{ backgroundImage: `url(${likeButton}) url(${likedButton})` }}
//           onClick={handleLike}
//         ></button>
//       )}
//     </li>
//   );
// }

// export default ItemCard;

import React from "react";
import "./ItemCard.css";
import likeButton from "../../assets/like-button.png";
import likedButton from "../../assets/liked-button.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    if (onCardClick) onCardClick(item);
  };

  const handleLike = () => {
    handleCardLike({
      id: item._id,
      isLiked: item.likes?.some((id) => id === currentUser?._id),
    });
  };

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Hide like button if the user is not logged in
  const showLikeButton = currentUser && currentUser._id;

  return (
    <li className="card">
      <h2 className="card__name">{item.name || "No Name Available"}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || "https://via.placeholder.com/150"}
        alt={item.name || "No Image Available"}
      />
      {showLikeButton && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          style={{
            backgroundImage: `url(${isLiked ? likedButton : likeButton})`,
          }}
          onClick={handleLike}
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
