import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ handleLogin, closeModal, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="modal">
      <ModalWithForm
        title="Login"
        buttonText="Login"
        isOpen={isOpen}
        handleCloseClick={closeModal} // Ensure close works
        onSubmit={handleSubmit} // Submit handler
        className="modal__content"
      >
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
      </ModalWithForm>
    </div>
  );
}

export default LoginModal;
