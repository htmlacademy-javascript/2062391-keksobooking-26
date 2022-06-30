import {getRandomInteger} from "./util.js";
import {getRandomFloat} from "./util.js";

const TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const SIMILAR_AD_COUNT = 10;

const getAuthor = () => {
    const resultNum = getRandomInteger(1, SIMILAR_AD_COUNT);
    if (resultNum < SIMILAR_AD_COUNT) {
        return {
            avatar: `img/avatars/user0${resultNum}.png`
        };
    }
    return {
    avatar: `img/avatars/user${resultNum}.png`,
    };
};
const getLocation = () => {
    return {
    lat: getRandomFloat(35.65000, 35.7000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
    };
};
const getOffer = () => {
    return {
    title: 'Взгляни-ка!',
    address: `${getRandomFloat(35.65000, 35.7000, 5)}, ${getRandomFloat(139.70000, 139.80000, 5)}`,
    price: getRandomInteger(0, 100000),
    type: TYPE_OF_HOUSING[getRandomInteger(0, TYPE_OF_HOUSING.length-1)],
    rooms: getRandomInteger(1, 10),
    guests: getRandomInteger(0, 12),
    checkin: CHECK_IN_OUT[getRandomInteger(0, CHECK_IN_OUT.length-1)],
    chechout: CHECK_IN_OUT[getRandomInteger(0, CHECK_IN_OUT.length-1)],
    features: FEATURES.slice(getRandomInteger(getRandomInteger(0, FEATURES.length-1), getRandomInteger(0, FEATURES.length-1))),
    description: 'Чисто, красиво, душевно',
    photos: PHOTOS.slice(getRandomInteger(getRandomInteger(0, PHOTOS.length-1), getRandomInteger(0, PHOTOS.length-1))),
    };
};
const creatAd = () => {
    return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
    };
};

const greatAd =  () => Array.from({length: SIMILAR_AD_COUNT}, creatAd);

export {greatAd};
