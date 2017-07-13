// (function() {
//   'use strict';

//   setTimeout(function() {
//     document.querySelector('.greating_picture').classList.add('m--show');
//   }, 1000);
// })();

//Preloader
let percentsTotal = 0;
const preloader = $('.preloader');
//Перебираем все элементы на странице, чтобы собрать пути до картинок(img или bg)
const imgPaths = $('*').map((ndx, elem) => {
	//Проверим, является ли элемен img, если true - сохраняем в переменную,
	//если false - не сохраняем
	const isImg = $(elem).is('img');
	//Переменная содержит bg элемента (путь до картинки)
	const background = $(elem).css('background-image');
	//В переменную сохраняем пути до img
	let path = '';

	if (isImg) {
		path = $(elem).attr('src');
	}

	if (background != 'none') {
		path = background.replace('url("', '').replace('")', '');
	}

	if (path) return path;//Если path не пустой, то ф-ция возвращает его
});

//Метод для подсчета процентов
//total - сколько нужно загрузить, current - сколько уже загружено
const setPercents = (total, current) => {
	const percents = Math.ceil(current / total * 100);

	$('.preloader__percents').text(`${percents}%`);

	//Проверка, если все картинки загружены, прелоадер убираем
	//fadeOut() - изменяет блоку opacity до 0 и затем добавляет display:none;
	if (percents >= 100) preloader.fadeOut();
};

//Подгружаем картинки
const loadImages = (images) => {
	//Если картинки не загружены(длина массива равна 0), то ф-ция не выполнится
	if (!images.length) return;

	//Переберем картинки
	images.forEach((img, i, images) => {
		//Создаем картинку
		const fakeImg = $('<img>', {
			'attr' : {
				'src' : img
			}
		});

		//Проверяем, загрузилась картинка или нет
		fakeImg.on('load error', () => {
			//Если картинка загрузилась, то увеличиваем проценты на 1
			percentsTotal++;
			//В ф-цию, которая считает проценты,
			//передаем сколько всего нужно загрузить(images.length),
			//и сколько уже загружено (percentsTotal)
			setPercents(images.length, percentsTotal);
		});
	});
};

//Преобразуем imgPaths в массив
const imgs = imgPaths.toArray();

$(document).ready(() => {
	loadImages(imgs);
});

//console.log(imgPaths);





//Flip
function flip() {
    $('.flip__id').toggleClass('flipped');
    //Скрыть кнопку Авторизации
    if ($('.welcome__content').hasClass('flipped')) {
    	$('.welcome__auth-btn').css('display', 'none');
    }else {
    	$('.welcome__auth-btn').css('display', 'block');
    };
};

//Parallax
var parallax = (function () {
	var bg = document.querySelector('.hero__bg');
	var sectionTitle = document.querySelector('.section-title__pic');
	var user = document.querySelector('.user__block');

	return {
		move: function (block, windowScroll, strafeAmount) {
			//Рассчитаем сдвиг в процентах
			var strafe = windowScroll / -strafeAmount + '%';
			//переменная для стиля, который будем изменять
			var transformString = 'translate3d(0, ' + strafe + ', 0)';
			//Задаем переменную, куда будем передавать стиль для блока, который будем изменять
			var newStyle = block.style;

			newStyle.transform = transformString;
			newStyle.webkitTransform = transformString;
		},

		init: function (wScroll) {
			this.move(bg, wScroll, 45);
			this.move(sectionTitle, wScroll, 20);
			this.move(user, wScroll, 3);
		}
	}
}());

window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
};

//Blur
var blur = (function () {
	var wrapper = document.querySelector('.reviews__form');
	var form = document.querySelector('.reviews__form-blur');
	var reviewsBg = document.querySelector('.reviews__bg');

	return {
		set: function () {
			var imgWidth = reviewsBg.offsetWidth;
			var imgHeight = reviewsBg.offsetHeight;
			var posLeft = -wrapper.offsetLeft;
			var posTop = -wrapper.offsetTop;
			blurCSS = form.style;

			//blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
			blurCSS.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
			blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';

		}
	}
}());

if (document.querySelector('.reviews__bg')) {
	blur.set();

	window.onresize = function () {
	blur.set();
	};
};


// window.onscroll = function () {
// 	var wScroll = window.pageYOffset;

// 	parallax.init(wScroll);
// };

