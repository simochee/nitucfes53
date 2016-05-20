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

app.controller('AppCtrl', function($scope) {
	if(_ua.Mobile || _ua.Tablet) {
		$scope.navigationTmp = '/_files/tmp/sp/header.html';
	} else {
		$scope.navigationTmp = '/_files/tmp/pc/sidebar.html';
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