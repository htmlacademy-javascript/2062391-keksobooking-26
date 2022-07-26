const getOfferData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offersData) => {
      onSuccess(offersData);
    });
};

const sendUserOfferData = (onSuccess, onFail, body) => {
  fetch (
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail('Что-то пошло не так :( Попробуйте еще раз ..');
      }
    })
    .catch(() => {
      onFail('Что-то пошло не так :( Попробуйте еще раз ..');
    });
};

export {getOfferData, sendUserOfferData};
