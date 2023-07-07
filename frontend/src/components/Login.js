import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth__form">
        <h2 className="auth__header">Вход</h2>
        <input
          type="email"
          name="email"
          id="email"
          className="auth__input auth__input_form_email"
          minLength="2"
          maxLength="60"
          required
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          autoComplete="email"
        />
        <span className="auth__input-error email-input-error"></span>
        <input
          type="password"
          name="password"
          id="password-input"
          className="auth__input auth__input_form_password"
          minLength="2"
          maxLength="60"
          required
          value={password}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          autoComplete="password"
        />
        <span className="auth__input-error password-input-error"></span>
        <button
          type="submit"
          aria-label="Сохранить изменения и закрыть"
          className="auth__submit-btn"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
