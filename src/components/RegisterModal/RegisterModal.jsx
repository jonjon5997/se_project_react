import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  handleRegistration,
  closeModal,
  isOpen,
  openLoginModal,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    handleRegistration({ name, avatar, email, password });
  };

  console.log("handleRegistration prop:", handleRegistration);

  return (
    // <div className="modal">
    <ModalWithForm
      title="Signup"
      buttonText="Signup"
      isOpen={isOpen}
      handleCloseClick={closeModal} // Ensure close works
      onSubmit={handleSubmit} // Submit handler
      // handleRegistration={handleRegistration}
      className="modal__content modal_opened"
    >
      <div>
        {/* <h2>Register</h2> */}

        <label className="modal__form">
          Name:
          <input
            className="modal__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="modal__form">
          Avatar:
          <input
            className="modal__input"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <label className="modal__form">
          Email:
          <input
            className="modal__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="modal__form">
          Password:
          <input
            className="modal__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="button"
          className="modal__secondary-button_type_register"
          onClick={openLoginModal}
        >
          Or Log in
        </button>
        {/* <button type="submit">Register</button> */}

        {/* <button onClick={closeModal}>Close</button> */}
      </div>
    </ModalWithForm>
    // </div>
  );
}

export default RegisterModal;
