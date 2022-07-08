import { greatAd } from './data.js';

const similarCardsList = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCardsFragment = document.createDocumentFragment();

const similarCards = greatAd();
similarCards.forEach((similarCard) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = similarCard.title;
  cardElement.querySelector('.popup__text--address').textContent = similarCard.address;
  cardElement.querySelector('.popup__text--price').textContent = `${similarCard.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = similarCard.type; // доработать
  cardElement.querySelector('.popup__text--capacity').textContent = `${similarCard.rooms} комнаты для ${similarCard.quests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarCard.checkin}, выезд до ${similarCard.checkout}`;
  cardElement.querySelector('.popup__features').textContent = similarCard.features; // доработать
  cardElement.querySelector('.popup__description').textContent = similarCard.description;
  cardElement.querySelector('.popup__photos').textContent = similarCard.photos; // доработать
  cardElement.querySelector('.popup__avatar').src = `${similarCard.avatar}`; // доработать

  similarCardsFragment.appendChild(cardElement);
});

similarCardsList.appendChild(similarCardsFragment);
similarCardsList();
