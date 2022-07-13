import { greatAd } from './data.js';

const similarCardsList = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarCardsFragment = document.createDocumentFragment();

const similarCards = greatAd();
similarCards.forEach((similarCard) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  if (similarCard.offer.title) {
    cardElement.querySelector('.popup__title').textContent = similarCard.offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }
  if (similarCard.offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = similarCard.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }
  if (similarCard.offer.price) {
    cardElement.querySelector('.popup__text--price').textContent = `${similarCard.offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }
  if (similarCard.offer.type) {
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
  } else {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }
  if (similarCard.offer.rooms && similarCard.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${similarCard.offer.rooms} комнаты для ${similarCard.offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  if (similarCard.offer.checkin && similarCard.offer.chechout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarCard.offer.checkin}, выезд до ${similarCard.offer.chechout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  if (similarCard.offer.features.length !== 0) {
    const featuresContainer = cardElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    featuresList.forEach((featureListItem) => {
      const isNecessary = similarCard.offer.features.some(
        (offerFeature) => featureListItem.classList.contains(`popup__feature--${offerFeature}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }
  if (similarCard.offer.description) {
    cardElement.querySelector('.popup__description').textContent = similarCard.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }
  if (similarCard.offer.photos.length !== 0) {
    const photoContainer = cardElement.querySelector('.popup__photos');
    similarCard.offer.photos.forEach((offerPhoto) => {
      const photoTemplate = photoContainer.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = `${offerPhoto}`;
      photoContainer.append(photoTemplate);
    });
    photoContainer.querySelector('.popup__photo').remove();
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }
  if (similarCard.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = `${similarCard.author.avatar}`;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  similarCardsFragment.appendChild(cardElement);
});

similarCardsList.appendChild(similarCardsFragment);
