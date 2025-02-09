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

  return (
    <ModalWithForm
      title="Signup"
      buttonText="Signup"
      isOpen={isOpen}
      handleCloseClick={closeModal} // Ensure close works
      onSubmit={handleSubmit} // Submit handler
    >
      <div>
        <h2>Register</h2>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar:
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>

        <button onClick={closeModal}>Close</button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
