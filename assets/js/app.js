// (function() {
//   'use strict';

//   setTimeout(function() {
//     document.querySelector('.greating_picture').classList.add('m--show');
//   }, 1000);
// })();

//Flip
function flip() {
    $('.flip__id').toggleClass('flipped');
    //Скрыть кнопку Авторизации
    if ($('.welcome__content').hasClass('flipped')) {
    	$('.welcome__auth-btn').css('display', 'none');
    }else {
    	$('.welcome__auth-btn').css('display', 'block');
    };
}

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
}


window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
};

window.onresize = function () {
	blur.set();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIChmdW5jdGlvbigpIHtcclxuLy8gICAndXNlIHN0cmljdCc7XHJcblxyXG4vLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlYXRpbmdfcGljdHVyZScpLmNsYXNzTGlzdC5hZGQoJ20tLXNob3cnKTtcclxuLy8gICB9LCAxMDAwKTtcclxuLy8gfSkoKTtcclxuXHJcbi8vRmxpcFxyXG5mdW5jdGlvbiBmbGlwKCkge1xyXG4gICAgJCgnLmZsaXBfX2lkJykudG9nZ2xlQ2xhc3MoJ2ZsaXBwZWQnKTtcclxuICAgIC8v0KHQutGA0YvRgtGMINC60L3QvtC/0LrRgyDQkNCy0YLQvtGA0LjQt9Cw0YbQuNC4XHJcbiAgICBpZiAoJCgnLndlbGNvbWVfX2NvbnRlbnQnKS5oYXNDbGFzcygnZmxpcHBlZCcpKSB7XHJcbiAgICBcdCQoJy53ZWxjb21lX19hdXRoLWJ0bicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICBcdCQoJy53ZWxjb21lX19hdXRoLWJ0bicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy9QYXJhbGxheFxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpO1xyXG5cdHZhciBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi10aXRsZV9fcGljJyk7XHJcblx0dmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9fYmxvY2snKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuXHRcdFx0Ly/QoNCw0YHRgdGH0LjRgtCw0LXQvCDRgdC00LLQuNCzINCyINC/0YDQvtGG0LXQvdGC0LDRhVxyXG5cdFx0XHR2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuXHRcdFx0Ly/Qv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YHRgtC40LvRjywg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXQvCDQuNC30LzQtdC90Y/RgtGMXHJcblx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJztcclxuXHRcdFx0Ly/Ql9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4sINC60YPQtNCwINCx0YPQtNC10Lwg0L/QtdGA0LXQtNCw0LLQsNGC0Ywg0YHRgtC40LvRjCDQtNC70Y8g0LHQu9C+0LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXQvCDQuNC30LzQtdC90Y/RgtGMXHJcblx0XHRcdHZhciBuZXdTdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG5cclxuXHRcdFx0bmV3U3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0XHRuZXdTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHR9LFxyXG5cclxuXHRcdGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcblx0XHRcdHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG5cdFx0XHR0aGlzLm1vdmUoc2VjdGlvblRpdGxlLCB3U2Nyb2xsLCAyMCk7XHJcblx0XHRcdHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAzKTtcclxuXHRcdH1cclxuXHR9XHJcbn0oKSk7XHJcblxyXG4vL0JsdXJcclxudmFyIGJsdXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm0nKTtcclxuXHR2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19mb3JtLWJsdXInKTtcclxuXHR2YXIgcmV2aWV3c0JnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2JnJyk7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRzZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGltZ1dpZHRoID0gcmV2aWV3c0JnLm9mZnNldFdpZHRoO1xyXG5cdFx0XHR2YXIgaW1nSGVpZ2h0ID0gcmV2aWV3c0JnLm9mZnNldEhlaWdodDtcclxuXHRcdFx0dmFyIHBvc0xlZnQgPSAtd3JhcHBlci5vZmZzZXRMZWZ0O1xyXG5cdFx0XHR2YXIgcG9zVG9wID0gLXdyYXBwZXIub2Zmc2V0VG9wO1xyXG5cdFx0XHRibHVyQ1NTID0gZm9ybS5zdHlsZTtcclxuXHJcblx0XHRcdC8vYmx1ckNTUy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArICdhdXRvJztcclxuXHRcdFx0Ymx1ckNTUy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XHJcblx0XHRcdGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCcgKyAnICcgKyBwb3NUb3AgKyAncHgnO1xyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG59KCkpO1xyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19iZycpKSB7XHJcblx0Ymx1ci5zZXQoKTtcclxufVxyXG5cclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxufTtcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRibHVyLnNldCgpO1xyXG59OyJdfQ==
