import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
// import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  }); //left part of object is variable name and the second part is the function you can use to change the variable -> variableName, setVariableName
  // const [activeModal, setActiveModal] = useState("preview");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    _id: "",
    name: "Gloves",
    link: "https://cdn.pixabay.com/photo/2024/11/26/12/50/ai-generated-9225728_1280.jpg",
    weather: "cold",
  });
  const [clothingItems, setClothingItems] = useState([]);

  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");

  console.log("Selected Card:", selectedCard);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    const newGarment = {
      name: e.target.name.value,
      ImageUrl: e.target.ImageUrl.value,
      weather: e.target.querySelector('input[type="radio"]:checked').id,
    };
    console.log("New Garment:", newGarment);
    closeActiveModal();
  };

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => {
      const newUnit = prevUnit === "F" ? "C" : "F";
      console.log("Temperature Unit Changed To:", newUnit);
      return newUnit;
    });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("Weather API response:", data);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />{" "}
          {/* pass the variable to the main componenet as a prop*/}
          <Footer />
        </div>
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          // activeModal={activeModal}
          isOpen={activeModal === "add-garment"} // Neutral isOpen logic here
          handleCloseClick={closeActiveModal}
          handleSubmit={handleAddGarmentSubmit}
          clothingItems={clothingItems}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              placeholder="name"
              type="text"
              className="modal__input"
              id="name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              placeholder="imageUrl"
              type="url"
              className="modal__input"
              id="imageUrl"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="weatherType"
                className="modal__radio-input"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="weatherType"
                className="modal__radio-input"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="weatherType"
                className="modal__radio-input"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
