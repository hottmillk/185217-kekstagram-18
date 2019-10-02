'use strict';

var createMassiv = function () {
  var PICTURES_QUANTITY = 25;
  var MIN_PICTURE_NUMBER = 1;
	var MAX_PICTURE_NUMBER = 25;
	var MIN_LIKES_QUANTITY = 15;
	var MAX_LIKES_QUANTITY = 200;
	var MIN_COMMENTS_QUANTITY = 1;
  var MAX_COMMENTS_QUANTITY = 2;

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  window.picturesInfo = createRandomPicturesInfo(PICTURES_QUANTITY);

  function createRandomPicturesInfo (picturesQuantity) {
    var picturesInfo = [];
    var picturesNumbersPool = createOrderedIntegerNumbers(MIN_PICTURE_NUMBER, MAX_PICTURE_NUMBER);

		for (var i = 0; i < picturesQuantity; i++) {
			var randomUniquePictureUrl = createPictureUrl(pullRandomUniqueNumber(picturesNumbersPool));
			var randomlikesQuantity =
				window.mathUtils.createRandomIntegerNumber(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY);
			var randomComments = createRandomComments(COMMENTS);
			var randomDescription = getRandomDescription(DESCRIPTIONS);

			var pictureInfo =
				createPictureInfo(randomUniquePictureUrl, randomlikesQuantity, randomComments, randomDescription);
			picturesInfo.push(pictureInfo);
		}

		return picturesInfo;
	}

	function createOrderedIntegerNumbers(minNumber, maxNumber) {
		var result = [];
		for (var i = minNumber; i <= maxNumber; i++) {
			result.push(i);
		}

		return result;
	}

	function createPictureUrl(pictureNumber) {
		return 'photos/' + pictureNumber + '.jpg';
	}

	function pullRandomUniqueNumber(numbersPool) {
		var randomIndex = window.mathUtils.createRandomIntegerNumber(0, numbersPool.length - 1);
		var randomUniqueNumber = numbersPool.splice(randomIndex, 1)[0];
		if (randomUniqueNumber === undefined) {
			console.log('Error! Empty numbers pool');
		}

		return randomUniqueNumber;
	}

	function createRandomComments(comments) {
		var randomComments = [];
		var randomQuantityOfComments =
			window.mathUtils.createRandomIntegerNumber(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);

		for (var i = 0; i < randomQuantityOfComments; i++) {
			var randomComment = comments[window.mathUtils.createRandomIntegerNumber(0, comments.length - 1)];
			randomComments.push(randomComment);
		}

		return randomComments;
	}

	function getRandomDescription(descriptions) {
		var randomDescription = descriptions[window.mathUtils.createRandomIntegerNumber(0, descriptions.length - 1)];

		return randomDescription;
	}

	function createPictureInfo(url, likesQuantity, comments, description) {
		var pictureInfo = {
			url: url,
			likes: likesQuantity,
			comments: comments,
			description: description
		}

		return pictureInfo;
  }

};

