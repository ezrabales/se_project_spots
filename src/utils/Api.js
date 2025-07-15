export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }
  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserData()]);
  }
  editUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }
  addNewcard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }
  deleteCard({ id }) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  likeCard({ id }) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  unlikeCard({ id }) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  updateProfilePicture({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
}
