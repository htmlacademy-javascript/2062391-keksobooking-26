const TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const SIMILAR_AD_COUNT = 10;

let getRandomInteger = (min, max) => {
    if (min <0 || max <0) {
      return console.log('Числа должны быть положительные.');  
    };
    if (max <= min) {
      [max, min] = [min, max];  
    };
    let rand = min + Math.floor(Math.random() * (max - min + 1));
    return rand;
  };
  let getRandomFloat = (min, max, numberOfSigns) => {
    if (min <0 || max <0) {
      return console.log('Числа должны быть положительные.');
    };
    if (max <= min) {
      [max, min] = [min, max];  
    };
    let rand = min + Math.random() * (max-min);
    return ( Math.round(rand*Math.pow(10, numberOfSigns))/ Math.pow(10, numberOfSigns) )  
  };

const creatAd = () => {
    return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
    };
};

const getAuthor = () => {
    return {
    avatar: `img/avatars/user${getRandomInteger(0, 10)}.png`,
    };
};
const getOffer = () => {
    return {
    title: 'Взгляни-ка!',
    address: 'location.lat, location.lng',
    price: getRandomInteger(0,),
    type: TYPE_OF_HOUSING[getRandomInteger(0, TYPE_OF_HOUSING.length-1)],
    rooms: getRandomInteger(0,),
    guests: getRandomInteger(0,),
    checkin: CHECKIN[getRandomInteger(0, CHECKIN.length-1)],
    chechout: CHECKOUT[getRandomInteger(0, CHECKOUT.length-1)],
    features: FEATURES.slice(getRandomInteger(getRandomInteger(0, FEATURES.length-1), getRandomInteger(0, FEATURES.length-1))),
    description: 'Чисто, красиво, душевно',
    photos: PHOTOS.slice(getRandomInteger(getRandomInteger(0, PHOTOS.length-1), getRandomInteger(0, PHOTOS.length-1))),
    };
};
const getLocation = () => {
    return {
    lat: getRandomFloat(35.65000, 35.7000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
    };
};

const similarAd = Array.from({length: SIMILAR_AD_COUNT}, creatAd);