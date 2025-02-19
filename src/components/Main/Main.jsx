import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  weatherTemp,
  weatherData,
  onCardClick,
  clothingItems,
  handleCardLike,
  currentUser,
}) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(clothingItems);
  if (!weatherTemp || !weatherData) {
    return <p>Loading weather data...</p>; // Or a loading spinner
  }

  const weatherType = weatherData.weatherType;
  // const weatherType = "sunny";
  console.log(weatherType);
  console.log(currentUser);

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
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
                currentUser={currentUser}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
