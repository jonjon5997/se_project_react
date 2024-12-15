import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    // filter method - returns an array d=subject to the conditions youve left in it
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  // Determine the temperature to display
  const displayTemp = weatherData.temp[currentTempUnit];

  console.log("Current Temperature Unit:", currentTempUnit);
  console.log("Weather Data Temp:", weatherData.temp);
  console.log("Display Temp:", weatherData.temp[currentTempUnit]);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {displayTemp} &deg; {currentTempUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
