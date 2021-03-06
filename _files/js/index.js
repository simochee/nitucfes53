$(function() {
	$.getJSON('/_files/json/update.json', function(json) {
		var data = json;
		var html = '';
		for(var i=0, len=data.length; i<len; i++) {
			var item = data[i];
			var date = item.date.split('-');
			html += '<li class="update-item"><div class="date"><span class="year">' + date[0] + '.</span>' + date[1] + '.' + date[2] + '</div>';
			var content = item.content;
			for(var j=0, len=content.length; j<len; j++) {
				html += '<div class="content">' + content[j] + '</div>';
			}
			html += '</li>';
		}
		$('#updateHistory').html(html);
	});

	if( _ua.Tablet || _ua.Mobile ) {
		$('#topSlider').slick({
			slidesToShow: 1,
			centerMode: false,
			autoplay: true,
			autoplaySpeed: 3500,
			speed: 440,
			draggable: true,
			arrows: false,
			dots: false
		});
	} else {
		$('#topSlider').slick({
			slidesToShow: 1,
			centerMode: false,
			autoplay: true,
			autoplaySpeed: 3500,
			speed: 440,
			draggable: false,
			arrows: false,
			dots: false
		});
	}
});