$(window).load(function() {
	setTimeout(function() {
		prepareContentHeight();
	}, 50);
});

// app.controller('AppCtrl', function($scope) {

// })

var prepareContentHeight = function() {
	var conH = $('#mainArea').height();
	var sdbH = $('#sidebar').height();
	console.log(conH, sdbH)
	if(conH < sdbH) {
		$('#mainArea').height(sdbH);
	} else {
		$('#sidebar').height(conH);
	}
}