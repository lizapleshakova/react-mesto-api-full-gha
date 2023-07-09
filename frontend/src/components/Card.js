import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ onCardClick, data, onCardLike, onDeleteLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = data.owner === currentUser._id;
  const isLiked = data.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    onCardClick(data);
  }

  function handleLike() {
    onCardLike(data);
  }

  function handleDeleteClick() {
    onDeleteLike(data);
  }

  return (
    <article className="card">
      <img
        src={data.link}
        alt={data.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__container">
        <h2 className="card__title">{data.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            aria-label="Нравится"
            onClick={handleLike}
            className={cardLikeButtonClassName}
          ></button>
          <p className="card__like-counter">{data.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="card__delete button"
          onClick={handleDeleteClick}
        ></button>
      )}
    </article>
  );
}

export default Card;
