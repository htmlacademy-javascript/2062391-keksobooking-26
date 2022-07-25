import { toActivate } from './form.js';

const map = L.map('map-canvas').on('load', () => {
  toActivate();
}).setView({
  lat: 35.68236,
  lng: 139.75317,
}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const offerPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const creatCustomPopup = (point) => {
  const pointTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const cardElement = pointTemplate.cloneNode(true);
  if (point.offer.title) {
    cardElement.querySelector('.popup__title').textContent = point.offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }
  if (point.offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = point.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }
  if (point.offer.price) {
    cardElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }
  if (point.offer.type) {
    switch (point.offer.type) {
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
  if (point.offer.rooms && point.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  if (point.offer.checkin && point.offer.chechout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.chechout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  if (point.offer.features) {
    const featuresContainer = cardElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    featuresList.forEach((featureListItem) => {
      const isNecessary = point.offer.features.some(
        (offerFeature) => featureListItem.classList.contains(`popup__feature--${offerFeature}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }
  if (point.offer.description) {
    cardElement.querySelector('.popup__description').textContent = point.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }
  if (point.offer.photos) {
    const photoContainer = cardElement.querySelector('.popup__photos');
    point.offer.photos.forEach((offerPhoto) => {
      const photoTemplate = photoContainer.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = `${offerPhoto}`;
      photoContainer.append(photoTemplate);
    });
    photoContainer.querySelector('.popup__photo').remove();
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }
  if (point.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = `${point.author.avatar}`;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  return cardElement;
};

const mainPinMarker = L.marker(
  {
    lat: 35.68236,
    lng: 139.75317,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  document.querySelector('.ad-form').querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offersData) => {
  offersData.forEach((point) => {
    const offerMarker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: offerPinIcon,
      },
    );
    offerMarker
      .addTo(markerGroup)
      .bindPopup(creatCustomPopup(point));
  });
};

export { createMarker };
export { mainPinMarker };
