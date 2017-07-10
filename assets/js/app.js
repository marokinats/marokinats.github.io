// (function() {
//   'use strict';

//   setTimeout(function() {
//     document.querySelector('.greating_picture').classList.add('m--show');
//   }, 1000);
// })();

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
			var style = block.style;

			style.transform = transformString;
			style.webkitTransform = transformString;
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

	return {
		set: function () {
			var imgWidth = document.querySelector('.reviews__bg').offsetWidth;
			var imgHeight = document.querySelector('.reviews__bg').offsetHeight;
			var posLeft = -wrapper.offsetLeft;
			var posTop = -wrapper.offsetTop;
			blurCSS = form.style;

			//blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
			blurCSS.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
			blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';

		}
	}

}());

blur.set();


window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
};

window.onresize = function () {
	blur.set();

};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAoZnVuY3Rpb24oKSB7XHJcbi8vICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWF0aW5nX3BpY3R1cmUnKS5jbGFzc0xpc3QuYWRkKCdtLS1zaG93Jyk7XHJcbi8vICAgfSwgMTAwMCk7XHJcbi8vIH0pKCk7XHJcblxyXG4vL1BhcmFsbGF4XHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7XHJcblx0dmFyIHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXRpdGxlX19waWMnKTtcclxuXHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19ibG9jaycpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHQvL9Cg0LDRgdGB0YfQuNGC0LDQtdC8INGB0LTQstC40LMg0LIg0L/RgNC+0YbQtdC90YLQsNGFXHJcblx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHQvL9C/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRgdGC0LjQu9GPLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cdFx0XHQvL9CX0LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiwg0LrRg9C00LAg0LHRg9C00LXQvCDQv9C10YDQtdC00LDQstCw0YLRjCDRgdGC0LjQu9GMINC00LvRjyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdC8INC40LfQvNC10L3Rj9GC0YxcclxuXHRcdFx0dmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG5cdFx0XHRzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0dGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdHRoaXMubW92ZShzZWN0aW9uVGl0bGUsIHdTY3JvbGwsIDIwKTtcclxuXHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG5cdFx0fVxyXG5cdH1cclxufSgpKTtcclxuXHJcbi8vQmx1clxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fZm9ybScpO1xyXG5cdHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2Zvcm0tYmx1cicpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0c2V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX19iZycpLm9mZnNldFdpZHRoO1xyXG5cdFx0XHR2YXIgaW1nSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlld3NfX2JnJykub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR2YXIgcG9zTGVmdCA9IC13cmFwcGVyLm9mZnNldExlZnQ7XHJcblx0XHRcdHZhciBwb3NUb3AgPSAtd3JhcHBlci5vZmZzZXRUb3A7XHJcblx0XHRcdGJsdXJDU1MgPSBmb3JtLnN0eWxlO1xyXG5cclxuXHRcdFx0Ly9ibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG5cdFx0XHRibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0Ymx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0oKSk7XHJcblxyXG5ibHVyLnNldCgpO1xyXG5cclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxufTtcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRibHVyLnNldCgpO1xyXG5cclxufTsiXX0=
