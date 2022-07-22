const priceSliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

priceSliderElement.noUiSlider.on('update', () => {
  document.querySelector('.ad-form').querySelector('#price').value = priceSliderElement.noUiSlider.get();
});

document.querySelector('.ad-form').querySelector('#price').addEventListener('change', () => {
  priceSliderElement.noUiSlider.set(document.querySelector('.ad-form').querySelector('#price').value);
});

document.querySelector('.ad-form').querySelector('#type').addEventListener('change', () => {
  priceSliderElement.noUiSlider.set(document.querySelector('.ad-form').querySelector('#price').value);
});
