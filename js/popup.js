import { greatAd } from './data.js';

const similarCardsList = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarCardsFragment = document.createDocumentFragment();

const similarCards = greatAd();
similarCards.forEach((similarCard) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = similarCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = similarCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${similarCard.offer.price} ₽/ночь`;
  switch (similarCard.offer.type) {
    case 'palace':
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      cardElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalow':
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'hotel':
      cardElement.querySelector('.popup__type').textContent = 'Отель';
      break;
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${similarCard.offer.rooms} комнаты для ${similarCard.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarCard.offer.checkin}, выезд до ${similarCard.offer.chechout}`;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featureListItem) => {
    const isNecessary = similarCard.offer.features.some(
      (offerFeature) => featureListItem.classList.contains(`'popup__feature--' + ${offerFeature}`),
    );
    if (!isNecessary) {
      featureListItem.remove();
    }
  });
  cardElement.querySelector('.popup__description').textContent = similarCard.offer.description;
  const photoContainer = cardElement.querySelector('.popup__photos');
  similarCard.offer.photos.forEach((offerPhoto) => {
    const photoTemplate = photoContainer.querySelector('.popup__photo').cloneNode(true);
    photoTemplate.src = `${offerPhoto}`;
    photoContainer.append(photoTemplate);
  });
  photoContainer.querySelector('.popup__photo').remove();
  cardElement.querySelector('.popup__avatar').src = `${similarCard.author.avatar}`;

  similarCardsFragment.appendChild(cardElement);
  //console.log(similarCard);
});

similarCardsList.appendChild(similarCardsFragment);
