var app = angular.module('myapp', []);
var _ua = (function(u){
	return {
		Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
		|| u.indexOf("ipad") != -1
		|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
		|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
		|| u.indexOf("kindle") != -1
		|| u.indexOf("silk") != -1
		|| u.indexOf("playbook") != -1,
		Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
		|| u.indexOf("iphone") != -1
		|| u.indexOf("ipod") != -1
		|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
		|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
		|| u.indexOf("blackberry") != -1
	}
})(window.navigator.userAgent.toLowerCase());
var _site = (function(url) {
	return {
		Web: (url.match(/localhost/)),
		Blog: (url.match(/web/))
	}
})(location.href);
var SPLASH;
var _myColor;

app.controller('AppCtrl', function($scope) {
	if(_ua.Mobile || _ua.Tablet) {
		$scope.navigationTmp = '/_files/tmp/sp/header.html';
		$scope.footerTmp = '/_files/tmp/sp/footer.html';
		$scope.colorDialog = '/_files/tmp/sp/color_dialog.html';
	} else {
		$scope.navigationTmp = '/_files/tmp/pc/sidebar.html';
		$scope.footerTmp = '/_files/tmp/pc/footer.html';
		$scope.colorDialog = '/_files/tmp/pc/color_dialog.html';
	}
	var pathTo = '';
	var globalMenu = [
		{ title: "トップ", class: "top", link: pathTo + "/" },
		{ title: "ご挨拶", class: "greet", link: pathTo + "/greet" },
		{ title: "バザー・展示・バンド紹介", class: "fesguide", link: pathTo + "/fesguide" },
		{ title: "タイムテーブル", class: "timetable", link: pathTo + "/timetable" },
		{ title: "ブログ", class: "blog", link: "http://nitucfes53.blog.fc2.com/" },
		{ title: "協賛", class: "sponsor", link: pathTo + "/sponsor" },
		{ title: "役員紹介", class: "members", link: pathTo + "/members" },
		{ title: "アクセス", class: "access", link: pathTo + "/access" },
		{ title: "お問い合わせ", class: "contact", link: pathTo + "/contact" }
	];
	$scope.menu = globalMenu;
	$scope.ua = _ua.Mobile || _ua.Tablet ? 'sp' : 'pc';
	$scope.site = _site.Web ? 'web' : 'blog';
	$scope.userColors = ["#d6031e", "#fe7702", "#fae103", "#98d909", "#33bb1b", "#97c5ff", "#0250b4", "#931e87", "#191919"];
	setTimeout(function() {
		var cookieColor = $.cookie('mycolor');
		if(cookieColor == undefined) {
			$('.color-dialog').show();
			var loop = mycolorLang();
			colorDialogBG(loop);
		} else {
			$('.color-dialog').remove();
			autoSplash(cookieColor);
		}
	}, 0);

	setTimeout(function() {
		defineClass(_myColor);
		mycolorChanger();
		elemInit();
	}, 0);


});


var util = {
	wait: function(msec) {
		var d = $.Deferred();
		setTimeout(function() {
			d.resolve();
		}, msec);
		return d.promise();
	}
}

var elemInit = function() {
	(function() {
		var url = location.href;
		var urls = url.split('#');
		if(urls[1]) {
			var hash = urls[1].replace('/', '');
			jumpAnchor(hash);
		}
	})();
	function jumpAnchor(hash) {
		var $target = $('#' + hash);
		if($target) {
			var pos = $target.offset().top;
			var winH = $(window).height();
			var tarH = $target.height();
			if(winH < tarH) {
				var scrollY = pos - 80;
			} else {
				var scrollY = pos - (winH / 2 - tarH / 2);
			}
			$('body,html').animate({
				scrollTop: scrollY
			}, 400, 'swing');
		}
	}
	$('.jumpPageTop').click(function(e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop: 0
		}, 400, 'swing');
	});
	$('[href^="#"]:not(a[href="#"])').click(function(e) {
		e.preventDefault();
		var hash = $(this).attr('href').replace('#', '');
		jumpAnchor(hash);
	})
}

