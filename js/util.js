let getRandomInteger = (min, max) => {
    if (min <0 || max <0) {
        throw new Error('Числа должны быть положительные.');  
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

  export {getRandomInteger};
  export {getRandomFloat};
  