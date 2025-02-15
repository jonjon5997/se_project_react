// import React from "react";
// import "./ItemModal.css";

// const ItemModal = ({ activeModal, handleCloseClick, card, onDeleteCard }) => {
//   if (!card) {
//     return null;
//   }

//   const handleDeleteClick = () => {
//     onDeleteCard(card._id); // Trigger the deletion
//     handleCloseClick(); // Close the modal after deletion
//   };
//   // Checking if the current user is the owner of the current clothing item
//   const isOwn = selectedCard.owner === currentUser._id;

//   // Creating a variable which you'll then set in `className` for the delete button
//   const itemDeleteButtonClassName = `modal__delete-button ${
//     isOwn ? "" : "modal__delete-button_hidden"
//   }`;

//   return (
//     <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
//       <div className="modal__content modal__content_type_image">
//         <button
//           onClick={handleCloseClick}
//           type="button"
//           className="modal__close"
//         ></button>
//         <img
//           src={card.imageUrl}
//           alt={card.name || "Item Image"}
//           className="modal__image"
//         />
//         <div className="modal__footer">
//           <h2 className="modal__caption">{card.name}</h2>
//           <p className="modal__weather">Weather: {card.weather}</p>
//           {/* Delete Button */}
//           <button className="modal__delete-button modal__delete-button_hidden" onClick={handleDeleteClick}>
//             Delete Item
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemModal;

import React, { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ activeModal, handleCloseClick, card, onDeleteCard }) => {
  const { currentUser } = useContext(CurrentUserContext); // Get currentUser from context

  if (!card) {
    return null;
  }

  const handleDeleteClick = () => {
    onDeleteCard(card._id); // Trigger the deletion
    handleCloseClick(); // Close the modal after deletion
  };

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name || "Item Image"}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {/* Delete Button (only visible if user owns the item) */}
          {isOwn && (
            <button
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
