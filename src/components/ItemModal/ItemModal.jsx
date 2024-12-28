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
          src={card.imageUrl}
          alt={card.name || "Item Image"}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {/* Delete Button */}
          <button className="modal__delete-button" onClick={handleDeleteClick}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
