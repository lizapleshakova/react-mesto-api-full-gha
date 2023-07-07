import React from "react";
function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_zoom-content popup_opened`}>
      <div className="popup__image-container">
        <button
          type="button"
          aria-label="Закрыть модальное окно"
          className="button popup__close-btn"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__zoom-image"
            src={card ? card.link : ""}
            alt=""
          />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;
