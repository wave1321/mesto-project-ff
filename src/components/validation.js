// @todo: Создаем конфиг объект для настройки валидации
export const formValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

// @todo: Функция показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formValidationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidationConfig.errorClass);
};

// @todo: Функция скрыть ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formValidationConfig.inputErrorClass);
  errorElement.classList.remove(formValidationConfig.errorClass);
  errorElement.textContent = '';
};

// @todo: Функция проверки валидности
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.message);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// @todo: Функция поиска невалидного инпута на форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// @todo: Функция отключения активности кнопки
const disableSubmitButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(formValidationConfig.inactiveButtonClass);
};

// @todo: Функция включения активности кнопки
const enableSubmitButton = (buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(formValidationConfig.inactiveButtonClass);
};

// @todo: Функция проверки валидности форм
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
};

// @todo: Функция добавления слушателей инпутам
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formValidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(formValidationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// @todo: Функция влючения валидации
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    setEventListeners(formElement);
  });
};

// @todo: Функция очистки валидации форм
export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formValidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(formValidationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    toggleButtonState(inputList, buttonElement)
  });
};