var defineClass = function(color) {
	$('.myc-color').css({
		color: color
	});
}
var makeSplash = function(root, name) {
	var svg = 'M 13.83,96.16 C 13.51,77.83 41.26,80.73 40.78,97.45 39.89,110.72 14.16,114.50 13.83,96.16 Z M 50.27,85.07 C 50.43,78.56 62.25,78.07 62.65,86.03 63.06,93.99 50.11,93.19 50.27,85.07 Z M 76.17,49.05 C 75.92,39.64 89.20,40.20 89.44,47.92 89.68,55.64 76.41,58.45 76.17,49.05 Z M 100.86,13.51 C 100.54,4.18 119.12,2.41 119.52,14.39 119.92,26.37 101.50,26.53 100.86,13.51 Z M 126.51,5.23 C 126.19,-1.53 136.73,-1.69 137.05,5.87 137.13,13.99 127.00,12.46 126.51,5.23 Z M 149.76,14.55 C 149.60,7.00 136.01,5.47 135.92,14.15 135.92,23.56 149.92,22.11 149.76,14.55 Z M 211.61,13.83 C 211.61,-4.02 237.67,-5.63 237.59,16.00 237.51,37.63 211.61,31.68 211.61,13.83 Z M 252.06,14.07 C 252.14,4.26 264.37,5.07 264.93,14.96 265.50,24.85 251.98,23.88 252.06,14.07 Z M 298.11,69.11 C 299.44,57.41 315.72,58.62 315.36,70.19 314.88,82.50 297.51,80.32 298.11,69.11 Z M 326.46,76.71 C 326.62,65.61 345.44,65.61 345.28,77.35 345.12,89.09 326.30,87.80 326.46,76.71 Z M 313.31,93.71 C 313.19,84.91 325.86,85.63 325.38,93.35 324.89,101.07 313.43,102.52 313.31,93.71 Z M 310.29,110.36 C 310.17,106.74 315.12,106.25 315.00,110.11 314.88,113.97 310.54,113.37 310.29,110.36 Z M 316.93,117.35 C 316.69,109.75 328.87,110.23 329.72,117.95 330.44,124.83 317.41,127.12 316.93,117.35 Z M 351.88,171.18 C 351.07,165.55 359.68,166.04 359.84,170.94 359.60,175.68 353.08,175.93 351.88,171.18 Z M 295.34,218.54 C 295.21,210.94 306.80,210.22 306.55,217.94 306.31,225.66 295.58,225.66 295.34,218.54 Z M 252.63,295.85 C 252.63,291.02 258.66,292.35 258.42,295.85 258.18,299.35 252.63,300.67 252.63,295.85 Z M 282.43,274.38 C 282.67,265.94 293.28,268.71 293.28,274.98 293.28,281.26 282.79,282.22 282.43,274.38 Z M 306.07,273.17 C 305.47,268.23 312.95,267.91 313.79,272.93 314.56,277.88 307.16,278.72 306.07,273.17 Z M 0.08,184.85 C -0.40,178.98 9.01,179.06 9.25,184.53 9.49,190.00 0.56,190.72 0.08,184.85 Z M 14.40,184.37 C 13.75,175.76 26.06,175.85 27.18,184.45 27.75,192.65 15.04,192.97 14.40,184.37 Z M 30.08,209.13 C 28.55,198.60 43.67,198.92 44.80,207.85 45.92,216.77 31.61,218.94 30.08,209.13 Z M 11.98,225.13 C 10.94,214.20 25.17,215.97 25.82,224.09 26.46,232.21 13.03,236.07 11.98,225.13 Z M 28.71,240.33 C 27.75,225.70 47.29,227.14 48.58,239.61 49.87,252.07 29.36,253.60 28.71,240.33 Z M 71.82,248.61 C 70.94,238.96 84.45,238.16 86.22,247.49 87.99,256.81 72.71,258.26 71.82,248.61 Z M 93.86,272.75 C 94.95,282.58 109.60,282.94 109.24,272.69 108.88,262.44 92.77,262.92 93.86,272.75 Z M 213.48,296.21 C 213.78,289.52 223.25,289.82 223.97,295.91 224.76,303.51 213.60,304.23 213.48,296.21 Z M 102.06,53.07 C 88.79,38.47 120.28,13.63 133.07,38.59 137.53,49.69 138.74,55.00 151.77,50.53 164.80,46.07 159.49,44.38 159.49,33.77 159.49,23.16 173.97,25.33 173.00,34.73 172.04,44.14 172.04,47.04 180.36,44.75 198.82,38.47 201.72,41.73 215.15,47.60 228.18,52.99 226.73,44.14 233.89,34.33 245.87,18.33 256.89,38.19 247.88,41.65 238.87,45.11 231.07,57.73 242.98,59.34 267.10,68.34 260.91,76.06 267.02,82.58 273.14,89.09 279.09,91.10 287.37,87.80 302.82,81.37 300.48,96.73 292.84,97.61 285.20,98.50 284.24,103.80 289.30,110.15 294.37,116.51 301.69,129.29 299.60,137.49 293.81,163.14 311.50,145.05 317.45,146.74 332.98,151.32 326.22,165.79 311.18,163.46 296.14,161.13 290.59,174.00 296.54,179.22 313.99,190.56 310.13,204.55 291.72,204.71 273.30,204.87 278.93,215.97 274.50,221.76 270.08,227.55 263.97,233.25 270.08,239.93 276.19,246.60 281.74,240.65 286.65,243.38 301.21,251.99 281.82,268.07 268.15,259.95 258.02,253.68 257.21,242.74 243.70,253.19 232.04,263.89 240.40,263.49 245.39,271.53 252.79,284.95 231.72,296.21 223.91,283.19 218.12,274.26 219.73,267.27 212.82,267.27 202.92,267.18 211.21,275.06 211.37,282.70 211.37,294.68 198.26,291.31 198.26,282.70 198.18,275.87 200.83,269.28 191.58,269.92 184.34,270.56 163.19,271.53 158.28,268.71 153.38,265.90 150.40,267.27 150.24,270.48 150.00,276.11 153.38,273.86 152.82,280.77 152.33,293.32 133.19,288.17 137.61,276.11 140.35,268.31 139.54,260.35 133.27,259.47 127.00,258.58 118.39,254.40 115.58,248.21 109.38,235.18 96.35,275.39 88.55,256.53 81.80,242.02 109.54,244.43 98.08,235.67 92.29,231.08 90.24,223.85 87.83,216.37 83.36,204.43 73.11,219.87 61.17,223.00 40.90,228.19 40.90,202.62 56.10,198.88 71.30,195.14 77.45,187.06 73.23,179.58 68.04,169.57 66.35,151.36 72.39,136.61 77.45,124.23 70.29,122.94 58.23,122.78 49.79,122.38 46.17,106.78 50.75,101.87 66.84,88.85 68.77,120.69 85.78,104.39 102.06,87.00 72.47,91.02 82.70,75.68 94.10,61.81 95.01,91.18 111.29,74.78 119.44,64.04 112.32,64.40 102.06,53.07 Z';
	var svgHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="' + name + ' splash-svg" viewBox="0 0 360 302"></svg>'
	$(root).prepend(svgHTML);
	var splash = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	splash.setAttribute('d', svg);
	splash.setAttribute('fill', 'none');
	$('.' + name)[0].appendChild(splash);
	return $('.' + name);
}