// window.onresize = function () {
// 	blur.set();
// };
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIChmdW5jdGlvbigpIHtcclxuLy8gICAndXNlIHN0cmljdCc7XHJcblxyXG4vLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlYXRpbmdfcGljdHVyZScpLmNsYXNzTGlzdC5hZGQoJ20tLXNob3cnKTtcclxuLy8gICB9LCAxMDAwKTtcclxuLy8gfSkoKTtcclxuXHJcbi8vUHJlbG9hZGVyXHJcbmxldCBwZXJjZW50c1RvdGFsID0gMDtcclxuY29uc3QgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xyXG4vL9Cf0LXRgNC10LHQuNGA0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLINC90LAg0YHRgtGA0LDQvdC40YbQtSwg0YfRgtC+0LHRiyDRgdC+0LHRgNCw0YLRjCDQv9GD0YLQuCDQtNC+INC60LDRgNGC0LjQvdC+0LooaW1nINC40LvQuCBiZylcclxuY29uc3QgaW1nUGF0aHMgPSAkKCcqJykubWFwKChuZHgsIGVsZW0pID0+IHtcclxuXHQvL9Cf0YDQvtCy0LXRgNC40LwsINGP0LLQu9GP0LXRgtGB0Y8g0LvQuCDRjdC70LXQvNC10L0gaW1nLCDQtdGB0LvQuCB0cnVlIC0g0YHQvtGF0YDQsNC90Y/QtdC8INCyINC/0LXRgNC10LzQtdC90L3Rg9GOLFxyXG5cdC8v0LXRgdC70LggZmFsc2UgLSDQvdC1INGB0L7RhdGA0LDQvdGP0LXQvFxyXG5cdGNvbnN0IGlzSW1nID0gJChlbGVtKS5pcygnaW1nJyk7XHJcblx0Ly/Qn9C10YDQtdC80LXQvdC90LDRjyDRgdC+0LTQtdGA0LbQuNGCIGJnINGN0LvQtdC80LXQvdGC0LAgKNC/0YPRgtGMINC00L4g0LrQsNGA0YLQuNC90LrQuClcclxuXHRjb25zdCBiYWNrZ3JvdW5kID0gJChlbGVtKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuXHQvL9CSINC/0LXRgNC10LzQtdC90L3Rg9GOINGB0L7RhdGA0LDQvdGP0LXQvCDQv9GD0YLQuCDQtNC+IGltZ1xyXG5cdGxldCBwYXRoID0gJyc7XHJcblxyXG5cdGlmIChpc0ltZykge1xyXG5cdFx0cGF0aCA9ICQoZWxlbSkuYXR0cignc3JjJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuXHRcdHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcblx0fVxyXG5cclxuXHRpZiAocGF0aCkgcmV0dXJuIHBhdGg7Ly/QldGB0LvQuCBwYXRoINC90LUg0L/Rg9GB0YLQvtC5LCDRgtC+INGELdGG0LjRjyDQstC+0LfQstGA0LDRidCw0LXRgiDQtdCz0L5cclxufSk7XHJcblxyXG4vL9Cc0LXRgtC+0LQg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0L/RgNC+0YbQtdC90YLQvtCyXHJcbi8vdG90YWwgLSDRgdC60L7Qu9GM0LrQviDQvdGD0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCwgY3VycmVudCAtINGB0LrQvtC70YzQutC+INGD0LbQtSDQt9Cw0LPRgNGD0LbQtdC90L5cclxuY29uc3Qgc2V0UGVyY2VudHMgPSAodG90YWwsIGN1cnJlbnQpID0+IHtcclxuXHRjb25zdCBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuXHQkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQoYCR7cGVyY2VudHN9JWApO1xyXG5cclxuXHQvL9Cf0YDQvtCy0LXRgNC60LAsINC10YHQu9C4INCy0YHQtSDQutCw0YDRgtC40L3QutC4INC30LDQs9GA0YPQttC10L3Riywg0L/RgNC10LvQvtCw0LTQtdGAINGD0LHQuNGA0LDQtdC8XHJcblx0Ly9mYWRlT3V0KCkgLSDQuNC30LzQtdC90Y/QtdGCINCx0LvQvtC60YMgb3BhY2l0eSDQtNC+IDAg0Lgg0LfQsNGC0LXQvCDQtNC+0LHQsNCy0LvRj9C10YIgZGlzcGxheTpub25lO1xyXG5cdGlmIChwZXJjZW50cyA+PSAxMDApIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbn07XHJcblxyXG4vL9Cf0L7QtNCz0YDRg9C20LDQtdC8INC60LDRgNGC0LjQvdC60LhcclxuY29uc3QgbG9hZEltYWdlcyA9IChpbWFnZXMpID0+IHtcclxuXHQvL9CV0YHQu9C4INC60LDRgNGC0LjQvdC60Lgg0L3QtSDQt9Cw0LPRgNGD0LbQtdC90Yso0LTQu9C40L3QsCDQvNCw0YHRgdC40LLQsCDRgNCw0LLQvdCwIDApLCDRgtC+INGELdGG0LjRjyDQvdC1INCy0YvQv9C+0LvQvdC40YLRgdGPXHJcblx0aWYgKCFpbWFnZXMubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdC8v0J/QtdGA0LXQsdC10YDQtdC8INC60LDRgNGC0LjQvdC60LhcclxuXHRpbWFnZXMuZm9yRWFjaCgoaW1nLCBpLCBpbWFnZXMpID0+IHtcclxuXHRcdC8v0KHQvtC30LTQsNC10Lwg0LrQsNGA0YLQuNC90LrRg1xyXG5cdFx0Y29uc3QgZmFrZUltZyA9ICQoJzxpbWc+Jywge1xyXG5cdFx0XHQnYXR0cicgOiB7XHJcblx0XHRcdFx0J3NyYycgOiBpbWdcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly/Qn9GA0L7QstC10YDRj9C10LwsINC30LDQs9GA0YPQt9C40LvQsNGB0Ywg0LrQsNGA0YLQuNC90LrQsCDQuNC70Lgg0L3QtdGCXHJcblx0XHRmYWtlSW1nLm9uKCdsb2FkIGVycm9yJywgKCkgPT4ge1xyXG5cdFx0XHQvL9CV0YHQu9C4INC60LDRgNGC0LjQvdC60LAg0LfQsNCz0YDRg9C30LjQu9Cw0YHRjCwg0YLQviDRg9Cy0LXQu9C40YfQuNCy0LDQtdC8INC/0YDQvtGG0LXQvdGC0Ysg0L3QsCAxXHJcblx0XHRcdHBlcmNlbnRzVG90YWwrKztcclxuXHRcdFx0Ly/QkiDRhC3RhtC40Y4sINC60L7RgtC+0YDQsNGPINGB0YfQuNGC0LDQtdGCINC/0YDQvtGG0LXQvdGC0YssXHJcblx0XHRcdC8v0L/QtdGA0LXQtNCw0LXQvCDRgdC60L7Qu9GM0LrQviDQstGB0LXQs9C+INC90YPQttC90L4g0LfQsNCz0YDRg9C30LjRgtGMKGltYWdlcy5sZW5ndGgpLFxyXG5cdFx0XHQvL9C4INGB0LrQvtC70YzQutC+INGD0LbQtSDQt9Cw0LPRgNGD0LbQtdC90L4gKHBlcmNlbnRzVG90YWwpXHJcblx0XHRcdHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vL9Cf0YDQtdC+0LHRgNCw0LfRg9C10LwgaW1nUGF0aHMg0LIg0LzQsNGB0YHQuNCyXHJcbmNvbnN0IGltZ3MgPSBpbWdQYXRocy50b0FycmF5KCk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcblx0bG9hZEltYWdlcyhpbWdzKTtcclxufSk7XHJcblxyXG4vL2NvbnNvbGUubG9nKGltZ1BhdGhzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vL0ZsaXBcclxuZnVuY3Rpb24gZmxpcCgpIHtcclxuICAgICQoJy5mbGlwX19pZCcpLnRvZ2dsZUNsYXNzKCdmbGlwcGVkJyk7XHJcbiAgICAvL9Ch0LrRgNGL0YLRjCDQutC90L7Qv9C60YMg0JDQstGC0L7RgNC40LfQsNGG0LjQuFxyXG4gICAgaWYgKCQoJy53ZWxjb21lX19jb250ZW50JykuaGFzQ2xhc3MoJ2ZsaXBwZWQnKSkge1xyXG4gICAgXHQkKCcud2VsY29tZV9fYXV0aC1idG4nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgXHQkKCcud2VsY29tZV9fYXV0aC1idG4nKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIH07XHJcbn07XHJcblxyXG4vL1BhcmFsbGF4XHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7XHJcblx0dmFyIHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXRpdGxlX19waWMnKTtcclxuXHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19ibG9jaycpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHQvL9Cg0LDRgdGB0YfQuNGC0LDQtdC8INGB0LTQstC40LMg0LIg0L/RgNC+0YbQtdC90YLQsNGFXHJcblx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHQvL9C/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRgdGC0LjQu9GPLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cdFx0XHQvL9CX0LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiwg0LrRg9C00LAg0LHRg9C00LXQvCDQv9C10YDQtdC00LDQstCw0YLRjCDRgdGC0LjQu9GMINC00LvRjyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIG5ld1N0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG5cdFx0XHRuZXdTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdG5ld1N0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0dGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdHRoaXMubW92ZShzZWN0aW9uVGl0bGUsIHdTY3JvbGwsIDIwKTtcclxuXHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG5cdFx0fVxyXG5cdH1cclxufSgpKTtcclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxufTtcclxuXHJcbi8vQmx1clxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fZm9ybScpO1xyXG5cdHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm0tYmx1cicpO1xyXG5cdHZhciByZXZpZXdzQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fYmcnKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHNldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgaW1nV2lkdGggPSByZXZpZXdzQmcub2Zmc2V0V2lkdGg7XHJcblx0XHRcdHZhciBpbWdIZWlnaHQgPSByZXZpZXdzQmcub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR2YXIgcG9zTGVmdCA9IC13cmFwcGVyLm9mZnNldExlZnQ7XHJcblx0XHRcdHZhciBwb3NUb3AgPSAtd3JhcHBlci5vZmZzZXRUb3A7XHJcblx0XHRcdGJsdXJDU1MgPSBmb3JtLnN0eWxlO1xyXG5cclxuXHRcdFx0Ly9ibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG5cdFx0XHRibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0Ymx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufSgpKTtcclxuXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fYmcnKSkge1xyXG5cdGJsdXIuc2V0KCk7XHJcblxyXG5cdHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRibHVyLnNldCgpO1xyXG5cdH07XHJcbn07XHJcblxyXG5cclxuLy8gd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4vLyBcdHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuLy8gXHRwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4vLyB9O1xyXG5cclxuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4vLyBcdGJsdXIuc2V0KCk7XHJcbi8vIH07Il19
