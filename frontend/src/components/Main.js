import React from "react";
import { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div
            className="profile__avatar-container"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__image"
            />
          </div>

          <div className="profile__bio">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                type="button"
                aria-label="Редактировать профиль"
                className="profile__edit-btn button"
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить изображение"
          className="profile__add-btn button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            data={card}
            onCardClick={props.onCardClick}
            onClose={props.onClose}
            onCardLike={props.onCardLike}
            onDeleteLike={props.onDeleteLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
