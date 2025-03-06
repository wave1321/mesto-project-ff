import './pages/index.css';
import { createCard, likeCard } from './components/card.js';
import { openModal, closeModal, addListenerCloseModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialUser, getInitialCards, setInitialUser, setUserAvatar, postNewCard, deleteCurrentCard, putLikeCard, deleteLikeCard, checkImagelLink } from './components/api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');                     // Список краточек
const profileEditButton = document.querySelector('.profile__edit-button');      // Кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button');        // Кнопка добавления карточки  
const popupTypeEdit = document.querySelector('.popup_type_edit');               // Модальное окно редактирования профиля
const popupTypeAvatar = document.querySelector('.popup_type_avatar');           // Модальное окно обновления аватара
const popupTypeNewCard = document.querySelector('.popup_type_new-card');        // Модальное окно добавления карточки
const popupTypeImage = document.querySelector('.popup_type_image');             // Модальное окно картинки карточки
const popupTypeDelete = document.querySelector('.popup_type_delete')            // Модальное окно подтверждения удаления
const profileTitle = document.querySelector('.profile__title');                 // Имя в профиле
const profileDescription = document.querySelector('.profile__description');     // Описание занятия в профиле
const profileAvatar = document.getElementById('profile__image');                // Аватар профиля
const formProfile = document.forms['edit-profile'];                             // Первая форма с двумя полями (редактирование профиля)
const formCard = document.forms['new-place'];                                   // Вторая форма с двумя полями (создание карточки)
const formAvatar = document.forms['edit-avatar'];                               // Третья форма с один полем (обновление аватара)
const formDelete = document.forms['accept-delete'];                             // Четвертая форма без полей (подтверждение удаления карточки)
const profileInputName = formProfile.elements.name;                             // Первый инпут первой формы (Имя)
const profileInputDescription = formProfile.elements.description;               // Второй инпут первой формы (Занятие)
const cardInputName = formCard.elements['place-name'];                          // Первый инпут второй формы (Название)
const cardInputLink = formCard.elements['link'];                                // Второй инпут второй формы (Сссылка на картинку)
const avatarLink = formAvatar.elements['link'];                                 // Первый инпут третей формы (Сссылка на картинку)
const popupImage = popupTypeImage.querySelector('.popup__image');               // Адрес изображения в модальном окне кратинки карточки
const popupCaption = popupTypeImage.querySelector('.popup__caption');           // Описание карточки в модальном окне кратинки карточки

// @todo: Переменные
let userId = null;                                                              // ID-ключ пользовтеля для связи данных
let cardForDelete = {};                                                         // Данные удаляемой карточки

// @todo: Функция открытия формы профиля
const handleProfileFormOpen = () => {
    profileInputName.value = profileTitle.textContent;
    profileInputDescription.value = profileDescription.textContent;

    clearValidation(formProfile);
    openModal(popupTypeEdit);
};

// @todo: Функция отправки формы профиля
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    renderSaving(true, popupTypeEdit);

    setInitialUser(profileInputName.value, profileInputDescription.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
        })
        .then(() => closeModal(popupTypeEdit))
        .catch((err) => { console.log(err); })
        .finally(() => renderSaving(false, popupTypeEdit));
};

// @todo: Функция отправки формы автара
const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();

    renderSaving(true, popupTypeAvatar);

    setUserAvatar(avatarLink.value)
        .then((res) => { profileAvatar.setAttribute('src', res.avatar); })
        .then(() => closeModal(popupTypeAvatar))
        .catch((err) => { console.log(err); })
        .finally(() => renderSaving(false, popupTypeAvatar));
};

// @todo: Функция отправки формы карточек
const handleCardFromSubmit = (evt) => {
    evt.preventDefault();

    const card = { name: '', link: '' };
    card.name = cardInputName.value;
    card.link = cardInputLink.value;

    renderSaving(true, popupTypeNewCard);

    postNewCard(card.name, card.link)
        .then((card) => {
            placesList.prepend(createCard(userId, card, cardFunctions));
        })
        .then(() => {
            formCard.reset();
            closeModal(popupTypeNewCard);
        })
        .catch((err) => { console.log(err); })
        .finally(() => renderSaving(false, popupTypeNewCard));
};

// @todo: Функция открытия картинки карточки в отдельном окне
const openImage = (card) => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;

    openModal(popupTypeImage);
};

// @todo: Функция открытия окна удаления
const deleteCard = (element, id) => {
    cardForDelete = {
        id: id,
        element
    };

    openModal(popupTypeDelete);
};

// @todo: Функция отправки окна удаления
const handleCardDeleteSubmit = (evt) => {
    evt.preventDefault();
    if (!cardForDelete.element) return;

    deleteCurrentCard(cardForDelete.id)
        .then(() => {
            cardForDelete.element.remove();
            closeModal(popupTypeDelete);
            cardForDelete = {};
        })
        .catch((err) => { console.log(err); });
};

// @todo: Создаем объект с функциями для передачи в функцию создания карточки
const cardFunctions = { openImage, deleteCard, likeCard, putLikeCard, deleteLikeCard };

// @todo: Добавляем слушатели закрытия модальным окнам
addListenerCloseModal(popupTypeEdit);
addListenerCloseModal(popupTypeAvatar);
addListenerCloseModal(popupTypeNewCard);
addListenerCloseModal(popupTypeImage);
addListenerCloseModal(popupTypeDelete);

// @todo: Слушаем открытие окна формы профиля
profileEditButton.addEventListener('click', handleProfileFormOpen);

// @todo: Слушаем отправку формы профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// @todo: Слушаем открытие окна обновления аватара
profileAvatar.addEventListener('click', () => {
    formAvatar.reset();
    clearValidation(formAvatar);
    openModal(popupTypeAvatar);
});

// @todo: Слушаем отправку формы афатара
formAvatar.addEventListener('submit', handleAvatarFormSubmit);

// @todo: Слушаем открытие окна добавления карточки
profileAddButton.addEventListener('click', () => {
    formCard.reset();
    clearValidation(formCard);
    openModal(popupTypeNewCard);
});

// @todo: Слушаем отправку формы карточек
formCard.addEventListener('submit', handleCardFromSubmit);

// @todo: Слушаем отправку подтверждения уделения карточки
formDelete.addEventListener('submit', handleCardDeleteSubmit);

// @todo: Функция одноверменного вывода на экран данных профиля и карточек
const getData = () => {
    Promise.all([getInitialUser(), getInitialCards()])
        .then(([user, cards]) => {
            userId = user._id;
            profileTitle.textContent = user.name;
            profileDescription.textContent = user.about;
            profileAvatar.setAttribute("src", user.avatar);

            cards.forEach((card) => {
                placesList.append(createCard(userId, card, cardFunctions));
            });
        })
        .catch((err) => { console.log(err); });
};

// @todo: Размещаем контент на странице
getData();

// @todo: Рендер кнопки ожидания "Сохранение..."
const renderSaving = (isSaving, popup) => {
    const popupButton = popup.querySelector('.popup__button');

    if (isSaving) {
        popupButton.textContent = "Сохранение...";
    } else {
        popupButton.textContent = "Сохранить";
    }
};

console.log(getInitialCards());
console.log(getInitialUser());

checkImagelLink('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg')
    .then((res) => console.log(res))
    .catch((err) => { console.log(err); });

// @todo: Включаем валидацию
enableValidation();