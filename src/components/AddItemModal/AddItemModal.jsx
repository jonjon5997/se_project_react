import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      // activeModal={activeModal}
      isOpen={isOpen} // Neutral isOpen logic here
      handleCloseClick={closeActiveModal}
      // handleSubmit={handleAddGarmentSubmit}
      // clothingItems={clothingItems}
      onSubmit={(e) => onAddItem(e, { name, link })}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="name"
          type="text"
          className="modal__input"
          id="name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          value={link}
          onChange={handleUrlChange}
          placeholder="imageUrl"
          type="url"
          className="modal__input"
          id="imageUrl"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
