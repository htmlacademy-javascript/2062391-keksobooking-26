// Функция, возвращающая случайное целое число из переданного диапозона включительно  
// продумать, как будет вести себя функция, если передать число "до" диапозона меньше или равное "от"
let getRandomInteger = function(min, max) {
    if (max <= min) {
      [max, min] = [min, max];  
    };
    let rand = min + Math.floor(Math.random() * (max - min + 1));
    return rand;
  };


// Функция, возвращающая случайно число с плавающей точкой из переданного диапозона включительно
// продумать, как будет вести себя функция, если передать число "до" диапозона меньше или равное "от"

let getRandomFloat = function(min, max, numberOfSigns) {
    if (max <= min) {
      [max, min] = [min, max];  
    };
    let rand = parseFloat(min + (Math.random() * (max - min + 1)).toFixed(numberOfSigns));
    return rand;
  };
  
