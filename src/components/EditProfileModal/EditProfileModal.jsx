import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { updateUserProfile } from "../../utils/api";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Define loading state

  // Populate fields with current user data when modal opens
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        onUpdateUser(updatedUser); // Update state in parent component
        onClose(); // Close modal
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save"} // ✅ Show loading state
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      className="modal__content"
    >
      <label className="modal__form">
        Name *
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__form">
        Avatar *
        <input
          className="modal__input"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
