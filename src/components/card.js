// @todo: Функция получения темплейта карточки
const getTemplate = () => {
    return document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
}; 

// @todo: Функция удаления карточки
/*export const deleteCard = (element, id, deleteCurrentCard) => {
    deleteCurrentCard(id)
        .then(element.remove())
        .catch((err) => { console.log(err); }); 
};*/

// @todo: Функция лайка карточки
export const likeCard = (element, id, putLikeCard, deleteLikeCard) => {
    if (element.classList.contains('card__like-button_is-active')) {
        deleteLikeCard(id)
            .then((res) => { 
                element.setAttribute('data-after', res.likes.length);
                element.classList.remove('card__like-button_is-active');
            })
            .catch((err) => { console.log(err); }); 
    } else {
        putLikeCard(id)
            .then((res) => { 
                element.setAttribute('data-after', res.likes.length);
                element.classList.add('card__like-button_is-active'); 
            })
            .catch((err) => { console.log(err); }); 
    }  
};

// @todo: Функция создания карточки
export const createCard = (userId, card, { openImage, deleteCard, likeCard, putLikeCard, deleteLikeCard }) => {
    const cloneTemplate = getTemplate();
    const cardImage = cloneTemplate.querySelector('.card__image');
    const cardTitle = cloneTemplate.querySelector('.card__title');
    const deleteButton = cloneTemplate.querySelector('.card__delete-button');
    const likeButton = cloneTemplate.querySelector('.card__like-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    // Ставим кол-во лайков для карточки
    likeButton.setAttribute('data-after', card.likes.length);

    // Проверяем лайки на авторство
    const isCardLiked = card.likes.some((likes) => {
        return likes._id === userId;
    });

    // Рисуем наш лайк
    if (isCardLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }
    
    // Слушаем нажатие на картинку
    cardImage.addEventListener('click', () => openImage(card));

    // Добавляем кнопку удаления для карточки и начинаем слушать ее нажатие, если являемся ее автором
    if (userId === card.owner._id) {
        deleteButton.addEventListener('click', () => deleteCard(cloneTemplate, card._id));
    } else {
        deleteButton.classList.add('card__delete-button_is-deactive');
    }
    
    // Слушаем нажатие лайка
    likeButton.addEventListener('click', () => likeCard(likeButton, card._id, putLikeCard, deleteLikeCard));

    return cloneTemplate;
};