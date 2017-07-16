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


//Flip
function flip() {
    $('.flip__id').toggleClass('flipped');
    //Скрыть кнопку Авторизации
    if ($('.welcome__content').hasClass('flipped')) {
    	$('.welcome__authorization-button').css('display', 'none');
    }else {
    	$('.welcome__authorization-button').css('display', 'block');
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

//Slider
//Для того, чтобы управлять временем анимации
const duration = 500;
//Счетчик
let imageCounter = 1;
//Переменная, чтобы не сбоила анимация при частых нажатиях кнопки "листать"
let inProgress = false;

let addActiveToDesc = $(document).ready(() => {
	$('.works__desc').first().addClass('active');
});
//Функция, которая двигает слайды
//container - определяет левый или правый элемент слайдера
//direction - направление прокрутки слайдов
const moveSlides = (container, direction) => {
	//переменная содержит все слайды
	let items = $(container).find('.slider__item');
	
	let activeItem = items.filter('.active');

	let activeItemIndex = activeItem.index();

	let counter = activeItemIndex + 1;

	let images = $('.works__display-examples').find('.works__display-example-pic');

	let activeImage = images.filter('.active');

	let descriptions = $('.works__description').find('.works__desc');
	
	let activeDesc = descriptions.filter('.active');
	// let imagesPath = [];
	// images.each(function(i, image){imagesPath.push($(image).attr('src'))});

	//Переменная управляет направлением прокрутки
	let strafeTopPercents = direction === 'down' ? 100 : -100;

	//Обнуляем counter
	if (counter >= items.length) {
		counter = 0;
	};

	if (imageCounter >= images.length) {
		imageCounter = 0;
	};

	//Слайдер, к которому необходимо пролистать
	const reqItem = items.eq(counter);

	//Картинка-пример, к которой надо пролистать
	const reqImage = images.eq(imageCounter);

	//Описание, к которому надо пролистать
	const reqDesc = descriptions.eq(imageCounter);

	//Листаем слайдер:
	//текущий уходит вниз,
	//следующий за ним опускается на его место, ему добавляется класс active
	//который ушел вниз, переходит наверх, класс active удаляем
	activeItem.animate({
		'top' : `${strafeTopPercents}%`
	}, duration);

	reqItem.animate({
		'top' : '0'
	}, duration, function() {
		activeItem.removeClass('active')
			.css('top', `${-strafeTopPercents}%`);
		$(this).addClass('active');
		
		inProgress = false;
	});

	//Листаем картинки-примеры
	activeImage.removeClass('active');
	reqImage.addClass('active');

	//Листаем описание
	activeDesc.removeClass('active');
	reqDesc.addClass('active');

};

$('.slider__control').on('click', function(e) {
	e.preventDefault(); 

	if (inProgress) return;
	inProgress = true;

	moveSlides('.slider__first', 'down');
	moveSlides('.slider__opposite', 'up');
	imageCounter++;
});


//Sidebar

//Фиксируем сайдбар и зеленую кнопку
$(function() {
	$(window).scroll(function() {
		var sectionHeight = $('.hero').outerHeight();
		var sectionWidth = $('.blog').outerWidth();
		var sidebarWidth = $('.blog__sidebar').outerWidth();
		let deltaY = $(window).scrollTop();//Сколько проскроллили от верха окна браузера
		
		if (deltaY >= sectionHeight && sectionWidth > 768) {
			$('.blog__nav').css({
				'position': 'fixed',
				'max-width': sidebarWidth + 'px',
				'top': '60px'
			});
		} else {
			$('.blog__nav').css({
				'position': 'relative',
				'top': '0'
			});
		}

		if (deltaY >= sectionHeight && sectionWidth <= 768) {
		 $('.green-folder').css('display', 'block');
		}

	});
});

//навигация по статьям в блоге
$('.blog__nav').find('.blog__nav-link').on('click', function(e) {
	e.preventDefault();

	var $this = $(this);
	var article = $this.closest('.blog').find('.blog__article').filter($this.attr('href'));

		// var docBody = $(document.body);
		// docBody.animate({
		// 	scrollTop: article.offset().top
		// });
		
})

$(window).scroll(function() {

		var $this = $(this);
		var articles = [];

		$('.blog__articles').find('.blog__article').each(function() {
			articles.push($(this));
		});

		for(var i = 0; i < articles.length; i++) {
			if(($this.scrollTop() >= articles[i].offset().top)) {
				articles[i].closest('.blog').find('.blog__nav-item').filter('.active').removeClass('active');
				articles[i].closest('.blog').find('.blog__nav-link[href="#' + articles[i].attr('id') + '"]').closest('.blog__nav-item').addClass('active');
			}
		}
		if($(document.body).find('.blog__article-header').length) {
			if(document.body.scrollHeight === document.body.scrollTop + document.body.offsetHeight) {
				articles[articles.length - 1].closest('.blog').find('.blog__nav-item').filter('.active').removeClass('active');
				articles[articles.length - 1].closest('.blog').find('.blog__nav-link[href="#' + articles[articles.length - 1].attr('id') + '"]').closest('.blog__nav-item').addClass('active');
			}
		}
})

//Открывающееся меню в блоге при нажатии на зеленую папку
$('.green-folder__link').on('click', function(e){
	e.preventDefault();

	var $this = $(this),
		folder= $this.parent(),
		sidebar = folder.siblings('.blog').find('.blog__sidebar');
	let sidebarWidth = sidebar.outerWidth();
	
	if(sidebar.css('left') === '-280px') {
			folder.animate({
				'margin-left': '280px'
			})
			sidebar.animate({
				'left': '0'
			});
		}
		else {
			folder.animate({
				'margin-left': '0'
			})
			sidebar.animate({
				'left': '-280px'
			}, function () {
				$(this).removeAttr('style')
			});
		}
})



//Burger-menu
$('.burger-menu__close').on('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		$this.toggleClass('burger-menu__close_change');
		
		if($this.next().hasClass('hidden')) {
			$this.next().removeClass('hidden');
			$this.next().find('.burger-menu__open-left').stop().animate({
				'right': '50%'
			}, 500);
			$this.next().find('.burger-menu__open-right').stop().animate({
				'left': '50%'
			}, 500, function() {
				$(this).siblings('.burger-menu__open-text').stop().animate({
					'opacity': '1'
				}, 200)
			});
		} else {
			$this.next().find('.burger-menu__open-text').stop().animate({
				'opacity': '0'
			}, 200, function() {
				$(this).siblings('.burger-menu__open-left').stop().animate({
					'right': '100%'
				}, 500);
				$(this).siblings('.burger-menu__open-right').stop().animate({
					'left': '100%'
				}, 500, function() {
					$this.next().addClass('hidden');
				});
			})
		}
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKCkge1xyXG4vLyAgICd1c2Ugc3RyaWN0JztcclxuXHJcbi8vICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVhdGluZ19waWN0dXJlJykuY2xhc3NMaXN0LmFkZCgnbS0tc2hvdycpO1xyXG4vLyAgIH0sIDEwMDApO1xyXG4vLyB9KSgpO1xyXG5cclxuLy9QcmVsb2FkZXJcclxubGV0IHBlcmNlbnRzVG90YWwgPSAwO1xyXG5jb25zdCBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcbi8v0J/QtdGA0LXQsdC40YDQsNC10Lwg0LLRgdC1INGN0LvQtdC80LXQvdGC0Ysg0L3QsCDRgdGC0YDQsNC90LjRhtC1LCDRh9GC0L7QsdGLINGB0L7QsdGA0LDRgtGMINC/0YPRgtC4INC00L4g0LrQsNGA0YLQuNC90L7QuihpbWcg0LjQu9C4IGJnKVxyXG5jb25zdCBpbWdQYXRocyA9ICQoJyonKS5tYXAoKG5keCwgZWxlbSkgPT4ge1xyXG5cdC8v0J/RgNC+0LLQtdGA0LjQvCwg0Y/QstC70Y/QtdGC0YHRjyDQu9C4INGN0LvQtdC80LXQvSBpbWcsINC10YHQu9C4IHRydWUgLSDRgdC+0YXRgNCw0L3Rj9C10Lwg0LIg0L/QtdGA0LXQvNC10L3QvdGD0Y4sXHJcblx0Ly/QtdGB0LvQuCBmYWxzZSAtINC90LUg0YHQvtGF0YDQsNC90Y/QtdC8XHJcblx0Y29uc3QgaXNJbWcgPSAkKGVsZW0pLmlzKCdpbWcnKTtcclxuXHQvL9Cf0LXRgNC10LzQtdC90L3QsNGPINGB0L7QtNC10YDQttC40YIgYmcg0Y3Qu9C10LzQtdC90YLQsCAo0L/Rg9GC0Ywg0LTQviDQutCw0YDRgtC40L3QutC4KVxyXG5cdGNvbnN0IGJhY2tncm91bmQgPSAkKGVsZW0pLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG5cdC8v0JIg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0YHQvtGF0YDQsNC90Y/QtdC8INC/0YPRgtC4INC00L4gaW1nXHJcblx0bGV0IHBhdGggPSAnJztcclxuXHJcblx0aWYgKGlzSW1nKSB7XHJcblx0XHRwYXRoID0gJChlbGVtKS5hdHRyKCdzcmMnKTtcclxuXHR9XHJcblxyXG5cdGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG5cdFx0cGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuXHR9XHJcblxyXG5cdGlmIChwYXRoKSByZXR1cm4gcGF0aDsvL9CV0YHQu9C4IHBhdGgg0L3QtSDQv9GD0YHRgtC+0LksINGC0L4g0YQt0YbQuNGPINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC10LPQvlxyXG59KTtcclxuXHJcbi8v0JzQtdGC0L7QtCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDQv9GA0L7RhtC10L3RgtC+0LJcclxuLy90b3RhbCAtINGB0LrQvtC70YzQutC+INC90YPQttC90L4g0LfQsNCz0YDRg9C30LjRgtGMLCBjdXJyZW50IC0g0YHQutC+0LvRjNC60L4g0YPQttC1INC30LDQs9GA0YPQttC10L3QvlxyXG5jb25zdCBzZXRQZXJjZW50cyA9ICh0b3RhbCwgY3VycmVudCkgPT4ge1xyXG5cdGNvbnN0IHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG5cdCQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChgJHtwZXJjZW50c30lYCk7XHJcblxyXG5cdC8v0J/RgNC+0LLQtdGA0LrQsCwg0LXRgdC70Lgg0LLRgdC1INC60LDRgNGC0LjQvdC60Lgg0LfQsNCz0YDRg9C20LXQvdGLLCDQv9GA0LXQu9C+0LDQtNC10YAg0YPQsdC40YDQsNC10LxcclxuXHQvL2ZhZGVPdXQoKSAtINC40LfQvNC10L3Rj9C10YIg0LHQu9C+0LrRgyBvcGFjaXR5INC00L4gMCDQuCDQt9Cw0YLQtdC8INC00L7QsdCw0LLQu9GP0LXRgiBkaXNwbGF5Om5vbmU7XHJcblx0aWYgKHBlcmNlbnRzID49IDEwMCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxufTtcclxuXHJcbi8v0J/QvtC00LPRgNGD0LbQsNC10Lwg0LrQsNGA0YLQuNC90LrQuFxyXG5jb25zdCBsb2FkSW1hZ2VzID0gKGltYWdlcykgPT4ge1xyXG5cdC8v0JXRgdC70Lgg0LrQsNGA0YLQuNC90LrQuCDQvdC1INC30LDQs9GA0YPQttC10L3RiyjQtNC70LjQvdCwINC80LDRgdGB0LjQstCwINGA0LDQstC90LAgMCksINGC0L4g0YQt0YbQuNGPINC90LUg0LLRi9C/0L7Qu9C90LjRgtGB0Y9cclxuXHRpZiAoIWltYWdlcy5sZW5ndGgpIHJldHVybjtcclxuXHJcblx0Ly/Qn9C10YDQtdCx0LXRgNC10Lwg0LrQsNGA0YLQuNC90LrQuFxyXG5cdGltYWdlcy5mb3JFYWNoKChpbWcsIGksIGltYWdlcykgPT4ge1xyXG5cdFx0Ly/QodC+0LfQtNCw0LXQvCDQutCw0YDRgtC40L3QutGDXHJcblx0XHRjb25zdCBmYWtlSW1nID0gJCgnPGltZz4nLCB7XHJcblx0XHRcdCdhdHRyJyA6IHtcclxuXHRcdFx0XHQnc3JjJyA6IGltZ1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL9Cf0YDQvtCy0LXRgNGP0LXQvCwg0LfQsNCz0YDRg9C30LjQu9Cw0YHRjCDQutCw0YDRgtC40L3QutCwINC40LvQuCDQvdC10YJcclxuXHRcdGZha2VJbWcub24oJ2xvYWQgZXJyb3InLCAoKSA9PiB7XHJcblx0XHRcdC8v0JXRgdC70Lgg0LrQsNGA0YLQuNC90LrQsCDQt9Cw0LPRgNGD0LfQuNC70LDRgdGMLCDRgtC+INGD0LLQtdC70LjRh9C40LLQsNC10Lwg0L/RgNC+0YbQtdC90YLRiyDQvdCwIDFcclxuXHRcdFx0cGVyY2VudHNUb3RhbCsrO1xyXG5cdFx0XHQvL9CSINGELdGG0LjRjiwg0LrQvtGC0L7RgNCw0Y8g0YHRh9C40YLQsNC10YIg0L/RgNC+0YbQtdC90YLRiyxcclxuXHRcdFx0Ly/Qv9C10YDQtdC00LDQtdC8INGB0LrQvtC70YzQutC+INCy0YHQtdCz0L4g0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LfQuNGC0YwoaW1hZ2VzLmxlbmd0aCksXHJcblx0XHRcdC8v0Lgg0YHQutC+0LvRjNC60L4g0YPQttC1INC30LDQs9GA0YPQttC10L3QviAocGVyY2VudHNUb3RhbClcclxuXHRcdFx0c2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8v0J/RgNC10L7QsdGA0LDQt9GD0LXQvCBpbWdQYXRocyDQsiDQvNCw0YHRgdC40LJcclxuY29uc3QgaW1ncyA9IGltZ1BhdGhzLnRvQXJyYXkoKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuXHRsb2FkSW1hZ2VzKGltZ3MpO1xyXG59KTtcclxuXHJcblxyXG4vL0ZsaXBcclxuZnVuY3Rpb24gZmxpcCgpIHtcclxuICAgICQoJy5mbGlwX19pZCcpLnRvZ2dsZUNsYXNzKCdmbGlwcGVkJyk7XHJcbiAgICAvL9Ch0LrRgNGL0YLRjCDQutC90L7Qv9C60YMg0JDQstGC0L7RgNC40LfQsNGG0LjQuFxyXG4gICAgaWYgKCQoJy53ZWxjb21lX19jb250ZW50JykuaGFzQ2xhc3MoJ2ZsaXBwZWQnKSkge1xyXG4gICAgXHQkKCcud2VsY29tZV9fYXV0aG9yaXphdGlvbi1idXR0b24nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgXHQkKCcud2VsY29tZV9fYXV0aG9yaXphdGlvbi1idXR0b24nKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIH07XHJcbn07XHJcblxyXG4vL1BhcmFsbGF4XHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7XHJcblx0dmFyIHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXRpdGxlX19waWMnKTtcclxuXHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19ibG9jaycpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHQvL9Cg0LDRgdGB0YfQuNGC0LDQtdC8INGB0LTQstC40LMg0LIg0L/RgNC+0YbQtdC90YLQsNGFXHJcblx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHQvL9C/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRgdGC0LjQu9GPLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cdFx0XHQvL9CX0LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiwg0LrRg9C00LAg0LHRg9C00LXQvCDQv9C10YDQtdC00LDQstCw0YLRjCDRgdGC0LjQu9GMINC00LvRjyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIG5ld1N0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG5cdFx0XHRuZXdTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdG5ld1N0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0dGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdHRoaXMubW92ZShzZWN0aW9uVGl0bGUsIHdTY3JvbGwsIDIwKTtcclxuXHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG5cdFx0fVxyXG5cdH1cclxufSgpKTtcclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxufTtcclxuXHJcbi8vQmx1clxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fZm9ybScpO1xyXG5cdHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm0tYmx1cicpO1xyXG5cdHZhciByZXZpZXdzQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fYmcnKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHNldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgaW1nV2lkdGggPSByZXZpZXdzQmcub2Zmc2V0V2lkdGg7XHJcblx0XHRcdHZhciBpbWdIZWlnaHQgPSByZXZpZXdzQmcub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR2YXIgcG9zTGVmdCA9IC13cmFwcGVyLm9mZnNldExlZnQ7XHJcblx0XHRcdHZhciBwb3NUb3AgPSAtd3JhcHBlci5vZmZzZXRUb3A7XHJcblx0XHRcdGJsdXJDU1MgPSBmb3JtLnN0eWxlO1xyXG5cclxuXHRcdFx0Ly9ibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG5cdFx0XHRibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0Ymx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufSgpKTtcclxuXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fYmcnKSkge1xyXG5cdGJsdXIuc2V0KCk7XHJcblxyXG5cdHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRibHVyLnNldCgpO1xyXG5cdH07XHJcbn07XHJcblxyXG4vL1NsaWRlclxyXG4vL9CU0LvRjyDRgtC+0LPQviwg0YfRgtC+0LHRiyDRg9C/0YDQsNCy0LvRj9GC0Ywg0LLRgNC10LzQtdC90LXQvCDQsNC90LjQvNCw0YbQuNC4XHJcbmNvbnN0IGR1cmF0aW9uID0gNTAwO1xyXG4vL9Ch0YfQtdGC0YfQuNC6XHJcbmxldCBpbWFnZUNvdW50ZXIgPSAxO1xyXG4vL9Cf0LXRgNC10LzQtdC90L3QsNGPLCDRh9GC0L7QsdGLINC90LUg0YHQsdC+0LjQu9CwINCw0L3QuNC80LDRhtC40Y8g0L/RgNC4INGH0LDRgdGC0YvRhSDQvdCw0LbQsNGC0LjRj9GFINC60L3QvtC/0LrQuCBcItC70LjRgdGC0LDRgtGMXCJcclxubGV0IGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbmxldCBhZGRBY3RpdmVUb0Rlc2MgPSAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcblx0JCgnLndvcmtzX19kZXNjJykuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbn0pO1xyXG4vL9Ck0YPQvdC60YbQuNGPLCDQutC+0YLQvtGA0LDRjyDQtNCy0LjQs9Cw0LXRgiDRgdC70LDQudC00YtcclxuLy9jb250YWluZXIgLSDQvtC/0YDQtdC00LXQu9GP0LXRgiDQu9C10LLRi9C5INC40LvQuCDQv9GA0LDQstGL0Lkg0Y3Qu9C10LzQtdC90YIg0YHQu9Cw0LnQtNC10YDQsFxyXG4vL2RpcmVjdGlvbiAtINC90LDQv9GA0LDQstC70LXQvdC40LUg0L/RgNC+0LrRgNGD0YLQutC4INGB0LvQsNC50LTQvtCyXHJcbmNvbnN0IG1vdmVTbGlkZXMgPSAoY29udGFpbmVyLCBkaXJlY3Rpb24pID0+IHtcclxuXHQvL9C/0LXRgNC10LzQtdC90L3QsNGPINGB0L7QtNC10YDQttC40YIg0LLRgdC1INGB0LvQsNC50LTRi1xyXG5cdGxldCBpdGVtcyA9ICQoY29udGFpbmVyKS5maW5kKCcuc2xpZGVyX19pdGVtJyk7XHJcblx0XHJcblx0bGV0IGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKTtcclxuXHJcblx0bGV0IGFjdGl2ZUl0ZW1JbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcblx0bGV0IGNvdW50ZXIgPSBhY3RpdmVJdGVtSW5kZXggKyAxO1xyXG5cclxuXHRsZXQgaW1hZ2VzID0gJCgnLndvcmtzX19kaXNwbGF5LWV4YW1wbGVzJykuZmluZCgnLndvcmtzX19kaXNwbGF5LWV4YW1wbGUtcGljJyk7XHJcblxyXG5cdGxldCBhY3RpdmVJbWFnZSA9IGltYWdlcy5maWx0ZXIoJy5hY3RpdmUnKTtcclxuXHJcblx0bGV0IGRlc2NyaXB0aW9ucyA9ICQoJy53b3Jrc19fZGVzY3JpcHRpb24nKS5maW5kKCcud29ya3NfX2Rlc2MnKTtcclxuXHRcclxuXHRsZXQgYWN0aXZlRGVzYyA9IGRlc2NyaXB0aW9ucy5maWx0ZXIoJy5hY3RpdmUnKTtcclxuXHQvLyBsZXQgaW1hZ2VzUGF0aCA9IFtdO1xyXG5cdC8vIGltYWdlcy5lYWNoKGZ1bmN0aW9uKGksIGltYWdlKXtpbWFnZXNQYXRoLnB1c2goJChpbWFnZSkuYXR0cignc3JjJykpfSk7XHJcblxyXG5cdC8v0J/QtdGA0LXQvNC10L3QvdCw0Y8g0YPQv9GA0LDQstC70Y/QtdGCINC90LDQv9GA0LDQstC70LXQvdC40LXQvCDQv9GA0L7QutGA0YPRgtC60LhcclxuXHRsZXQgc3RyYWZlVG9wUGVyY2VudHMgPSBkaXJlY3Rpb24gPT09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblxyXG5cdC8v0J7QsdC90YPQu9GP0LXQvCBjb3VudGVyXHJcblx0aWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRjb3VudGVyID0gMDtcclxuXHR9O1xyXG5cclxuXHRpZiAoaW1hZ2VDb3VudGVyID49IGltYWdlcy5sZW5ndGgpIHtcclxuXHRcdGltYWdlQ291bnRlciA9IDA7XHJcblx0fTtcclxuXHJcblx0Ly/QodC70LDQudC00LXRgCwg0Log0LrQvtGC0L7RgNC+0LzRgyDQvdC10L7QsdGF0L7QtNC40LzQviDQv9GA0L7Qu9C40YHRgtCw0YLRjFxyXG5cdGNvbnN0IHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcblx0Ly/QmtCw0YDRgtC40L3QutCwLdC/0YDQuNC80LXRgCwg0Log0LrQvtGC0L7RgNC+0Lkg0L3QsNC00L4g0L/RgNC+0LvQuNGB0YLQsNGC0YxcclxuXHRjb25zdCByZXFJbWFnZSA9IGltYWdlcy5lcShpbWFnZUNvdW50ZXIpO1xyXG5cclxuXHQvL9Ce0L/QuNGB0LDQvdC40LUsINC6INC60L7RgtC+0YDQvtC80YMg0L3QsNC00L4g0L/RgNC+0LvQuNGB0YLQsNGC0YxcclxuXHRjb25zdCByZXFEZXNjID0gZGVzY3JpcHRpb25zLmVxKGltYWdlQ291bnRlcik7XHJcblxyXG5cdC8v0JvQuNGB0YLQsNC10Lwg0YHQu9Cw0LnQtNC10YA6XHJcblx0Ly/RgtC10LrRg9GJ0LjQuSDRg9GF0L7QtNC40YIg0LLQvdC40LcsXHJcblx0Ly/RgdC70LXQtNGD0Y7RidC40Lkg0LfQsCDQvdC40Lwg0L7Qv9GD0YHQutCw0LXRgtGB0Y8g0L3QsCDQtdCz0L4g0LzQtdGB0YLQviwg0LXQvNGDINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LrQu9Cw0YHRgSBhY3RpdmVcclxuXHQvL9C60L7RgtC+0YDRi9C5INGD0YjQtdC7INCy0L3QuNC3LCDQv9C10YDQtdGF0L7QtNC40YIg0L3QsNCy0LXRgNGFLCDQutC70LDRgdGBIGFjdGl2ZSDRg9C00LDQu9GP0LXQvFxyXG5cdGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHQndG9wJyA6IGAke3N0cmFmZVRvcFBlcmNlbnRzfSVgXHJcblx0fSwgZHVyYXRpb24pO1xyXG5cclxuXHRyZXFJdGVtLmFuaW1hdGUoe1xyXG5cdFx0J3RvcCcgOiAnMCdcclxuXHR9LCBkdXJhdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG5cdFx0XHQuY3NzKCd0b3AnLCBgJHstc3RyYWZlVG9wUGVyY2VudHN9JWApO1xyXG5cdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcclxuXHRcdGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHR9KTtcclxuXHJcblx0Ly/Qm9C40YHRgtCw0LXQvCDQutCw0YDRgtC40L3QutC4LdC/0YDQuNC80LXRgNGLXHJcblx0YWN0aXZlSW1hZ2UucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHJlcUltYWdlLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0Ly/Qm9C40YHRgtCw0LXQvCDQvtC/0LjRgdCw0L3QuNC1XHJcblx0YWN0aXZlRGVzYy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0cmVxRGVzYy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG59O1xyXG5cclxuJCgnLnNsaWRlcl9fY29udHJvbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7IFxyXG5cclxuXHRpZiAoaW5Qcm9ncmVzcykgcmV0dXJuO1xyXG5cdGluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuXHRtb3ZlU2xpZGVzKCcuc2xpZGVyX19maXJzdCcsICdkb3duJyk7XHJcblx0bW92ZVNsaWRlcygnLnNsaWRlcl9fb3Bwb3NpdGUnLCAndXAnKTtcclxuXHRpbWFnZUNvdW50ZXIrKztcclxufSk7XHJcblxyXG5cclxuLy9TaWRlYmFyXHJcblxyXG4vL9Ck0LjQutGB0LjRgNGD0LXQvCDRgdCw0LnQtNCx0LDRgCDQuCDQt9C10LvQtdC90YPRjiDQutC90L7Qv9C60YNcclxuJChmdW5jdGlvbigpIHtcclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlY3Rpb25IZWlnaHQgPSAkKCcuaGVybycpLm91dGVySGVpZ2h0KCk7XHJcblx0XHR2YXIgc2VjdGlvbldpZHRoID0gJCgnLmJsb2cnKS5vdXRlcldpZHRoKCk7XHJcblx0XHR2YXIgc2lkZWJhcldpZHRoID0gJCgnLmJsb2dfX3NpZGViYXInKS5vdXRlcldpZHRoKCk7XHJcblx0XHRsZXQgZGVsdGFZID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOy8v0KHQutC+0LvRjNC60L4g0L/RgNC+0YHQutGA0L7Qu9C70LjQu9C4INC+0YIg0LLQtdGA0YXQsCDQvtC60L3QsCDQsdGA0LDRg9C30LXRgNCwXHJcblx0XHRcclxuXHRcdGlmIChkZWx0YVkgPj0gc2VjdGlvbkhlaWdodCAmJiBzZWN0aW9uV2lkdGggPiA3NjgpIHtcclxuXHRcdFx0JCgnLmJsb2dfX25hdicpLmNzcyh7XHJcblx0XHRcdFx0J3Bvc2l0aW9uJzogJ2ZpeGVkJyxcclxuXHRcdFx0XHQnbWF4LXdpZHRoJzogc2lkZWJhcldpZHRoICsgJ3B4JyxcclxuXHRcdFx0XHQndG9wJzogJzYwcHgnXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLmJsb2dfX25hdicpLmNzcyh7XHJcblx0XHRcdFx0J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcclxuXHRcdFx0XHQndG9wJzogJzAnXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkZWx0YVkgPj0gc2VjdGlvbkhlaWdodCAmJiBzZWN0aW9uV2lkdGggPD0gNzY4KSB7XHJcblx0XHQgJCgnLmdyZWVuLWZvbGRlcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxufSk7XHJcblxyXG4vL9C90LDQstC40LPQsNGG0LjRjyDQv9C+INGB0YLQsNGC0YzRj9C8INCyINCx0LvQvtCz0LVcclxuJCgnLmJsb2dfX25hdicpLmZpbmQoJy5ibG9nX19uYXYtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0dmFyIGFydGljbGUgPSAkdGhpcy5jbG9zZXN0KCcuYmxvZycpLmZpbmQoJy5ibG9nX19hcnRpY2xlJykuZmlsdGVyKCR0aGlzLmF0dHIoJ2hyZWYnKSk7XHJcblxyXG5cdFx0Ly8gdmFyIGRvY0JvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0Ly8gZG9jQm9keS5hbmltYXRlKHtcclxuXHRcdC8vIFx0c2Nyb2xsVG9wOiBhcnRpY2xlLm9mZnNldCgpLnRvcFxyXG5cdFx0Ly8gfSk7XHJcblx0XHRcclxufSlcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdHZhciBhcnRpY2xlcyA9IFtdO1xyXG5cclxuXHRcdCQoJy5ibG9nX19hcnRpY2xlcycpLmZpbmQoJy5ibG9nX19hcnRpY2xlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0YXJ0aWNsZXMucHVzaCgkKHRoaXMpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZigoJHRoaXMuc2Nyb2xsVG9wKCkgPj0gYXJ0aWNsZXNbaV0ub2Zmc2V0KCkudG9wKSkge1xyXG5cdFx0XHRcdGFydGljbGVzW2ldLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1pdGVtJykuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGFydGljbGVzW2ldLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1saW5rW2hyZWY9XCIjJyArIGFydGljbGVzW2ldLmF0dHIoJ2lkJykgKyAnXCJdJykuY2xvc2VzdCgnLmJsb2dfX25hdi1pdGVtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZigkKGRvY3VtZW50LmJvZHkpLmZpbmQoJy5ibG9nX19hcnRpY2xlLWhlYWRlcicpLmxlbmd0aCkge1xyXG5cdFx0XHRpZihkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA9PT0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgKyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCkge1xyXG5cdFx0XHRcdGFydGljbGVzW2FydGljbGVzLmxlbmd0aCAtIDFdLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1pdGVtJykuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGFydGljbGVzW2FydGljbGVzLmxlbmd0aCAtIDFdLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1saW5rW2hyZWY9XCIjJyArIGFydGljbGVzW2FydGljbGVzLmxlbmd0aCAtIDFdLmF0dHIoJ2lkJykgKyAnXCJdJykuY2xvc2VzdCgnLmJsb2dfX25hdi1pdGVtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbn0pXHJcblxyXG4vL9Ce0YLQutGA0YvQstCw0Y7RidC10LXRgdGPINC80LXQvdGOINCyINCx0LvQvtCz0LUg0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LfQtdC70LXQvdGD0Y4g0L/QsNC/0LrRg1xyXG4kKCcuZ3JlZW4tZm9sZGVyX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0Zm9sZGVyPSAkdGhpcy5wYXJlbnQoKSxcclxuXHRcdHNpZGViYXIgPSBmb2xkZXIuc2libGluZ3MoJy5ibG9nJykuZmluZCgnLmJsb2dfX3NpZGViYXInKTtcclxuXHRsZXQgc2lkZWJhcldpZHRoID0gc2lkZWJhci5vdXRlcldpZHRoKCk7XHJcblx0XHJcblx0aWYoc2lkZWJhci5jc3MoJ2xlZnQnKSA9PT0gJy0yODBweCcpIHtcclxuXHRcdFx0Zm9sZGVyLmFuaW1hdGUoe1xyXG5cdFx0XHRcdCdtYXJnaW4tbGVmdCc6ICcyODBweCdcclxuXHRcdFx0fSlcclxuXHRcdFx0c2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0XHQnbGVmdCc6ICcwJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRmb2xkZXIuYW5pbWF0ZSh7XHJcblx0XHRcdFx0J21hcmdpbi1sZWZ0JzogJzAnXHJcblx0XHRcdH0pXHJcblx0XHRcdHNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdFx0J2xlZnQnOiAnLTI4MHB4J1xyXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG59KVxyXG5cclxuXHJcblxyXG4vL0J1cmdlci1tZW51XHJcbiQoJy5idXJnZXItbWVudV9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHQkdGhpcy50b2dnbGVDbGFzcygnYnVyZ2VyLW1lbnVfX2Nsb3NlX2NoYW5nZScpO1xyXG5cdFx0XHJcblx0XHRpZigkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XHJcblx0XHRcdCR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdCR0aGlzLm5leHQoKS5maW5kKCcuYnVyZ2VyLW1lbnVfX29wZW4tbGVmdCcpLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHQncmlnaHQnOiAnNTAlJ1xyXG5cdFx0XHR9LCA1MDApO1xyXG5cdFx0XHQkdGhpcy5uZXh0KCkuZmluZCgnLmJ1cmdlci1tZW51X19vcGVuLXJpZ2h0Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdCdsZWZ0JzogJzUwJSdcclxuXHRcdFx0fSwgNTAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcuYnVyZ2VyLW1lbnVfX29wZW4tdGV4dCcpLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcdCdvcGFjaXR5JzogJzEnXHJcblx0XHRcdFx0fSwgMjAwKVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR0aGlzLm5leHQoKS5maW5kKCcuYnVyZ2VyLW1lbnVfX29wZW4tdGV4dCcpLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHQnb3BhY2l0eSc6ICcwJ1xyXG5cdFx0XHR9LCAyMDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykuc2libGluZ3MoJy5idXJnZXItbWVudV9fb3Blbi1sZWZ0Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0J3JpZ2h0JzogJzEwMCUnXHJcblx0XHRcdFx0fSwgNTAwKTtcclxuXHRcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcuYnVyZ2VyLW1lbnVfX29wZW4tcmlnaHQnKS5zdG9wKCkuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHQnbGVmdCc6ICcxMDAlJ1xyXG5cdFx0XHRcdH0sIDUwMCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkdGhpcy5uZXh0KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG59KVxyXG4iXX0=
