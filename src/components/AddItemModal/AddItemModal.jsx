import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(e, { name, imageUrl, weather }); // Include all necessary fields
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen} // This controls modal visibility
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit} // Submit handler
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          type="text"
          className="modal__input"
          id="name"
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="Image URL"
          type="url"
          className="modal__input"
          id="imageUrl"
          required
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
            onChange={handleWeatherChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            required
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
