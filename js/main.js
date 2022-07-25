import { getOfferData } from './api.js';
import { createMarker } from './map.js';
import { clearForm } from './user-form.js';
import { setUserFormSubmit } from './user-form.js';
import './slider.js';
//import {toInActive} from './form.js';

//toInActive();
getOfferData(createMarker);

setUserFormSubmit(clearForm);
