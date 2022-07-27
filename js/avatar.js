const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoFileChooser = document.querySelector('.ad-form__upload input[type=file');
const photoPreview = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoFileChooser.addEventListener('change', () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    photoPreview.innerHTML = '';
    const newImg = document.createElement('img');
    newImg.classList.add('user_offer_photo');
    newImg.width = '70';
    newImg.height= '70';
    photoPreview.appendChild(newImg);
    photoPreview.querySelector('.user_offer_photo').src = URL.createObjectURL(file);
  }
});
