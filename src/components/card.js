// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
export const deleteCard = (element) => {
    element.remove();
};

// @todo: Функция лайка карточки
export const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active');
};

// @todo: Функция создания карточки
export const createCard = (name, link, openImageFunction, deleteCardFunction, likeCardFunction) => {
    const cloneTemplate = template.querySelector('.card').cloneNode(true);
    const cardImage = cloneTemplate.querySelector('.card__image');
    const cardTitle = cloneTemplate.querySelector('.card__title');
    const deleteButton = cloneTemplate.querySelector('.card__delete-button');
    const likeButton = cloneTemplate.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener('click', () => openImageFunction(name, link));
    deleteButton.addEventListener('click', () => deleteCardFunction(cloneTemplate));
    likeButton.addEventListener('click', () => likeCardFunction(likeButton));

    return cloneTemplate;
};