const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__label',
  errorTextParent: 'ad-form__label',
  errorTextClass: 'ad-form__error-text',
});

// Валидация для "Заголовка объявления"
function validateTitle (value) {
  return value.length > 30 && value.length < 100;
}

pristine.addValidator(
  form.querySelector('.title'),
  validateTitle,
  'Длина заголовка от 30 до 100 символов');

// Валидация для поля "Цена за ночь"
const userPrice = form.querySelector('.price');
const minPrice = {
  'Бунгало' : 0,
  'Квартира' : 1000,
  'Отель' : 3000,
  'Дом' : 5000,
  'Дворец' : 10000,
};

function validatePrice (value) {
  const unit = form.querySelector('[name="type"]:selected');
  return value.length && parseInt(value, 10) >= minPrice[unit.value];  // value.length ?
}

function getPriceErrorMessage () {
  const unit = form.querySelector('[name="type"]:selected');
  return `Минимальная цена за ${unit.value} - ${minPrice[unit.value]} руб. за ночь`;
}

pristine.addValidator(userPrice, validatePrice, getPriceErrorMessage);

function onPriceChange () {                         // вопрос тут с правильностью?
  userPrice.placeholder = minPrice[this.value];
  pristine.validate(userPrice);
}

form.querySelector('.type').addEventListener('change', onPriceChange);

// Валидация синхранизации поля "Количество комнат" с полем "Количество гостей"
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
const capacityOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты' : ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты' : ['для 3 гостей','для 2 гостей','для 1 гостя'],
  '100 комнат' : ['не для гостей'],
};

function validateCapacity () {
  return capacityOption[roomNumber.value].includes(roomCapacity.value);
}

function getCapacityErrorMessage () {
  return 'Количество комнат не соответствует количеству гостей';
}

pristine.addValidator(roomNumber, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(roomCapacity, validateCapacity, getCapacityErrorMessage);

form.addEventListener('submit',(evt) => {
  evt.preventDefault();
  pristine.validate();
});
