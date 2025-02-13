import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, addListenerCloseModal } from './components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');                     // Список краточек
const profileEditButton = document.querySelector('.profile__edit-button');      // Кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button');        // Кнопка добавления карточки
const popupTypeEdit = document.querySelector('.popup_type_edit');               // Модальное окно редактирования профиля
const popupTypeNewCard = document.querySelector('.popup_type_new-card');        // Модальное окно добавления карточки
const popupTypeImage = document.querySelector('.popup_type_image');             // Модальное окно картинки карточки
const profileTitle = document.querySelector('.profile__title');                 // Имя в профиле
const profileDescription = document.querySelector('.profile__description');     // Описание занятия в профиле
const formProfile = document.forms['edit-profile'];                             // Первая форма с двумя полями (редактирование профиля)
const formCard = document.forms['new-place'];                                   // Вторая форма с двумя полями (создание карточки)
const profileInputName = formProfile.elements.name;                             // Первый инпут первой формы (Имя)
const profileInputDescription = formProfile.elements.description;               // Второй инпут первой формы (Занятие)

// @todo: Функция открытия формы профиля
const handleProfileFormOpen = () => {
    profileInputName.value = profileTitle.textContent;
    profileInputDescription.value = profileDescription.textContent;

    openModal(popupTypeEdit);
};

// @todo: Функция отправки формы профиля
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    profileTitle.textContent = profileInputName.value;
    profileDescription.textContent = profileInputDescription.value;

    closeModal(popupTypeEdit);
};

// @todo: Функция отправки формы карточек
const handleCardFromSubmit = (evt) => {
    evt.preventDefault();

    const name = formCard.elements['place-name'];
    const link = formCard.elements['link'];

    placesList.prepend(createCard(name.value, link.value, openImage, deleteCard, likeCard));

    name.value = '';
    link.value = '';

    closeModal(popupTypeNewCard);
};

// @todo: Функция открытия картинки карточки в отдельном окне
const openImage = (name, link) => {
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(popupTypeImage);
};

// @todo: Добавляем слушатели закрытия модальным окнам
addListenerCloseModal(popupTypeEdit);

addListenerCloseModal(popupTypeNewCard);

addListenerCloseModal(popupTypeImage);

// @todo: Слушаем открытие окна формы профиля
profileEditButton.addEventListener('click', handleProfileFormOpen);

// @todo: Слушаем отправку формы профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// @todo: Слушаем открытие окна добавления карточки
profileAddButton.addEventListener('click', () => { openModal(popupTypeNewCard); });

// @todo: Слушаем отправку формы карточек
formCard.addEventListener('submit', handleCardFromSubmit);

// @todo: Выводим на экран карточки из списка карточек при загрузке страницы
initialCards.forEach((card) => {
    placesList.append(createCard(card.name, card.link, openImage, deleteCard, likeCard));
});