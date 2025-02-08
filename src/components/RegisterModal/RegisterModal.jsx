import { useState } from "react";

function RegisterModal({ handleRegistration, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ email, password, confirmPassword });
  };

  return (
    <div className="modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegistration({
            name,
            avatar,
            email,
            password,
            confirmPassword,
          });
        }}
      >
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </form>
    </div>
  );
}

export default RegisterModal;
