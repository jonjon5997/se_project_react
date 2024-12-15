// import "./Main.css";
// import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
// import ItemCard from "../ItemCard/ItemCard";
// import { useMemo } from "react";

// function Main({ weatherData, handleCardClick }) {
//   const weatherType = useMemo(() => {
//     if (weatherTemp > 86) {
//       return "hot";
//     } else if (weatherTemp >= 66 && weatherTemp < 86) {
//       return "warm";
//     } else if (weatherTemp < 66) {
//       return "cold";
//     }
//   }, [weatherTemp, currentTempUnit]);
//   return (
//     <main>
//       <WeatherCard weatherData={weatherData} />
//       <section className="cards">
//         <p className="cards__text">
//           Today is {weatherData.temp.F} &deg; F / You may want to wear:
//         </p>
//         <ul className="cards__list">
//           {defaultClothingItems
//             .filter((item) => {
//               //returns a boolean
//               return item.weather === weatherData.type;
//             })
//             .map((item) => {
//               return (
//                 <ItemCard
//                   key={item._id}
//                   item={item}
//                   onCardClick={handleCardClick}
//                 />
//               );
//             })}
//         </ul>
//         {/* {todo - add the cards} */}
//       </section>
//     </main>
//   );
// }

// export default Main;

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp, weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTempUnit);

  if (!weatherTemp || !weatherData) {
    return <p>Loading weather data...</p>; // Or a loading spinner
  }

  const weatherType = useMemo(() => {
    const temp = currentTempUnit === "F" ? weatherTemp.F : weatherTemp.C;
    if (temp > 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 86) {
      return "warm";
    } else {
      return "cold";
    }
  }, [weatherTemp, currentTempUnit]);

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
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
