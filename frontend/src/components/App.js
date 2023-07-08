import React from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../untils/Api";
import * as auth from "../untils/auth";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddContentPopupOpen, setIsAddContentPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false); //хранение состояния авторизации
  const [email, setEmail] = useState(""); //хранение email авторизированного пользователя

  // хранение состояния открытия попапа успеха или ошибки регистрации
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [statusTooltip, setStatusTooltip] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(`Ошибка получения данных: ${err}`));
      api
        .getCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(`Ошибка получения данных: ${err}`));
    }
  }, [loggedIn]);

  // Функции-сеттеры
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddContentPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddContentPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  // Закрытие по ESC и overlay
  const isOpen =
    isEditProfilePopupOpen ||
    isEditAvatarPopupOpen ||
    isAddContentPopupOpen ||
    selectedCard ||
    isInfoTooltipPopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function closeByOverlay(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", closeByOverlay);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", closeByOverlay);
      };
    }
  }, [isOpen]);

  // // Лайки card
  // function handleLike(card) {
  //   const isLiked = card.likes.some((user) => user._id === currentUser._id);
  //   api
  //     .toggleLike(card._id, !isLiked)
  //     .then((newCard) =>
  //       setCards((state) =>
  //         state.map((item) => (item._id === card._id ? newCard : item))
  //       )
  //     )
  //     .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  // }


// Лайки data
  function handleLike(data) {
    const isLiked = data.likes.some((item) => item === currentUser._id);
    api
      .toggleLike(data._id, !isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((item) => (item._id === data._id ? newCard : item))
        )
      )
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }


  // удалить карточку card
  // function handleDeleteClick(card) {
  //   api
  //     .removeCard(card._id)
  //     .then(() =>
  //       setCards((state) => state.filter((item) => item._id !== card._id))
  //     )
  //     .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  // }

    // удалить карточку data
    function handleDeleteClick(data) {
      api
        .removeCard(data._id)
        .then(() =>
          setCards((state) => state.filter((item) => item._id !== data._id))
        )
        .catch((err) => console.log(`Ошибка получения данных: ${err}`));
    }

  function handleUpdateUser(newUserData) {
    api
      .setProfile(newUserData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .setAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }
  // Регистрация и авторизация
  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            const email = res.email;
            setEmail(email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(`Ошибка получения данных: ${err}`));
    }
  };

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          tokenCheck();
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  function handleRegistrate(email, password) {
    auth
      .register(email, password)
      .then(() => {
        navigate("/signin", { replace: true });
        setStatusTooltip(true);
      })
      .catch((err) => {
        console.log(`Ошибка получения данных: ${err}`);
        setStatusTooltip(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={onSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onClose={closeAllPopups}
              onCardLike={handleLike}
              onDeleteLike={handleDeleteClick}
            />
          }
        />

        <Route
          path="/signup"
          element={<Register handleRegistrate={handleRegistrate} />}
        />
        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        <Route path="*" element={<h2>Not found</h2>} />
      </Routes>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddContentPopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      {/* <PopupWithForm name='delete-img' title='Вы уверены?' buttonText='Да' onClose={closeAllPopups} ></PopupWithForm> */}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
      <InfoTooltip
        name="info"
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        isSuccess={statusTooltip}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
