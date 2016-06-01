$(function() {
	var h = util.random(0, 360);
	var $ele = $('#colorCircle');
	setInterval(function() {
		$ele.css({
			background: 'hsl(' + h + ',100%,50%)'
		});
		h = h >= 360 ? 0 : h + 2;
	}, 150);
})