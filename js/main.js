// Функция, возвращающая случайное целое число из переданного диапозона включительно  
// продумать, как будет вести себя функция, если передать число "до" диапозона меньше или равное "от"
let getRandomInteger = function(min, max) {
  if (min <0 || max <0) {
    return console.log('Числа должны быть положительные.');  
  };
  if (max <= min) {
    [max, min] = [min, max];  
  };
  let rand = min + Math.floor(Math.random() * (max - min + 1));
  return rand;
};


// Функция, возвращающая случайно число с плавающей точкой из переданного диапозона включительно
// продумать, как будет вести себя функция, если передать число "до" диапозона меньше или равное "от"

let getRandomFloat = function(min, max, numberOfSigns) {
  if (min <0 || max <0) {
      return console.log('Числа должны быть положительные.');
  };
  if (max <= min) {
    [max, min] = [min, max];  
  };
  let rand = min + Math.random() * (max-min);
  return ( Math.round(rand*Math.pow(10, numberOfSigns))/ Math.pow(10, numberOfSigns) )  
};


/* Ссылки на источники, которые помогали в создании функций:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://learn.javascript.ru/task/random-int-min-max
https://learn.javascript.ru/task/random-min-max
https://realadmin.ru/coding/rounding-number-js.html
*/