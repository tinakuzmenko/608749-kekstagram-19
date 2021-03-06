'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imageEditor = window.util.imageEditor;
  var imageUploadPreview = window.util.imageUploadPreview;
  var closeImageEditor = window.uploadForm.close;
  var showErrorMessage = window.error.showMessage;

  var uploadInput = document.querySelector('.img-upload__input');
  var effectsPreview = imageEditor.querySelectorAll('.effects__preview');

  var uploadInputChangeHandler = function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (!matches) {
      closeImageEditor();
      showErrorMessage('Недопустимый формат. Фотография должна быть в формате gif, jpg, jpeg или png!', 'Загрузить другую фотографию');
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      imageUploadPreview.src = reader.result;

      effectsPreview.forEach(function (preview) {
        preview.style = 'background-image: url("' + reader.result + '")';
      });
    });

    reader.readAsDataURL(file);
  };

  uploadInput.addEventListener('change', uploadInputChangeHandler);
})();
