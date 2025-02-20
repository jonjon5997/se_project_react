import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg"; // Fallback avatar
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  temp,
  weatherData,
  openLoginModal,
  openRegisterModal,
  handleSignOut,
}) {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  if (!weatherData || !temp) {
    return null; // Or render a loading indicator
  }
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Generate a placeholder avatar (first letter of the user's name)
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "?");

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
            <div className="header__user-container">
              <Link to="/profile" className="header__link header__link-profile">
                <p className="header__username">{currentUser?.name}</p>
              </Link>
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
              {/* Link to the profile page */}

              {/* <button
                className="header__signout-button"
                onClick={handleSignOut}
              >
                Sign Out
              </button> */}
            </div>
          </>
        ) : (
          <div className="header__auth">
            <button
              onClick={openLoginModal}
              className="header__link header__link-login"
            >
              Log In
            </button>
            <button
              onClick={openRegisterModal}
              className="header__link header__link-signup"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
