const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

// Валидация для "Заголовка объявления"
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  form.querySelector('.title'),
  validateTitle,
  'Длина заголовка от 30 до 100 символов');

// Валидация для поля "Цена за ночь"
const userPrice = form.querySelector('#price');
const userType = form.querySelector('#type');
const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};

function validatePrice (value) {
  return (value.length && (Number(value) >= minPrice[userType.value] && Number(value) <= 100000));
}

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

function getPriceErrorMessage () {
  return `Минимальная цена за ${getTypeName()} - ${minPrice[userType.value]} руб. за ночь`;
}

function otherOfferType () {
  return (userPrice.value = minPrice[userType.value]);
}

form.querySelector('#price').addEventListener('change', validatePrice);
form.querySelector('#type').addEventListener('change', otherOfferType);

pristine.addValidator(
  userPrice,
  validatePrice,
  getPriceErrorMessage);

// Валидация синхранизации поля "Количество комнат" с полем "Количество гостей"
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
const capacityOption = {
  '1': ['1'],
  '2' : ['2', '1'],
  '3' : ['3','2','1'],
  '100' : ['0'],
};

function validateCapacity () {
  return capacityOption[roomNumber.value].includes(roomCapacity.value);
}

function getCapacityErrorMessage () {
  switch(roomNumber.value) {
    case '1':
    case '2':
    case '3':
      return `Возможное количество гостей: ${capacityOption[roomNumber.value].join(',')}`;
    case '100':
      return 'Не для гостей';
  }
}

pristine.addValidator(
  roomNumber,
  validateCapacity,
  getCapacityErrorMessage);
pristine.addValidator(
  roomCapacity,
  validateCapacity,
  getCapacityErrorMessage);

roomCapacity.addEventListener('change', () => {
  pristine.validate(roomCapacity);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
