// @todo: Функция вызова закрытия модального попапа клавишей Escape
const handleEscapePress = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};

// @todo: Функция открытия модального попапа
export const openModal = (element) => {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapePress);
};

// @todo: Функция закрытия модального попапа
export const closeModal = (element) => {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapePress);
};

// @todo: Функция добавления слушателя закрытия модального окна на крестик и оверлей
export const addListenerCloseModal = (element) => { 
    const popupClose = element.querySelector('.popup__close'); 
    popupClose.addEventListener('click', () => { closeModal(element); });

    element.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(element);    
        }
    });
};