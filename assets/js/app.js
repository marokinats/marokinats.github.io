// (function() {
//   'use strict';

//   setTimeout(function() {
//     document.querySelector('.greating_picture').classList.add('m--show');
//   }, 1000);
// })();

//Flip
function flip() {
    $('.flip__id').toggleClass('flipped');
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

//blur.set();


window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
};

window.onresize = function () {
	blur.set();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKCkge1xyXG4vLyAgICd1c2Ugc3RyaWN0JztcclxuXHJcbi8vICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVhdGluZ19waWN0dXJlJykuY2xhc3NMaXN0LmFkZCgnbS0tc2hvdycpO1xyXG4vLyAgIH0sIDEwMDApO1xyXG4vLyB9KSgpO1xyXG5cclxuLy9GbGlwXHJcbmZ1bmN0aW9uIGZsaXAoKSB7XHJcbiAgICAkKCcuZmxpcF9faWQnKS50b2dnbGVDbGFzcygnZmxpcHBlZCcpO1xyXG59XHJcblxyXG4vL1BhcmFsbGF4XHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7XHJcblx0dmFyIHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXRpdGxlX19waWMnKTtcclxuXHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19ibG9jaycpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHQvL9Cg0LDRgdGB0YfQuNGC0LDQtdC8INGB0LTQstC40LMg0LIg0L/RgNC+0YbQtdC90YLQsNGFXHJcblx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHQvL9C/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRgdGC0LjQu9GPLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cdFx0XHQvL9CX0LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiwg0LrRg9C00LAg0LHRg9C00LXQvCDQv9C10YDQtdC00LDQstCw0YLRjCDRgdGC0LjQu9GMINC00LvRjyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIG5ld1N0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG5cdFx0XHRuZXdTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdG5ld1N0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0dGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdHRoaXMubW92ZShzZWN0aW9uVGl0bGUsIHdTY3JvbGwsIDIwKTtcclxuXHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG5cdFx0fVxyXG5cdH1cclxufSgpKTtcclxuXHJcbi8vQmx1clxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fZm9ybScpO1xyXG5cdHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm0tYmx1cicpO1xyXG5cdHZhciByZXZpZXdzQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fYmcnKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHNldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgaW1nV2lkdGggPSByZXZpZXdzQmcub2Zmc2V0V2lkdGg7XHJcblx0XHRcdHZhciBpbWdIZWlnaHQgPSByZXZpZXdzQmcub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR2YXIgcG9zTGVmdCA9IC13cmFwcGVyLm9mZnNldExlZnQ7XHJcblx0XHRcdHZhciBwb3NUb3AgPSAtd3JhcHBlci5vZmZzZXRUb3A7XHJcblx0XHRcdGJsdXJDU1MgPSBmb3JtLnN0eWxlO1xyXG5cclxuXHRcdFx0Ly9ibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG5cdFx0XHRibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0Ymx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0oKSk7XHJcblxyXG4vL2JsdXIuc2V0KCk7XHJcblxyXG5cclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuXHRwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG59O1xyXG5cclxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG5cdGJsdXIuc2V0KCk7XHJcbn07Il19