var mycolorLang = function() {
	var $ele = $('#chooseColor .choose-text');
	$ele.attr('data-state', 'hide');
	$ele.eq(1).attr('data-state', 'next');
	$ele.eq(0).attr('data-state', 'active');
	var len = $ele.length;
	var loop = setInterval(function() {
		var $active = $('[data-state="active"]');
		var idx = $active.index();
		if(idx < len - 2) {
			console.log(idx)
			$ele.eq(idx - 1).attr('data-state', 'hide');
			$ele.eq(idx).attr('data-state', 'prev');
			$ele.eq(idx + 1).attr('data-state', 'active');
			$ele.eq(idx + 2).attr('data-state', 'next');
		} else if(idx == len - 2) {
			$ele.eq(idx - 1).attr('data-state', 'hide');
			$ele.eq(idx).attr('data-state', 'prev');
			$ele.eq(idx + 1).attr('data-state', 'active');
			$ele.eq(0).attr('data-state', 'next');
		} else {
			$ele.eq(idx - 1).attr('data-state', 'hide');
			$ele.eq(idx).attr('data-state', 'prev');
			$ele.eq(0).attr('data-state', 'active');
			$ele.eq(1).attr('data-state', 'next');
		}
	}, 3500);
	return loop;
}

var colorDialogBG = function(loop) {
	var splash1 = makeSplash('.color-dialog .dialog-content', 'splash1');
	var splash2 = makeSplash('.color-dialog .dialog-content', 'splash2');
	var flag = true;
	$('.color-btn').hover(function() {
		if(flag) {
			var color = $(this).val();
			$('.color-dialog').css({
				background: color
			});
		}
	}, function() {
		if(flag) {
			$('.color-dialog').delay(1000).css({
				background: '#fff'
			});
		}
	});
	$('.color-btn').click(function() {
		if(flag) {
			var color = $(this).val();
			$('.color-dialog').css({
				background: color
			});
			flag = false;
			clearInterval(loop);
			$.merge(splash1.find('path'), splash2.find('path')).css('fill', color);
			// $.when(
			// 	// splash1.show(),
			// 	// util.wait(300)
			// 	util.wait(0)
			// ).done(function() {
			// 	// splash2.show();
			// 	$('.color-dialog').css({
			// 		opacity: 0
			// 	});
			// 	$.cookie('mycolor', color, { expires: 7 });
			// 	autoSplash(color);
			// });
			splash1.show();
			splash2.delay(200).fadeIn(0);
			$('.color-dialog').css({
				opacity: 0
			});
			autoSplash(color);
		}
	});
}

