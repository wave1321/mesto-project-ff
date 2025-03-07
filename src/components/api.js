// @todo: Создаем конфиг объект для работы с запросами
export const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
      authorization: 'a1ae6e8c-895a-4a85-991a-88a12b47f1b6',
      'Content-Type': 'application/json'
    }
};

// @todo: Функция запроса данных пользователя от сервера
export const getInitialUser = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: apiConfig.headers
    })
        .then(res => handleResponse(res));
};

// @todo: Функция запроса карточек от сервера
export const getInitialCards = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
    })
        .then(res => handleResponse(res));
};

// @todo: Функция изменения данных пользователя нв сервере
export const setInitialUser = (name, about) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => handleResponse(res));
};

// @todo: Функция загрузки аватара пользователя нв сервер
export const setUserAvatar = (avatar) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
        .then(res => handleResponse(res));
};

// @todo: Функция добавления новой карточки на сервер
export const postNewCard = (name, link) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => handleResponse(res));
};

// @todo: Функция удаления карточки на сервере
export const deleteCurrentCard = (id) => {
    return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(res => handleResponse(res));
};

// @todo: Функция лайка карточки на сервере
export const putLikeCard = (id) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
        .then(res => handleResponse(res));
};

// @todo: Функция удаления лайка с карточки на сервере
export const deleteLikeCard = (id) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(res => handleResponse(res));
};

// @todo: Функция проверки ответа
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    };

    return Promise.reject(`Ошибка: ${res.status}`)
}