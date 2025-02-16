import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../Profile/ClothesSection/ClothesSection";
import {
  getWeather,
  filterWeatherData,
  parseWeatherData,
} from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { authorize, register, getUserData } from "../../utils/auth";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
} from "../../utils/api";
import { getToken, setToken, removeToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [temp, setTemp] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Store user data
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Modal state for Login
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const handleAddItem = (e, values) => {
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
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then((userData) => {
        if (userData) {
          handleLogin({ email, password });
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((data) => {
        if (data.token) {
          // Ensure the API returns `token`
          localStorage.setItem("jwt", data.token); // Store token
          getUserData(data.token) // Fetch user data
            .then((userData) => {
              setCurrentUser(userData);
              setIsLoggedIn(true);
              closeActiveModal(); // Close the modal window
            });
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // Function to handle opening Login modal
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  // Function to handle opening Register modal
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false); // Close the login modal
  };

  // Function to handle closing all modals
  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched items:", data); // Debugging step
        setClothingItems(data); // ✅ Update state with fetched data
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    getUserData(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        setIsLoggedInLoading(false);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        removeToken();
        setIsLoggedIn(false);
        setIsLoggedInLoading(false);
      });
  }, []);

  // Fetch weather data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        const parsedData = parseWeatherData(data);
        setWeatherData(filteredData);
        setTemp(parsedData.temperature);
      })
      .catch((error) => {
        console.error("Error getting weather data:", error);
      });
  }, []);

  // Fetch clothing items
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error getting clothing items:", error);
      });
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
    console.log("is this firing bro");
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
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        console.log(`Item with ID ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt"); // Remove token
    setIsLoggedIn(false); // Update login state
    setCurrentUser(null); // Clear user data
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register"); // Opens the register modal
  };

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{ currentUser, isLoggedIn, isLoggedInLoading }}
      >
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
                openLoginModal={openLoginModal}
                openRegisterModal={openRegisterModal}
                handleSignOut={handleSignOut}

                // onClick={openLoginModal && openRegisterModal}
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
                    <ProtectedRoute
                      element={
                        <Profile
                          onCardClick={handleCardClick}
                          handleAddClick={handleAddClick}
                          clothingItems={clothingItems}
                          currentUser={currentUser}
                          onUpdateUser={updateUserProfile}
                        />
                      }
                    />
                  }
                />
              </Routes>

              {/* <ClothesSection
                onCardClick={handleCardClick}
                clothingItems={clothingItems}
                handleAddClick={handleAddClick}
              /> */}
              <Footer />

              {isLoginModalOpen && (
                <LoginModal
                  isOpen={isLoginModalOpen}
                  closeModal={closeModals}
                  handleLogin={handleLogin}
                  openRegisterModal={openRegisterModal}
                />
              )}
              {isRegisterModalOpen && (
                <RegisterModal
                  isOpen={isRegisterModalOpen}
                  closeModal={closeModals}
                  handleRegistration={handleRegistration}
                />
              )}
            </div>

            {activeModal === "add-garment" && (
              <AddItemModal
                closeActiveModal={closeActiveModal}
                isOpen={activeModal === "add-garment"}
                onAddItem={onAddItem}
                handleAddItem={handleAddItem}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                handleCloseClick={closeActiveModal}
                onDeleteCard={handleDeleteItem}
                handleCardLike={handleCardLike}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
