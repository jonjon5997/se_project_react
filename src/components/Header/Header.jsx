import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header({ handleAddClick, temp, weatherData }) {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  if (!weatherData || !temp) {
    return null; // Or render a loading indicator
  }
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}{" "}
      </p>
      <div className="header__city">{weatherData.city}</div>
      <div className="header__temp">
        {temp[currentTempUnit]}°{currentTempUnit}
      </div>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>

      <div className="header__user-container">
        <ToggleSwitch />
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
