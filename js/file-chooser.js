'use strict';

(function () {

  var TYPE_FILE = ['gif', 'jpg', 'jpeg', 'png'];
  var fileInput = document.querySelector('#upload-file');
  var previewElement = document.querySelector('.img-upload__preview');
  var previewImage = previewElement.querySelector('img');
  var fileUploadChangeHandler;

  var FileChooser = function (callback) {
    fileUploadChangeHandler = callback;
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (!file) {
        return;
      }
      if (checkFileType(file.name)) {
        readFile(file);
      } else {
        window.utils.showError('Можно загрузить только файлы с расширением: ' + TYPE_FILE.toString());
        clearInput();
      }
    });
  };

  var checkFileType = function (fileName) {
    fileName = fileName.toLowerCase();
    return TYPE_FILE.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var readFile = function (source) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(source);
    clearPreview();
    if (fileUploadChangeHandler && typeof (fileUploadChangeHandler) === 'function') {
      fileUploadChangeHandler();
    }
  };

  var clearPreview = function () {
    previewImage.src = '';
  };

  var clearInput = function () {
    fileInput.value = '';
  };

  FileChooser.prototype.clear = function () {
    clearInput();
    clearPreview();
  };

  window.FileChooser = FileChooser;
})();
