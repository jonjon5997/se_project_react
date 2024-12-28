import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
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
  const [selectedCard, setSelectedCard] = useState(
    //   {
    //   _id: "",
    //   name: "Gloves",
    //   link: "https://cdn.pixabay.com/photo/2024/11/26/12/50/ai-generated-9225728_1280.jpg",
    //   weather: "cold",
    // }
    null
  );
  const [temp, setTemp] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
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
    console.log("Card clicked:", card);
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
              // currentTempUnit={currentTempUnit}
            />
            <Routes>
              <Route
                path="/"
                element={
                  //pass clothing items as a prop
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
              onDeleteCard={handleDeleteItem} // Pass delete function to modal
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}
export default App;
