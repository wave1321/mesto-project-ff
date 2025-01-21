// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (name, link, delCardFunction) {
    const cloneTemplate = template.querySelector('.card').cloneNode(true);
    const cardImage = cloneTemplate.querySelector('.card__image');
    const cardTitle = cloneTemplate.querySelector('.card__title');
    const deleteButton = cloneTemplate.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    
    deleteButton.addEventListener('click', () => delCardFunction(cloneTemplate));

    return cloneTemplate;
};

// @todo: Функция удаления карточки
function deleteCard(item) {
    item.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    placesList.append(createCard(card.name, card.link, deleteCard));
});