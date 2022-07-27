import { getOfferData } from './api.js';
import { createMarker } from './map.js';
import { clearForm } from './user-form.js';
import { setUserFormSubmit } from './user-form.js';
import { setFilterChange, debounce } from './util.js';
import './slider.js';
import { toInActive, toActivate } from './form.js';
import './avatar.js';

const RERENDER_DELAY = 500;

toInActive();

getOfferData((offers) => {
  createMarker(offers);
  toActivate();
  setFilterChange(debounce(
    () => createMarker(offers),
    RERENDER_DELAY,
  ));
});


setUserFormSubmit(clearForm);
