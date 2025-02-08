import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg"; // Fallback avatar
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function Header({ handleAddClick, temp, weatherData }) {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Modal state for Login
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  if (!weatherData || !temp) {
    return null; // Or render a loading indicator
  }
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Generate a placeholder avatar (first letter of the user's name)
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  // Function to handle opening Login modal
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  // Function to handle opening Register modal
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  // Function to handle closing all modals
  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city} {temp[currentTempUnit]}°{" "}
        {currentTempUnit}
      </p>
      <div className="header__profile-container">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar header__avatar--placeholder">
                    {getInitials(currentUser?.name)}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth">
            <Link to="/signup" className="header__link header__link-signup">
              Sign Up
            </Link>
            <Link to="/signin" className="header__link header__link-login">
              Log In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
