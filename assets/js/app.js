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
	//e.preventDefault();

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


//Валидация формы

//Иммитация checked
var radioCheck	= $('.authorization__form-radio-label');

radioCheck.on('click', function() {
	var $this = $(this);
	
	if($this.find('input[value="yes"]').is(':checked')) {
		$('.authorization__form-radio-btn_yes').addClass('show');
		$('.authorization__form-radio-btn_no').removeClass('show');
	} else {
		$('.authorization__form-radio-btn_no').addClass('show');
		$('.authorization__form-radio-btn_yes').removeClass('show');
	}
})

//fancybox
$(function () {
	$('.authorization__form').on('submit', function (e) {
		e.preventDefault();

		var form = $(this);
		var formData = form.serialize(); //Формирует GETстроку для запроса

		$.ajax({
			url: '../mail.php',
			type: 'POST',
			data: formData, //Передаем полученные из формы данные на сервер
			success: function (data) { // Функция выполнится, если запрос пройдет успешно
			
				var popup = data.status ? '#success' : '#error';
				
				$.fancybox.open([ //Открытие всплывающего уведомления
					{ href: popup }
				], {
					type: 'inline',
					//maxWidth : 250,
					//fitToView : false,
					//padding : 0,
					afterClose : function () { //Cb после закрытия всплывающего окна
						form.trigger('reset'); //Очистка формы
					}
				});
			}
		})

	});

	$('.status-popup__close').on('click', function (e) {//Закрытие всплывающего уведомления
		e.preventDefault();
		$.fancybox.close();
	});
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIChmdW5jdGlvbigpIHtcclxuLy8gICAndXNlIHN0cmljdCc7XHJcblxyXG4vLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlYXRpbmdfcGljdHVyZScpLmNsYXNzTGlzdC5hZGQoJ20tLXNob3cnKTtcclxuLy8gICB9LCAxMDAwKTtcclxuLy8gfSkoKTtcclxuXHJcbi8vUHJlbG9hZGVyXHJcbmxldCBwZXJjZW50c1RvdGFsID0gMDtcclxuY29uc3QgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xyXG4vL9Cf0LXRgNC10LHQuNGA0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLINC90LAg0YHRgtGA0LDQvdC40YbQtSwg0YfRgtC+0LHRiyDRgdC+0LHRgNCw0YLRjCDQv9GD0YLQuCDQtNC+INC60LDRgNGC0LjQvdC+0LooaW1nINC40LvQuCBiZylcclxuY29uc3QgaW1nUGF0aHMgPSAkKCcqJykubWFwKChuZHgsIGVsZW0pID0+IHtcclxuXHQvL9Cf0YDQvtCy0LXRgNC40LwsINGP0LLQu9GP0LXRgtGB0Y8g0LvQuCDRjdC70LXQvNC10L0gaW1nLCDQtdGB0LvQuCB0cnVlIC0g0YHQvtGF0YDQsNC90Y/QtdC8INCyINC/0LXRgNC10LzQtdC90L3Rg9GOLFxyXG5cdC8v0LXRgdC70LggZmFsc2UgLSDQvdC1INGB0L7RhdGA0LDQvdGP0LXQvFxyXG5cdGNvbnN0IGlzSW1nID0gJChlbGVtKS5pcygnaW1nJyk7XHJcblx0Ly/Qn9C10YDQtdC80LXQvdC90LDRjyDRgdC+0LTQtdGA0LbQuNGCIGJnINGN0LvQtdC80LXQvdGC0LAgKNC/0YPRgtGMINC00L4g0LrQsNGA0YLQuNC90LrQuClcclxuXHRjb25zdCBiYWNrZ3JvdW5kID0gJChlbGVtKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuXHQvL9CSINC/0LXRgNC10LzQtdC90L3Rg9GOINGB0L7RhdGA0LDQvdGP0LXQvCDQv9GD0YLQuCDQtNC+IGltZ1xyXG5cdGxldCBwYXRoID0gJyc7XHJcblxyXG5cdGlmIChpc0ltZykge1xyXG5cdFx0cGF0aCA9ICQoZWxlbSkuYXR0cignc3JjJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuXHRcdHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcblx0fVxyXG5cclxuXHRpZiAocGF0aCkgcmV0dXJuIHBhdGg7Ly/QldGB0LvQuCBwYXRoINC90LUg0L/Rg9GB0YLQvtC5LCDRgtC+INGELdGG0LjRjyDQstC+0LfQstGA0LDRidCw0LXRgiDQtdCz0L5cclxufSk7XHJcblxyXG4vL9Cc0LXRgtC+0LQg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0L/RgNC+0YbQtdC90YLQvtCyXHJcbi8vdG90YWwgLSDRgdC60L7Qu9GM0LrQviDQvdGD0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCwgY3VycmVudCAtINGB0LrQvtC70YzQutC+INGD0LbQtSDQt9Cw0LPRgNGD0LbQtdC90L5cclxuY29uc3Qgc2V0UGVyY2VudHMgPSAodG90YWwsIGN1cnJlbnQpID0+IHtcclxuXHRjb25zdCBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuXHQkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQoYCR7cGVyY2VudHN9JWApO1xyXG5cclxuXHQvL9Cf0YDQvtCy0LXRgNC60LAsINC10YHQu9C4INCy0YHQtSDQutCw0YDRgtC40L3QutC4INC30LDQs9GA0YPQttC10L3Riywg0L/RgNC10LvQvtCw0LTQtdGAINGD0LHQuNGA0LDQtdC8XHJcblx0Ly9mYWRlT3V0KCkgLSDQuNC30LzQtdC90Y/QtdGCINCx0LvQvtC60YMgb3BhY2l0eSDQtNC+IDAg0Lgg0LfQsNGC0LXQvCDQtNC+0LHQsNCy0LvRj9C10YIgZGlzcGxheTpub25lO1xyXG5cdGlmIChwZXJjZW50cyA+PSAxMDApIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbn07XHJcblxyXG4vL9Cf0L7QtNCz0YDRg9C20LDQtdC8INC60LDRgNGC0LjQvdC60LhcclxuY29uc3QgbG9hZEltYWdlcyA9IChpbWFnZXMpID0+IHtcclxuXHQvL9CV0YHQu9C4INC60LDRgNGC0LjQvdC60Lgg0L3QtSDQt9Cw0LPRgNGD0LbQtdC90Yso0LTQu9C40L3QsCDQvNCw0YHRgdC40LLQsCDRgNCw0LLQvdCwIDApLCDRgtC+INGELdGG0LjRjyDQvdC1INCy0YvQv9C+0LvQvdC40YLRgdGPXHJcblx0aWYgKCFpbWFnZXMubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdC8v0J/QtdGA0LXQsdC10YDQtdC8INC60LDRgNGC0LjQvdC60LhcclxuXHRpbWFnZXMuZm9yRWFjaCgoaW1nLCBpLCBpbWFnZXMpID0+IHtcclxuXHRcdC8v0KHQvtC30LTQsNC10Lwg0LrQsNGA0YLQuNC90LrRg1xyXG5cdFx0Y29uc3QgZmFrZUltZyA9ICQoJzxpbWc+Jywge1xyXG5cdFx0XHQnYXR0cicgOiB7XHJcblx0XHRcdFx0J3NyYycgOiBpbWdcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly/Qn9GA0L7QstC10YDRj9C10LwsINC30LDQs9GA0YPQt9C40LvQsNGB0Ywg0LrQsNGA0YLQuNC90LrQsCDQuNC70Lgg0L3QtdGCXHJcblx0XHRmYWtlSW1nLm9uKCdsb2FkIGVycm9yJywgKCkgPT4ge1xyXG5cdFx0XHQvL9CV0YHQu9C4INC60LDRgNGC0LjQvdC60LAg0LfQsNCz0YDRg9C30LjQu9Cw0YHRjCwg0YLQviDRg9Cy0LXQu9C40YfQuNCy0LDQtdC8INC/0YDQvtGG0LXQvdGC0Ysg0L3QsCAxXHJcblx0XHRcdHBlcmNlbnRzVG90YWwrKztcclxuXHRcdFx0Ly/QkiDRhC3RhtC40Y4sINC60L7RgtC+0YDQsNGPINGB0YfQuNGC0LDQtdGCINC/0YDQvtGG0LXQvdGC0YssXHJcblx0XHRcdC8v0L/QtdGA0LXQtNCw0LXQvCDRgdC60L7Qu9GM0LrQviDQstGB0LXQs9C+INC90YPQttC90L4g0LfQsNCz0YDRg9C30LjRgtGMKGltYWdlcy5sZW5ndGgpLFxyXG5cdFx0XHQvL9C4INGB0LrQvtC70YzQutC+INGD0LbQtSDQt9Cw0LPRgNGD0LbQtdC90L4gKHBlcmNlbnRzVG90YWwpXHJcblx0XHRcdHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vL9Cf0YDQtdC+0LHRgNCw0LfRg9C10LwgaW1nUGF0aHMg0LIg0LzQsNGB0YHQuNCyXHJcbmNvbnN0IGltZ3MgPSBpbWdQYXRocy50b0FycmF5KCk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcblx0bG9hZEltYWdlcyhpbWdzKTtcclxufSk7XHJcblxyXG5cclxuLy9GbGlwXHJcbmZ1bmN0aW9uIGZsaXAoKSB7XHJcbiAgICAkKCcuZmxpcF9faWQnKS50b2dnbGVDbGFzcygnZmxpcHBlZCcpO1xyXG4gICAgLy/QodC60YDRi9GC0Ywg0LrQvdC+0L/QutGDINCQ0LLRgtC+0YDQuNC30LDRhtC40LhcclxuICAgIGlmICgkKCcud2VsY29tZV9fY29udGVudCcpLmhhc0NsYXNzKCdmbGlwcGVkJykpIHtcclxuICAgIFx0JCgnLndlbGNvbWVfX2F1dGhvcml6YXRpb24tYnV0dG9uJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH1lbHNlIHtcclxuICAgIFx0JCgnLndlbGNvbWVfX2F1dGhvcml6YXRpb24tYnV0dG9uJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLy9QYXJhbGxheFxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpO1xyXG5cdHZhciBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi10aXRsZV9fcGljJyk7XHJcblx0dmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9fYmxvY2snKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuXHRcdFx0Ly/QoNCw0YHRgdGH0LjRgtCw0LXQvCDRgdC00LLQuNCzINCyINC/0YDQvtGG0LXQvdGC0LDRhVxyXG5cdFx0XHR2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuXHRcdFx0Ly/Qv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YHRgtC40LvRjywg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXQvCDQuNC30LzQtdC90Y/RgtGMXHJcblx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJztcclxuXHRcdFx0Ly/Ql9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4sINC60YPQtNCwINCx0YPQtNC10Lwg0L/QtdGA0LXQtNCw0LLQsNGC0Ywg0YHRgtC40LvRjCDQtNC70Y8g0LHQu9C+0LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXQvCDQuNC30LzQtdC90Y/RgtGMXHJcblx0XHRcdHZhciBuZXdTdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG5cclxuXHRcdFx0bmV3U3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0XHRuZXdTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHR9LFxyXG5cclxuXHRcdGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcblx0XHRcdHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG5cdFx0XHR0aGlzLm1vdmUoc2VjdGlvblRpdGxlLCB3U2Nyb2xsLCAyMCk7XHJcblx0XHRcdHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAzKTtcclxuXHRcdH1cclxuXHR9XHJcbn0oKSk7XHJcblxyXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG5cdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbn07XHJcblxyXG4vL0JsdXJcclxudmFyIGJsdXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm0nKTtcclxuXHR2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19mb3JtLWJsdXInKTtcclxuXHR2YXIgcmV2aWV3c0JnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2JnJyk7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRzZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGltZ1dpZHRoID0gcmV2aWV3c0JnLm9mZnNldFdpZHRoO1xyXG5cdFx0XHR2YXIgaW1nSGVpZ2h0ID0gcmV2aWV3c0JnLm9mZnNldEhlaWdodDtcclxuXHRcdFx0dmFyIHBvc0xlZnQgPSAtd3JhcHBlci5vZmZzZXRMZWZ0O1xyXG5cdFx0XHR2YXIgcG9zVG9wID0gLXdyYXBwZXIub2Zmc2V0VG9wO1xyXG5cdFx0XHRibHVyQ1NTID0gZm9ybS5zdHlsZTtcclxuXHJcblx0XHRcdC8vYmx1ckNTUy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArICdhdXRvJztcclxuXHRcdFx0Ymx1ckNTUy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XHJcblx0XHRcdGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCcgKyAnICcgKyBwb3NUb3AgKyAncHgnO1xyXG5cclxuXHRcdH1cclxuXHR9XHJcbn0oKSk7XHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2JnJykpIHtcclxuXHRibHVyLnNldCgpO1xyXG5cclxuXHR3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblx0Ymx1ci5zZXQoKTtcclxuXHR9O1xyXG59O1xyXG5cclxuLy9TbGlkZXJcclxuLy/QlNC70Y8g0YLQvtCz0L4sINGH0YLQvtCx0Ysg0YPQv9GA0LDQstC70Y/RgtGMINCy0YDQtdC80LXQvdC10Lwg0LDQvdC40LzQsNGG0LjQuFxyXG5jb25zdCBkdXJhdGlvbiA9IDUwMDtcclxuLy/QodGH0LXRgtGH0LjQulxyXG5sZXQgaW1hZ2VDb3VudGVyID0gMTtcclxuLy/Qn9C10YDQtdC80LXQvdC90LDRjywg0YfRgtC+0LHRiyDQvdC1INGB0LHQvtC40LvQsCDQsNC90LjQvNCw0YbQuNGPINC/0YDQuCDRh9Cw0YHRgtGL0YUg0L3QsNC20LDRgtC40Y/RhSDQutC90L7Qv9C60LggXCLQu9C40YHRgtCw0YLRjFwiXHJcbmxldCBpblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG5sZXQgYWRkQWN0aXZlVG9EZXNjID0gJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG5cdCQoJy53b3Jrc19fZGVzYycpLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxuLy/QpNGD0L3QutGG0LjRjywg0LrQvtGC0L7RgNCw0Y8g0LTQstC40LPQsNC10YIg0YHQu9Cw0LnQtNGLXHJcbi8vY29udGFpbmVyIC0g0L7Qv9GA0LXQtNC10LvRj9C10YIg0LvQtdCy0YvQuSDQuNC70Lgg0L/RgNCw0LLRi9C5INGN0LvQtdC80LXQvdGCINGB0LvQsNC50LTQtdGA0LBcclxuLy9kaXJlY3Rpb24gLSDQvdCw0L/RgNCw0LLQu9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCDRgdC70LDQudC00L7QslxyXG5jb25zdCBtb3ZlU2xpZGVzID0gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSA9PiB7XHJcblx0Ly/Qv9C10YDQtdC80LXQvdC90LDRjyDRgdC+0LTQtdGA0LbQuNGCINCy0YHQtSDRgdC70LDQudC00YtcclxuXHRsZXQgaXRlbXMgPSAkKGNvbnRhaW5lcikuZmluZCgnLnNsaWRlcl9faXRlbScpO1xyXG5cdFxyXG5cdGxldCBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyk7XHJcblxyXG5cdGxldCBhY3RpdmVJdGVtSW5kZXggPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG5cdGxldCBjb3VudGVyID0gYWN0aXZlSXRlbUluZGV4ICsgMTtcclxuXHJcblx0bGV0IGltYWdlcyA9ICQoJy53b3Jrc19fZGlzcGxheS1leGFtcGxlcycpLmZpbmQoJy53b3Jrc19fZGlzcGxheS1leGFtcGxlLXBpYycpO1xyXG5cclxuXHRsZXQgYWN0aXZlSW1hZ2UgPSBpbWFnZXMuZmlsdGVyKCcuYWN0aXZlJyk7XHJcblxyXG5cdGxldCBkZXNjcmlwdGlvbnMgPSAkKCcud29ya3NfX2Rlc2NyaXB0aW9uJykuZmluZCgnLndvcmtzX19kZXNjJyk7XHJcblx0XHJcblx0bGV0IGFjdGl2ZURlc2MgPSBkZXNjcmlwdGlvbnMuZmlsdGVyKCcuYWN0aXZlJyk7XHJcblx0Ly8gbGV0IGltYWdlc1BhdGggPSBbXTtcclxuXHQvLyBpbWFnZXMuZWFjaChmdW5jdGlvbihpLCBpbWFnZSl7aW1hZ2VzUGF0aC5wdXNoKCQoaW1hZ2UpLmF0dHIoJ3NyYycpKX0pO1xyXG5cclxuXHQvL9Cf0LXRgNC10LzQtdC90L3QsNGPINGD0L/RgNCw0LLQu9GP0LXRgiDQvdCw0L/RgNCw0LLQu9C10L3QuNC10Lwg0L/RgNC+0LrRgNGD0YLQutC4XHJcblx0bGV0IHN0cmFmZVRvcFBlcmNlbnRzID0gZGlyZWN0aW9uID09PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuXHQvL9Ce0LHQvdGD0LvRj9C10LwgY291bnRlclxyXG5cdGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0Y291bnRlciA9IDA7XHJcblx0fTtcclxuXHJcblx0aWYgKGltYWdlQ291bnRlciA+PSBpbWFnZXMubGVuZ3RoKSB7XHJcblx0XHRpbWFnZUNvdW50ZXIgPSAwO1xyXG5cdH07XHJcblxyXG5cdC8v0KHQu9Cw0LnQtNC10YAsINC6INC60L7RgtC+0YDQvtC80YMg0L3QtdC+0LHRhdC+0LTQuNC80L4g0L/RgNC+0LvQuNGB0YLQsNGC0YxcclxuXHRjb25zdCByZXFJdGVtID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG5cdC8v0JrQsNGA0YLQuNC90LrQsC3Qv9GA0LjQvNC10YAsINC6INC60L7RgtC+0YDQvtC5INC90LDQtNC+INC/0YDQvtC70LjRgdGC0LDRgtGMXHJcblx0Y29uc3QgcmVxSW1hZ2UgPSBpbWFnZXMuZXEoaW1hZ2VDb3VudGVyKTtcclxuXHJcblx0Ly/QntC/0LjRgdCw0L3QuNC1LCDQuiDQutC+0YLQvtGA0L7QvNGDINC90LDQtNC+INC/0YDQvtC70LjRgdGC0LDRgtGMXHJcblx0Y29uc3QgcmVxRGVzYyA9IGRlc2NyaXB0aW9ucy5lcShpbWFnZUNvdW50ZXIpO1xyXG5cclxuXHQvL9Cb0LjRgdGC0LDQtdC8INGB0LvQsNC50LTQtdGAOlxyXG5cdC8v0YLQtdC60YPRidC40Lkg0YPRhdC+0LTQuNGCINCy0L3QuNC3LFxyXG5cdC8v0YHQu9C10LTRg9GO0YnQuNC5INC30LAg0L3QuNC8INC+0L/Rg9GB0LrQsNC10YLRgdGPINC90LAg0LXQs9C+INC80LXRgdGC0L4sINC10LzRgyDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC60LvQsNGB0YEgYWN0aXZlXHJcblx0Ly/QutC+0YLQvtGA0YvQuSDRg9GI0LXQuyDQstC90LjQtywg0L/QtdGA0LXRhdC+0LTQuNGCINC90LDQstC10YDRhSwg0LrQu9Cw0YHRgSBhY3RpdmUg0YPQtNCw0LvRj9C10LxcclxuXHRhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG5cdFx0J3RvcCcgOiBgJHtzdHJhZmVUb3BQZXJjZW50c30lYFxyXG5cdH0sIGR1cmF0aW9uKTtcclxuXHJcblx0cmVxSXRlbS5hbmltYXRlKHtcclxuXHRcdCd0b3AnIDogJzAnXHJcblx0fSwgZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuXHRcdFx0LmNzcygndG9wJywgYCR7LXN0cmFmZVRvcFBlcmNlbnRzfSVgKTtcclxuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHJcblx0XHRpblByb2dyZXNzID0gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdC8v0JvQuNGB0YLQsNC10Lwg0LrQsNGA0YLQuNC90LrQuC3Qv9GA0LjQvNC10YDRi1xyXG5cdGFjdGl2ZUltYWdlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRyZXFJbWFnZS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdC8v0JvQuNGB0YLQsNC10Lwg0L7Qv9C40YHQsNC90LjQtVxyXG5cdGFjdGl2ZURlc2MucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHJlcURlc2MuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxufTtcclxuXHJcbiQoJy5zbGlkZXJfX2NvbnRyb2wnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpOyBcclxuXHJcblx0aWYgKGluUHJvZ3Jlc3MpIHJldHVybjtcclxuXHRpblByb2dyZXNzID0gdHJ1ZTtcclxuXHJcblx0bW92ZVNsaWRlcygnLnNsaWRlcl9fZmlyc3QnLCAnZG93bicpO1xyXG5cdG1vdmVTbGlkZXMoJy5zbGlkZXJfX29wcG9zaXRlJywgJ3VwJyk7XHJcblx0aW1hZ2VDb3VudGVyKys7XHJcbn0pO1xyXG5cclxuXHJcbi8vU2lkZWJhclxyXG5cclxuLy/QpNC40LrRgdC40YDRg9C10Lwg0YHQsNC50LTQsdCw0YAg0Lgg0LfQtdC70LXQvdGD0Y4g0LrQvdC+0L/QutGDXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZWN0aW9uSGVpZ2h0ID0gJCgnLmhlcm8nKS5vdXRlckhlaWdodCgpO1xyXG5cdFx0dmFyIHNlY3Rpb25XaWR0aCA9ICQoJy5ibG9nJykub3V0ZXJXaWR0aCgpO1xyXG5cdFx0dmFyIHNpZGViYXJXaWR0aCA9ICQoJy5ibG9nX19zaWRlYmFyJykub3V0ZXJXaWR0aCgpO1xyXG5cdFx0bGV0IGRlbHRhWSA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsvL9Ch0LrQvtC70YzQutC+INC/0YDQvtGB0LrRgNC+0LvQu9C40LvQuCDQvtGCINCy0LXRgNGF0LAg0L7QutC90LAg0LHRgNCw0YPQt9C10YDQsFxyXG5cdFx0XHJcblx0XHRpZiAoZGVsdGFZID49IHNlY3Rpb25IZWlnaHQgJiYgc2VjdGlvbldpZHRoID4gNzY4KSB7XHJcblx0XHRcdCQoJy5ibG9nX19uYXYnKS5jc3Moe1xyXG5cdFx0XHRcdCdwb3NpdGlvbic6ICdmaXhlZCcsXHJcblx0XHRcdFx0J21heC13aWR0aCc6IHNpZGViYXJXaWR0aCArICdweCcsXHJcblx0XHRcdFx0J3RvcCc6ICc2MHB4J1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5ibG9nX19uYXYnKS5jc3Moe1xyXG5cdFx0XHRcdCdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXHJcblx0XHRcdFx0J3RvcCc6ICcwJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGVsdGFZID49IHNlY3Rpb25IZWlnaHQgJiYgc2VjdGlvbldpZHRoIDw9IDc2OCkge1xyXG5cdFx0ICQoJy5ncmVlbi1mb2xkZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdH1cclxuXHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLy/QvdCw0LLQuNCz0LDRhtC40Y8g0L/QviDRgdGC0LDRgtGM0Y/QvCDQsiDQsdC70L7Qs9C1XHJcbiQoJy5ibG9nX19uYXYnKS5maW5kKCcuYmxvZ19fbmF2LWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0Ly9lLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0dmFyIGFydGljbGUgPSAkdGhpcy5jbG9zZXN0KCcuYmxvZycpLmZpbmQoJy5ibG9nX19hcnRpY2xlJykuZmlsdGVyKCR0aGlzLmF0dHIoJ2hyZWYnKSk7XHJcblxyXG5cdFx0Ly8gdmFyIGRvY0JvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0Ly8gZG9jQm9keS5hbmltYXRlKHtcclxuXHRcdC8vIFx0c2Nyb2xsVG9wOiBhcnRpY2xlLm9mZnNldCgpLnRvcFxyXG5cdFx0Ly8gfSk7XHJcblx0XHRcclxufSlcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdHZhciBhcnRpY2xlcyA9IFtdO1xyXG5cclxuXHRcdCQoJy5ibG9nX19hcnRpY2xlcycpLmZpbmQoJy5ibG9nX19hcnRpY2xlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0YXJ0aWNsZXMucHVzaCgkKHRoaXMpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZigoJHRoaXMuc2Nyb2xsVG9wKCkgPj0gYXJ0aWNsZXNbaV0ub2Zmc2V0KCkudG9wKSkge1xyXG5cdFx0XHRcdGFydGljbGVzW2ldLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1pdGVtJykuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGFydGljbGVzW2ldLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1saW5rW2hyZWY9XCIjJyArIGFydGljbGVzW2ldLmF0dHIoJ2lkJykgKyAnXCJdJykuY2xvc2VzdCgnLmJsb2dfX25hdi1pdGVtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZigkKGRvY3VtZW50LmJvZHkpLmZpbmQoJy5ibG9nX19hcnRpY2xlLWhlYWRlcicpLmxlbmd0aCkge1xyXG5cdFx0XHRpZihkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA9PT0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgKyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCkge1xyXG5cdFx0XHRcdGFydGljbGVzW2FydGljbGVzLmxlbmd0aCAtIDFdLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1pdGVtJykuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGFydGljbGVzW2FydGljbGVzLmxlbmd0aCAtIDFdLmNsb3Nlc3QoJy5ibG9nJykuZmluZCgnLmJsb2dfX25hdi1saW5rW2hyZWY9XCIjJyArIGFydGljbGVzW2FydGljbGVzLmxlbmd0aCAtIDFdLmF0dHIoJ2lkJykgKyAnXCJdJykuY2xvc2VzdCgnLmJsb2dfX25hdi1pdGVtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbn0pXHJcblxyXG4vL9Ce0YLQutGA0YvQstCw0Y7RidC10LXRgdGPINC80LXQvdGOINCyINCx0LvQvtCz0LUg0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LfQtdC70LXQvdGD0Y4g0L/QsNC/0LrRg1xyXG4kKCcuZ3JlZW4tZm9sZGVyX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0Zm9sZGVyPSAkdGhpcy5wYXJlbnQoKSxcclxuXHRcdHNpZGViYXIgPSBmb2xkZXIuc2libGluZ3MoJy5ibG9nJykuZmluZCgnLmJsb2dfX3NpZGViYXInKTtcclxuXHRsZXQgc2lkZWJhcldpZHRoID0gc2lkZWJhci5vdXRlcldpZHRoKCk7XHJcblx0XHJcblx0aWYoc2lkZWJhci5jc3MoJ2xlZnQnKSA9PT0gJy0yODBweCcpIHtcclxuXHRcdFx0Zm9sZGVyLmFuaW1hdGUoe1xyXG5cdFx0XHRcdCdtYXJnaW4tbGVmdCc6ICcyODBweCdcclxuXHRcdFx0fSlcclxuXHRcdFx0c2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0XHQnbGVmdCc6ICcwJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRmb2xkZXIuYW5pbWF0ZSh7XHJcblx0XHRcdFx0J21hcmdpbi1sZWZ0JzogJzAnXHJcblx0XHRcdH0pXHJcblx0XHRcdHNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdFx0J2xlZnQnOiAnLTI4MHB4J1xyXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG59KVxyXG5cclxuXHJcblxyXG4vL0J1cmdlci1tZW51XHJcbiQoJy5idXJnZXItbWVudV9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHQkdGhpcy50b2dnbGVDbGFzcygnYnVyZ2VyLW1lbnVfX2Nsb3NlX2NoYW5nZScpO1xyXG5cdFx0XHJcblx0XHRpZigkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XHJcblx0XHRcdCR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdCR0aGlzLm5leHQoKS5maW5kKCcuYnVyZ2VyLW1lbnVfX29wZW4tbGVmdCcpLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHQncmlnaHQnOiAnNTAlJ1xyXG5cdFx0XHR9LCA1MDApO1xyXG5cdFx0XHQkdGhpcy5uZXh0KCkuZmluZCgnLmJ1cmdlci1tZW51X19vcGVuLXJpZ2h0Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdCdsZWZ0JzogJzUwJSdcclxuXHRcdFx0fSwgNTAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcuYnVyZ2VyLW1lbnVfX29wZW4tdGV4dCcpLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcdCdvcGFjaXR5JzogJzEnXHJcblx0XHRcdFx0fSwgMjAwKVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR0aGlzLm5leHQoKS5maW5kKCcuYnVyZ2VyLW1lbnVfX29wZW4tdGV4dCcpLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHQnb3BhY2l0eSc6ICcwJ1xyXG5cdFx0XHR9LCAyMDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykuc2libGluZ3MoJy5idXJnZXItbWVudV9fb3Blbi1sZWZ0Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0J3JpZ2h0JzogJzEwMCUnXHJcblx0XHRcdFx0fSwgNTAwKTtcclxuXHRcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcuYnVyZ2VyLW1lbnVfX29wZW4tcmlnaHQnKS5zdG9wKCkuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHQnbGVmdCc6ICcxMDAlJ1xyXG5cdFx0XHRcdH0sIDUwMCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkdGhpcy5uZXh0KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG59KVxyXG5cclxuXHJcbi8v0JLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcclxuXHJcbi8v0JjQvNC80LjRgtCw0YbQuNGPIGNoZWNrZWRcclxudmFyIHJhZGlvQ2hlY2tcdD0gJCgnLmF1dGhvcml6YXRpb25fX2Zvcm0tcmFkaW8tbGFiZWwnKTtcclxuXHJcbnJhZGlvQ2hlY2sub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcclxuXHRpZigkdGhpcy5maW5kKCdpbnB1dFt2YWx1ZT1cInllc1wiXScpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHQkKCcuYXV0aG9yaXphdGlvbl9fZm9ybS1yYWRpby1idG5feWVzJykuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdCQoJy5hdXRob3JpemF0aW9uX19mb3JtLXJhZGlvLWJ0bl9ubycpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5hdXRob3JpemF0aW9uX19mb3JtLXJhZGlvLWJ0bl9ubycpLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHQkKCcuYXV0aG9yaXphdGlvbl9fZm9ybS1yYWRpby1idG5feWVzJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHR9XHJcbn0pXHJcblxyXG4vL2ZhbmN5Ym94XHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cdCQoJy5hdXRob3JpemF0aW9uX19mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIGZvcm0gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGZvcm1EYXRhID0gZm9ybS5zZXJpYWxpemUoKTsgLy/QpNC+0YDQvNC40YDRg9C10YIgR0VU0YHRgtGA0L7QutGDINC00LvRjyDQt9Cw0L/RgNC+0YHQsFxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJy4uL21haWwucGhwJyxcclxuXHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRkYXRhOiBmb3JtRGF0YSwgLy/Qn9C10YDQtdC00LDQtdC8INC/0L7Qu9GD0YfQtdC90L3Ri9C1INC40Lcg0YTQvtGA0LzRiyDQtNCw0L3QvdGL0LUg0L3QsCDRgdC10YDQstC10YBcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHsgLy8g0KTRg9C90LrRhtC40Y8g0LLRi9C/0L7Qu9C90LjRgtGB0Y8sINC10YHQu9C4INC30LDQv9GA0L7RgSDQv9GA0L7QudC00LXRgiDRg9GB0L/QtdGI0L3QvlxyXG5cdFx0XHRcclxuXHRcdFx0XHR2YXIgcG9wdXAgPSBkYXRhLnN0YXR1cyA/ICcjc3VjY2VzcycgOiAnI2Vycm9yJztcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQkLmZhbmN5Ym94Lm9wZW4oWyAvL9Ce0YLQutGA0YvRgtC40LUg0LLRgdC/0LvRi9Cy0LDRjtGJ0LXQs9C+INGD0LLQtdC00L7QvNC70LXQvdC40Y9cclxuXHRcdFx0XHRcdHsgaHJlZjogcG9wdXAgfVxyXG5cdFx0XHRcdF0sIHtcclxuXHRcdFx0XHRcdHR5cGU6ICdpbmxpbmUnLFxyXG5cdFx0XHRcdFx0Ly9tYXhXaWR0aCA6IDI1MCxcclxuXHRcdFx0XHRcdC8vZml0VG9WaWV3IDogZmFsc2UsXHJcblx0XHRcdFx0XHQvL3BhZGRpbmcgOiAwLFxyXG5cdFx0XHRcdFx0YWZ0ZXJDbG9zZSA6IGZ1bmN0aW9uICgpIHsgLy9DYiDQv9C+0YHQu9C1INC30LDQutGA0YvRgtC40Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LXQs9C+INC+0LrQvdCwXHJcblx0XHRcdFx0XHRcdGZvcm0udHJpZ2dlcigncmVzZXQnKTsgLy/QntGH0LjRgdGC0LrQsCDRhNC+0YDQvNGLXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdH0pO1xyXG5cclxuXHQkKCcuc3RhdHVzLXBvcHVwX19jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7Ly/Ql9Cw0LrRgNGL0YLQuNC1INCy0YHQv9C70YvQstCw0Y7RidC10LPQviDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPXHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQkLmZhbmN5Ym94LmNsb3NlKCk7XHJcblx0fSk7XHJcbn0pO1xyXG4iXX0=
