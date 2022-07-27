import { sendUserOfferData } from './api.js';
import { isEscapeKey } from './util.js';
import { mainPinMarker } from './map.js';

const form = document.querySelector('.ad-form');

const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const userPrice = form.querySelector('#price');
const userType = form.querySelector('#type');
const userTimeIn = form.querySelector('#timein');
const userTimeOut = form.querySelector('#timeout');
const userRoomNumber = form.querySelector('#room_number');
const userRoomCapacity = form.querySelector('#capacity');
const successMessage = document.querySelector('#success').content;
const errorMessage = document.querySelector('#error').content;

const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};
const capacityOption = {
  '1': ['1'],
  '2' : ['2', '1'],
  '3' : ['3','2','1'],
  '100' : ['0'],
};
const getTypeName = () => {
  switch (userType.value) {
    case 'bungalow':
      return 'Бунгало';
    case 'flat':
      return 'Квартиру';
    case 'house':
      return 'Дом';
    case 'hotel':
      return 'Отель';
    case 'palace':
      return 'Дворец';
  }
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

function validatePrice (value) {
  return (value.length && (Number(value) >= minPrice[userType.value] && Number(value) <= 100000));
}

function otherOfferType () {
  return (userPrice.value = minPrice[userType.value]);
}

function validateCapacity () {
  return capacityOption[userRoomNumber.value].includes(userRoomCapacity.value);
}

function validateTimeInOut () {
  return userTimeIn.value >= userTimeOut.value;
}

function getPriceErrorMessage () {
  return `Минимальная цена за ${getTypeName()} - ${minPrice[userType.value]} руб. за ночь`;
}

function getCapacityErrorMessage () {
  switch(userRoomNumber.value) {
    case '1':
    case '2':
    case '3':
      return `Возможное количество гостей: ${capacityOption[userRoomNumber.value].join(',')}`;
    case '100':
      return 'Не для гостей';
  }
}

function getTimeInOutErrorMessage () {
  switch(userTimeIn.value) {
    case '12:00':
      return 'Время выезда: не позднее 12:00';
    case '13:00':
      return 'Время выезда: не позднее 13:00';
    case '14:00':
      return 'Время выезда: не позднее 14:00';
  }
}
pristine.addValidator(
  form.querySelector('.title'),
  validateTitle,
  'Длина заголовка от 30 до 100 символов');

pristine.addValidator(
  userPrice,
  validatePrice,
  getPriceErrorMessage);


pristine.addValidator(
  userRoomNumber,
  validateCapacity,
  getCapacityErrorMessage);

pristine.addValidator(
  userRoomCapacity,
  validateCapacity,
  getCapacityErrorMessage);


pristine.addValidator(
  userTimeOut,
  validateTimeInOut,
  getTimeInOutErrorMessage
);

pristine.addValidator(
  userTimeIn,
  validateTimeInOut,
  getTimeInOutErrorMessage
);

userPrice.addEventListener('change', validatePrice);

userType.addEventListener('change', otherOfferType);

userTimeIn.addEventListener('change', () => {
  if (userTimeIn) {
    userTimeOut.value = userTimeIn.value;
  }
  pristine.validate(userTimeOut);
});

userRoomCapacity.addEventListener('change', () => {
  pristine.validate(userRoomCapacity);
});

const clearForm = () => {
  resetButton.click();
  mainPinMarker.setLatLng({
    lat: 35.68236,
    lng: 139.75317,
  });
  document.querySelector('.ad-form').querySelector('#address').value = `${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую ..';
};
const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onPopupEscKeydown1 = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};
const onPopupEscKeydown2 = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onClick1 = () => {
  closeSuccessMessage();
};

const onClick2 = () => {
  closeErrorMessage();
};

function openSuccessMessage () {
  document.body.append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown1);
  document.addEventListener('click', onClick1);
}

function closeSuccessMessage () {
  document.body.removeChild(document.querySelector('.success'));
  document.removeEventListener('keydown', onPopupEscKeydown1);
}

function openErrorMessage () {
  document.body.append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown2);
  document.addEventListener('click', onClick2);
}

function closeErrorMessage () {
  document.body.removeChild(document.querySelector('.error'));
  document.removeEventListener('keydown', onPopupEscKeydown2);
}

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendUserOfferData(
        () => {
          onSuccess();
          unBlockSubmitButton();
          openSuccessMessage();
        },
        () => {
          unBlockSubmitButton();
          openErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { clearForm, setUserFormSubmit };
