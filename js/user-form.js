const form = document.querySelector('.ad-form');

const userPrice = form.querySelector('#price');
const userType = form.querySelector('#type');
const userTimeIn = form.querySelector('#timein');
const userTimeOut = form.querySelector('#timeout');
const userRoomNumber = form.querySelector('#room_number');
const userRoomCapacity = form.querySelector('#capacity');

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
