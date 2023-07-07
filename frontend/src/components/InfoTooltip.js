import React from "react";
import Succses from "../images/succses.png";
import Fail from "../images/fail.png";

function InfoTooltip({ name, isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container popup__container-infotooltip">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть модальное окно"
          className="button popup__close-btn"
        ></button>
        <img
          className="popup__img-infotooltip"
          src={isSuccess ? Succses : Fail}
        />
        <h2 className="popup__title popup__title-infotooltip">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
