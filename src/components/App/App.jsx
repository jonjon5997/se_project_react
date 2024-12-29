import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getWeather,
  filterWeatherData,
  parseWeatherData,
} from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [temp, setTemp] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");

  // Fetch weather data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("Weather API response:", data);
        const filteredData = filterWeatherData(data);
        const parsedData = parseWeatherData(data);
        setWeatherData(filteredData);
        setTemp(parsedData.temperature);
      })
      .catch(console.error);
  }, []);

  // Fetch clothing items
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // Escape key listener for closing modals
  useEffect(() => {
    if (!activeModal) return; // Do nothing if no modal is active

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // Only re-run if activeModal changes

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

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
        closeActiveModal();
        console.log("Item added successfully:", addedItem);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

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

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTempUnit,
            handleToggleSwitchChange,
          }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              temp={temp}
              handleToggleSwitchChange={handleToggleSwitchChange}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherTemp={temp}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                  />
                }
              />
            </Routes>
            <Footer />
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
              onDeleteCard={handleDeleteItem}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
