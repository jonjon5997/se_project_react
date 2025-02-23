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
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { getToken, setToken, removeToken } from "../../utils/token";

function App() {
  // const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [temp, setTemp] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => {
        closeModals();
        closeActiveModal();
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));
  };

  // const handleSubmit = (request) => {
  //   setIsLoading(true);
  //   request()
  //     .then(() => {
  //       closeModals();
  //       closeActiveModal();
  //       navigate("/");
  //     })
  //     .catch((error) => console.error("Error:", error))
  //     .finally(() => setIsLoading(false));
  // };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    // navigate("/", { replace: true });
  };

  // const handleSignOut = () => {
  //   const makeRequest = () => {
  //     return Promise.resolve().then(() => {
  //       localStorage.removeItem("jwt");
  //       setIsLoggedIn(false);
  //       setCurrentUser(null);
  //     });
  //   };

  //   handleSubmit(makeRequest);
  // };

  const handleAddItem = (e, values) => {
    e.preventDefault();
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };

    const makeRequest = () => {
      return addItem(newItem).then((addedItem) => {
        setClothingItems((prevItems) => [addedItem.data, ...prevItems]);
      });
    };

    handleSubmit(makeRequest);
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    const makeRequest = () => {
      return register({ name, avatar, email, password }).then((userData) => {
        if (userData) {
          handleLogin({ email, password });
        }
      });
    };

    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      return authorize({ email, password }).then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          getUserData(data.token).then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
            closeModals();
          });
        }
      });
    };

    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const likeRequest = !isLiked ? addCardLike : removeCardLike;

    const makeRequest = () => {
      return likeRequest(id, token).then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === id ? updatedCard.data : item))
        );
      });
    };

    handleSubmit(makeRequest);
  };

  // Function to handle opening Login modal
  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  // Function to handle opening Register modal
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  // Function to handle closing all modals
  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.error("Failed to fetch user data:", err));
    }
  }, []);

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

  const handleDeleteItem = (id) => {
    const makeRequest = () => {
      return deleteItem(id).then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      });
    };

    handleSubmit(makeRequest);
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
                      handleCardLike={handleCardLike}
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
                          setCurrentUser={setCurrentUser}
                          handleCardLike={handleCardLike}
                          handleSignOut={handleSignOut}
                        />
                      }
                    />
                  }
                />
              </Routes>

              <Footer />

              {isLoginModalOpen && (
                <LoginModal
                  isOpen={isLoginModalOpen}
                  handleLogin={handleLogin}
                  openRegisterModal={openRegisterModal}
                  closeModal={closeModals}
                  buttonText={isLoading ? "Logging in..." : "Login"}
                />
              )}
              {isRegisterModalOpen && (
                <RegisterModal
                  isOpen={isRegisterModalOpen}
                  handleRegistration={handleRegistration}
                  openLoginModal={openLoginModal}
                  closeModal={closeModals}
                  buttonText={isLoading ? "Registering..." : "Register"}
                />
              )}
            </div>

            {activeModal === "add-garment" && (
              <AddItemModal
                closeActiveModal={closeActiveModal}
                isOpen={activeModal === "add-garment"}
                onAddItem={handleAddItem}
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
