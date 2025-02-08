import { useState } from "react";

function LoginModal({ handleLogin, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="modal">
      <form className="modal__form modal__form_login" onSubmit={handleSubmit}>
        <h2>Log In</h2>
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
        <button type="submit">Log In</button>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
