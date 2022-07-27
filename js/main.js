import { getOfferData } from './api.js';
import { createMarker } from './map.js';
import { clearForm } from './user-form.js';
import { setUserFormSubmit } from './user-form.js';
import { setFilterChange, debounce } from './util.js';
import './slider.js';
//import {toInActive} from './form.js';

const RERENDER_DELAY = 500;

//toInActive();
getOfferData((offers) => {
  createMarker(offers);
  setFilterChange(debounce(
    () => createMarker(offers),
    RERENDER_DELAY,
  ));
});


setUserFormSubmit(clearForm);
