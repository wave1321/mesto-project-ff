// @todo: Функция получения темплейта карточки
const getTemplate = () => {
    return document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
}; 

// @todo: Функция удаления карточки
export const deleteCard = (element) => {
    element.remove();
};

// @todo: Функция лайка карточки
export const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active');
};

// @todo: Функция создания карточки
export const createCard = (card, { openImage, deleteCard, likeCard }) => {
    const cloneTemplate = getTemplate();
    const cardImage = cloneTemplate.querySelector('.card__image');
    const cardTitle = cloneTemplate.querySelector('.card__title');
    const deleteButton = cloneTemplate.querySelector('.card__delete-button');
    const likeButton = cloneTemplate.querySelector('.card__like-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    cardImage.addEventListener('click', () => openImage(card));
    deleteButton.addEventListener('click', () => deleteCard(cloneTemplate));
    likeButton.addEventListener('click', () => likeCard(likeButton));

    return cloneTemplate;
};