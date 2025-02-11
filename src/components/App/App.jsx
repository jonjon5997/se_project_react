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
import { getItems, addItem, deleteItem } from "../../utils/api";
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

  const handleRegistration = ({ email, password }) => {
    register(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          return getUserData(data.token); // Fetch user data after registration
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal(); // Close the modal window
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          // Ensure the API returns `token`
          localStorage.setItem("jwt", data.token); // Store token
          return getUserData(data.token); // Fetch user data
        } else {
          throw new Error("No token received from server");
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal(); // Close the modal window
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  // Function to handle opening Login modal
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  // Function to handle opening Register modal
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  // Function to handle closing all modals
  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  // const handleLogin = ({ email, password }) => {
  //   authorize(email, password)
  //     .then((data) => {
  //       if (data.token) {
  //         setToken(data.token);
  //         return getUserData(data.token); // Fetch user data after login
  //       }
  //     })
  //     .then((userData) => {
  //       setCurrentUser(userData);
  //       setIsLoggedIn(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error logging in user:", error);
  //     });
  // };

  //   register({ name, avatar, email, password })
  //     .then((data) => {
  //       console.log("Registration successful:", data);
  //       closeActiveModal(); // Close the modal after successful registration

  //       return handleLogin({ email, password }); // Automatically log in the user
  //     })
  //     .catch((error) => {
  //       console.error("Error registering user:", error);
  //     });
  // };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    getUserData(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        removeToken();
        setIsLoggedIn(false);
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

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
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
                        />
                      }
                    />
                  }
                />
                {/* 
                {isLoginModalOpen && (
                  <Route
                    path="/"
                    element={
                      <LoginModal
                        closeModal={closeModals}
                        handleLogin={setLoginModalOpen}
                        isOpen={isLoginModalOpen}
                      />
                    }
                  />
                )}

                {isRegisterModalOpen && (
                  <Route
                    path="/"
                    element={
                      <RegisterModal
                        closeModal={closeModals}
                        handleRegistration={setRegisterModalOpen}
                        isOpen={isRegisterModalOpen}
                      />
                    }
                  />
                )} */}
                {/* <Route
                  path="/signin"
                  element={
                    <LoginModal
                      handleLogin={handleLogin}
                      closeModal={closeActiveModal}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <RegisterModal
                      handleRegistration={handleRegistration}
                      closeModal={closeActiveModal}
                    />
                  }
                /> */}
              </Routes>
              <Footer />
              {/* {activeModal === "login" && (
                <LoginModal
                  handleLogin={handleLogin}
                  closeModal={closeActiveModal}
                  isOpen={isLoginModalOpen}
                />
              )}
              {activeModal === "register" && (
                <RegisterModal
                  handleRegistration={handleRegistration}
                  closeModal={closeActiveModal}
                  isOpen={isRegisterModalOpen}
                />
              )} */}
              {isLoginModalOpen && (
                <LoginModal
                  isOpen={isLoginModalOpen}
                  closeModal={closeModals}
                  handleLogin={handleLogin}
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
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
