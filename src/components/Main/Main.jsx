import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp, weatherData, onCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherTemp || !weatherData) {
    return <p>Loading weather data...</p>; // Or a loading spinner
  }

  const weatherType = weatherData.weatherType;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherTemp[currentTempUnit]}°{currentTempUnit} / You may
          want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherType)
            .map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
