$(function() {
	$.getJSON('/_files/json/sponsor-list.json', function(json) {
		var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','あ','い','う','え','お','か','が','き','ぎ','く','ぐ','け','げ','こ','ご','さ','ざ','し','じ','す','ず','せ','ぜ','そ','ぞ','た','だ','ち','ぢ','つ','づ','て','で','と','ど','な','に','ぬ','ね','の','は','ば','ぱ','ひ','び','ぴ','ふ','ぶ','ぷ','へ','べ','ぺ','ほ','ぼ','ぽ','ま','み','む','め','も','や','ゐ','ゆ','ゑ','よ','ら','り','る','れ','ろ','わ','を','ん']
		var html = '';
		for(var i=0; i<99; i++) {
			var data = json[chars[i]];
			if(data != undefined) {
				data.sort(function(a, b) {
					if(a.kana < b.kana) return -1;
					if(a.kana > b.kana) return 1;
				});
				var result = generateList(data);
				html += '<h3>' + chars[i] + '</h3>'
					  + '<session class="content-session wide sponsor-list" data-height="' + result.height + '"><div class="list-wrapper">'
					  + result.html
					  + '</div></session>';
			}
		}
		$('.main-area').html(html);
		adsLayouter();
	});

	function generateList(json) {
		if(_ua.Tablet || _ua.Mobile) {
			var plane = [1,1];
			var layout = [[1,1]];
		} else {
			var plane = [1,1,1,1];
			var layout = [[1,1,1,1]];
		}
		var col = 0;
		var skip = [];
		var html = '';
		for(var i=0, ilen=json.length; i<ilen; i++) {
			var item = json[i];
			var size = item.size;
			switch(size) {
				case '11':
					var flag = true;
					if(skip[0]) {
						for(var j=0, jlen=skip.length; j<jlen; j++) {
							var result = insertItem(skip[j], 1, 1, item);
							if(result) {
								if(!~($.inArray(0, layout[skip[j]]))) {
									skip.shift();
								}
								html += result;
								flag = false;
								break;
							}
						}
					}
					// while(flag) {
					for(var z=0; z<10; z++) {
						var result = insertItem(col, 1, 1, item);
						if(!result) {
							pushColumn();
						} else {
							html += result;
							break;
						}
					}
					displayArray(layout, size, col);
					break;
				case '12':
					var flag = true;
					if(skip[0]) {
						for(var j=0, jlen=skip.length; j<jlen; j++) {
							var result = insertItem(skip[j], 1, 2, item);
							if(result) {
								if(!~($.inArray(0, layout[skip[j]]))) {
									skip.splice(j, 1);
								}
								if(!~($.inArray(0, layout[skip[j+1]]))) {
									skip.splice(j+1, 1);
								}
								html += result;
								flag = false;
								break;
							}
						}
					}
					while(flag) {
						var result = insertItem(col, 1, 2, item);
						if(!result) {
							pushColumn();
						} else {
							html += result;
							break;
						}
					}
					displayArray(layout, size, col);
					break;
				case '21':
					while(1) {
						var result = insertItem(col, 2, 1, item);
						if(!result) {
							addSkip();
							pushColumn();
						} else {
							html += result;
							break;
						}
					}
					displayArray(layout, size, col);
					break;
				case '22':
					while(1) {
						var result = insertItem(col, 2, 2, item);
						if(!result) {
							addSkip();
							pushColumn();
						} else {
							html += result;
							break;
						}
					}
					displayArray(layout, size, col);
					break;
				case '24':
					while(1) {
						var result = insertItem(col, 2, 4, item);
						if(!result) {
							addSkip();
							pushColumn();
						} else {
							html += result;
							break;
						}
					}
					displayArray(layout, size, col);
					break;
			}
		}

		function insertItem(c, w, h, data) {
			var part = '';
			var len = _ua.Tablet || _ua.Mobile ?
						w == 1 ? 2 : 1
					  :
					  	w == 1 ? 4 : 3;
			for(var i=0; i<len; i++) {
				if(w == 1 ? layout[c][i] : (layout[c][i] && layout[c][i+1])) {
					var hasLink = data.link != '' && data.link != undefined;
					part += '<div class="sponsor-item" data-width="' + w + '" data-height="' + h + '"'
						  + 'data-posX="' + i + '" data-posY="' + c + '">'
						  + ( hasLink ? '<a class="sponsor-link" href="' + data.link + '" target="_blank">' : '' )
						  + '<img src="/_files/img/sponsor-list/' + data.img + '" alt="' + data.name + '様" title="' + data.name + '様">'
						  + ( hasLink ? '</a>' : '' )
						  + '</div>';
					for(var j=0; j<h; j++) {
						if(!layout[c + j]) {
							layout.push(plane.slice());
						}
						layout[c + j][i] = 0;
						if(w == 2) {
							layout[c + j][i + 1] = 0;
						}
					}
					return part;
				}
			}
			return false;
		}

		function pushColumn() {
			col++;
			if(!layout[col]) {
				layout.push(plane.slice());
			}
		}

		function addSkip() {
			if(~$.inArray(0, layout[col])) {
				skip.push(col);
			}
		}

		return {
			html: html,
			height: layout.length
		};
	}

	function adsLayouter() {
		var rootW = $('.sponsor-list').width();
		var partH = Math.round(rootW * ( _ua.Tablet || _ua.Mobile ? 0.50 : 0.25 ) / Math.sqrt(2));
		for(var i=0, ilen=$('.sponsor-list').length; i<ilen; i++) {
			var $ele = $('.sponsor-list').eq(i);
			var eleH = $ele.data('height');
			$ele.css({
				height: eleH * partH
			})
			for(var j=0, jlen=$ele.find('.sponsor-item').length; j<jlen; j++) {
				var $item = $ele.find('.sponsor-item').eq(j);
				var x = $item.data('posx');
				var y = $item.data('posy');
				var h = $item.data('height');
				$item.css({
					top: y * partH,
					left: x * ( _ua.Tablet || _ua.Mobile ? 50 : 25 ) + '%',
					height: h * partH
				})
			}
		}
	}

	$(window).resize(function() {
		adsLayouter();
	})

});

var displayArray = function(arr,size,idx) {
	var outp = '';
	for(var i=0; i<arr.length; i++) {
		outp += arr[i].join(' ') + "\n";
	}
	console.log(size, idx);
	console.log(outp);
}