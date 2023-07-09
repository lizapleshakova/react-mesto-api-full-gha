 class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // запрос
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  // получение информация о пользователе
  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(this._handleResponse);
  }

  // Получение карточки
  getCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(this._handleResponse);
  }

  // передача информации о пользователе
  setProfile({ name, about }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about })
    })
      .then(this._handleResponse);
  }

  // передача аватарки
  setAvatar(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this._handleResponse);
  }

  // передача карточки на сервер
  setCard({ name, link }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then(this._handleResponse);
  }

  // Поставить лайк
  toggleLike(id, isLiked) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(this._handleResponse);
  }
  // // Удалить лайк
  // removeLike(_id) {
  //   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   })
  //     .then(this._handleResponse);
  // }

  // Удалить карточку
  removeCard(id) {
    const token = localStorage.getItem('token');

    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(this._handleResponse);
  }
}

// API
// const api = new Api({
//   baseUrl: 'http://localhost:4000',
//   headers: {
//     Authorization: 'c4212045-3513-440b-9652-62d1db009ae6',
//     'Content-Type': 'application/json',
//   },
// });

const api = new Api({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://pleshakova.nomoredomains.work',
  
});

export default api