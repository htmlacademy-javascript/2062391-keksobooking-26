const toInActive = () => {
  const forms = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  forms.classList.add('ad-form--disabled');
  const formsFieldsets = forms.querySelectorAll('fieldset');
  formsFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  mapFilters.classList.add('ad-form--disabled');
  const filters = mapFilters.querySelectorAll('.map__filter');
  filters.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
};

const toActivate = () => {
  const forms = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  forms.classList.remove('ad-form--disabled');
  const formsFieldsets = forms.querySelectorAll('fieldset');
  mapFilters.classList.remove('ad-form--disabled');
  formsFieldsets.forEach((fiedset) => {
    fiedset.removeAttribute('disabled');
  });
  const filters = mapFilters.querySelectorAll('.map__filter');
  filters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
};

export {toInActive};
export {toActivate};
