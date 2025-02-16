import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
// import { useNavigate } from "react-router-dom";

function LoginModal({ handleLogin, closeModal, isOpen, openRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    // <div className="modal">
    <ModalWithForm
      title="Login"
      buttonText="Login"
      isOpen={isOpen}
      handleCloseClick={closeModal} // Ensure close works
      onSubmit={handleSubmit} // Submit handler
      className="modal__content modal_opened"
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
      <button
        type="button"
        className="modal__secondary-button"
        onClick={openRegisterModal}
      >
        Or Sign Up
      </button>
    </ModalWithForm>
    // </div>
  );
}

export default LoginModal;