var myColorInit = function(color) {
	_myColor = color;
	$.cookie('mycolor', color, { expires: 7 });
	$('[name="changeMyColor"][value="' + color + '"]').prop('checked', true);
}

var autoSplash = function(color) {
	var count = 1;
	var old_top;
	myColorInit(color);
	console.log('happen')
	SPLASH = setInterval(function() {
		if(Math.random() > 0.1) {
			console.log('hapen')
			var top = $(window).scrollTop();
			var wH = $(window).height();
			var wW = $(window).width();
			var ele = 'splash-a' + count;
			var $ele = makeSplash('.main-area', ele);
			var w = _ua.Tablet || _ua.Mobile ? 150 : 300;
			$ele.css({
				position: 'absolute',
				top: top + (Math.random() * wH) - w / 2,
				left: Math.random() * wW - w / 2,
				width: (Math.random() + 0.2) * w
			});
			$ele.find('path').css('fill', color);
			if(count > 25) {
				$('.splash-a' + (count-25)).fadeOut(1000, function() {
					$(this).remove();
				});
			}
			old_top = top;
			count++;
		}
	}, 300);
}

var mycolorChanger = function() {
	$('[name="changeMyColor"]').change(function() {
		var color = $(this).val();
		clearInterval(SPLASH);
		$('[class^="splash-a"]').fadeOut(300);
		defineClass(color);
		autoSplash(color);
	})
}