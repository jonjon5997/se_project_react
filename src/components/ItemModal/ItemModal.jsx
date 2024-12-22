// import "./ItemModal.css";
// import { defaultClothingItems } from "../../utils/constants";

// function ItemModal({ activeModal, handleCloseClick, card }) {
//   if (!card) {
//     return null;
//   }

//   return (
//     <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
//       <div className="modal__content modal__content_type_image">
//         <button
//           onClick={handleCloseClick}
//           type="button"
//           className="modal__close"
//         ></button>
//         <img
//           src={card.link || "path-to-default-image.jpg"}
//           alt={card.name || "Item Image"}
//           className="modal__image"
//         />
//         <div className="modal_footer">
//           <h2 className="modal__caption">{card.name}</h2>
//           <p className="modal__weather">Weather: {card.weather}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemModal;

// import "./ItemModal.css";

// function ItemModal({ activeModal, handleCloseClick, card }) {
//   if (!card) {
//     return null; // Prevent rendering if no card is passed
//   }

//   const handleDeleteClick = () => {
//     onDeleteCard(card.id); // Call the delete handler with the card's ID
//   };

//   return (
//     <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
//       <div className="modal__content modal__content_type_image">
//         <button
//           onClick={handleCloseClick}
//           type="button"
//           className="modal__close"
//           aria-label="Close modal"
//         ></button>
//         <img
//           src={card.link || "path-to-default-image.jpg"} // Use fallback if card.link is not provided
//           alt={card.name || "Item Image"}
//           className="modal__image"
//         />
//         <div className="modal_footer">
//           <h2 className="modal__caption">{card.name || "No name provided"}</h2>
//           <p className="modal__weather">
//             Weather: {card.weather || "No weather info"}
//           </p>

//           {/* Delete Button */}
//           <button className="modal__delete-button" onClick={handleDeleteClick}>
//             Delete Card
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemModal;

import React from "react";
import "./ItemModal.css";

const ItemModal = ({ activeModal, handleCloseClick, card, onDeleteCard }) => {
  if (!card) {
    return null;
  }

  const handleDeleteClick = () => {
    onDeleteCard(card._id); // Trigger the deletion
    handleCloseClick(); // Close the modal after deletion
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.link}
          alt={card.name || "Item Image"}
          className="modal__image"
        />
        <div className="modal_footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>

        {/* Delete Button */}
        <button className="modal__delete-button" onClick={handleDeleteClick}>
          Delete Card
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
