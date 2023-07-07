import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-content"
      title="Новое место"
      buttonText="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        name="img_name"
        id="img-name-input"
        className="popup__input popup__input_form_image-title"
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        value={name}
        required
      />

      <span className="popup__input-error img-name-input-error"></span>

      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="img_url"
        id="img-url-input"
        className="popup__input popup__input_form_url"
        onChange={handleChangeLink}
        value={link}
        required
      />

      <span className="popup__input-error img-url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
