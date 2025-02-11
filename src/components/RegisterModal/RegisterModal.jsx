import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ handleRegistration, closeModal, isOpen }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ name, avatar, email, password });
  };

  console.log("handleRegistration prop:", handleRegistration);

  return (
    <div className="modal">
      <ModalWithForm
        title="Signup"
        buttonText="Signup"
        isOpen={handleRegistration}
        handleCloseClick={closeModal} // Ensure close works
        handleSubmit={handleSubmit} // Submit handler
        handleRegistration={handleRegistration}
        className="modal__content"
      >
        <div>
          <h2>Register</h2>

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
          {/* <button type="submit">Register</button> */}

          {/* <button onClick={closeModal}>Close</button> */}
        </div>
      </ModalWithForm>
    </div>
  );
}

export default RegisterModal;
