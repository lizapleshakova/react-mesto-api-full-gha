import React from "react";
import headerLogo from "../images/header__logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место." className="header__logo" />
      <div className="header__container">
        <p className="header__email">{email}</p>
        <Routes>
          <Route
            path="/signin"
            element={
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/signup"
            element={
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                className="header__link header__link-singout"
                onClick={onSignOut}
                to="/signin"
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
