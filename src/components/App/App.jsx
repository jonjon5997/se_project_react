import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ClothesSection from "../Profile/ClothesSection/ClothesSection";
import {
  getWeather,
  filterWeatherData,
  parseWeatherData,
} from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
// import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState(
    //   {
    //   type: "",
    //   temp: { F: 999 },
    //   city: "",
    // }
    null
  ); //left part of object is variable name and the second part is the function you can use to change the variable -> variableName, setVariableName
  // const [activeModal, setActiveModal] = useState("preview");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    _id: "",
    name: "Gloves",
    link: "https://cdn.pixabay.com/photo/2024/11/26/12/50/ai-generated-9225728_1280.jpg",
    weather: "cold",
  });
  const [temp, setTemp] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  // useEffect(() => {
  //   getItems()
  //     .then((data) => setClothingItems(data))
  //     .catch((err) => console.error("Error fetching items:", err));
  // }, []);

  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("Weather API response:", data);
        const filteredData = filterWeatherData(data);
        const parsedData = parseWeatherData(data); // Updated variable name for clarity
        setWeatherData(filteredData);
        setTemp(parsedData.temperature); // Pass parsed temperature object
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
        //set the clothing items using the data that was returned
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };
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
      imageUrl: e.target.imageUrl.value,
      weather: e.target.querySelector('input[type="radio"]:checked').id,
    };
    console.log("New Garment:", newGarment);
    closeActiveModal();
  };

  // useEffect(() => {
  //   setClothingItems(defaultClothingItems);
  // }, []);

  // useEffect(() => {
  //   // Simulating an API call
  //   fetchWeatherData().then((data) => {
  //     setTemp({
  //       F: data?.temperatureFahrenheit || 0,
  //       C: data?.temperatureCelsius || 0,
  //     });
  //     setWeatherData(data);
  //   });
  // }, []);

  // const handleToggleSwitchChange = () => {
  //   setCurrentTemperatureUnit((prevUnit) => {
  //     const newUnit = prevUnit === "F" ? "C" : "F";
  //     console.log("Temperature Unit Changed To:", newUnit);
  //     return newUnit;
  //   });
  // };

  const onAddItem = (e, values) => {
    e.preventDefault();
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...prevItems]);
        console.log("Item added successfully:", addedItem);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  // useEffect(() => {
  //   getWeather(coordinates, APIkey)
  //     .then((data) => {
  //       console.log("Weather API response:", data);
  //       const filteredData = filterWeatherData(data);
  //       const temperature = parseWeatherData(data);
  //       setWeatherData(filteredData);
  //       setTemp(temperature);
  //     })
  //     .catch(console.error);
  // }, []);

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        console.log(`Item with ID ${id} deleted successfully.`);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  function addClothingItem(newItem) {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...prevItems]);
        console.log("Item added successfully:", addedItem);
      })
      .catch((err) => console.error("Error adding item:", err));
  }

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              temp={temp}
              handleToggleSwitchChange={handleToggleSwitchChange}
              currentTempUnit={currentTempUnit}
            />
            <Routes>
              <Route
                path="/"
                element={
                  //pass clothing items as a prop
                  <Main
                    weatherTemp={temp}
                    weatherData={weatherData}
                    onCardClick={() => {}}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/add"
                element={
                  <ClothesSection
                    onCardClick={handleCardClick}
                    onAddClothingItem={addClothingItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile onCardClick={handleCardClick} />}
              />
            </Routes>

            <Footer />
          </div>
          {/* <ModalWithForm
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
        </ModalWithForm> */}
          <div>
            {/* Render clothing items */}
            {clothingItems.map((item) => (
              <div key={item._id}>
                <p>{item.name}</p>
                <button onClick={() => handleDeleteItem(item._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              handleCloseClick={closeActiveModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
