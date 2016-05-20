console.time('timer')
$(function() {
	// $.getJSON('/_files/json/sponsor-list.json', function(json) {
	// 	var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','あ','い','う','え','お','か','が','き','ぎ','く','ぐ','け','げ','こ','ご','さ','ざ','し','じ','す','ず','せ','ぜ','そ','ぞ','た','だ','ち','ぢ','つ','づ','て','で','と','ど','な','に','ぬ','ね','の','は','ば','ぱ','ひ','び','ぴ','ふ','ぶ','ぷ','へ','べ','ぺ','ほ','ぼ','ぽ','ま','み','む','め','も','や','ゐ','ゆ','ゑ','よ','ら','り','る','れ','ろ','わ','を','ん']
	// 	var html
	// });
	$.getJSON('/_files/json/sponsor-b.json', function(json) {
		var pos = [[0,0,0,0]];
		var colIdx = 0;
		var spIdxs = [];
		for(var i=0, len=json.length; i<len; i++) {
			var size = json[i].size;
			switch(size) {
				case '11':
					var flag = true;
					console.log('11 is ', spIdxs)
					if(spIdxs[0]) {
						for(var j=0; j<spIdxs.length; j++) {
							console.log(spIdxs[j], pos[spIdxs[j]], spIdxs)
							for(var k=0; k<4; k++) {
								if(pos[spIdxs[j]][k] == 0) {
									pos[spIdxs[j]][k] = 1;
									flag = false;
									if(spIdxs[j] && !~$.inArray(0, pos[spIdxs[j]])) {
										spIdxs.shift();
									}
									break;
								}
							}
						}
					// }
					// if(spIdxs[0]) {
					// 	console.log('lost', spIdxs)
					// 	for(var j=0; j<4; j++) {
					// 		if(pos[spIdxs[0]][j] == 0) {
					// 			pos[spIdxs[0]][j] = 1;
					// 			if(spIdxs[0] && !~$.inArray(0, pos[spIdxs[0]])) {
					// 				spIdxs.shift();
					// 			}
					// 			break;
					// 		}
					// 	}
					}
					if(flag) {
						for(var j=0; j<4; j++) {
							if(pos[colIdx][j] == 0) {
								pos[colIdx][j] = 1;
								break;
							}
						}
						if(j == 4) {
							colIdx++;
							if(!pos[colIdx]) {
								pos.push([0,0,0,0]);
							}
							for(var j=0; j<4; j++) {
								// console.log(colIdx, j, pos[colIdx][j])
								if(pos[colIdx][j] == 0) {
									pos[colIdx][j] = 1;
									break;
								}
							}
						}
					}
					displayArray(pos, size, colIdx);
					break;
				case '12':
					var flag = true;
					if(spIdxs[0]) {
						for(var j=0; j<spIdxs.length; j++) {
							console.log(spIdxs[j], pos[spIdxs[j]], spIdxs)
							for(var k=0; k<4; k++) {
								if(pos[spIdxs[j]][k] == 0 && pos[spIdxs[j] + 1][k] == 0) {
									pos[spIdxs[j]][k] = 2;
									pos[spIdxs[j+1]][k] = 2;
									flag = false;
								}
							}
						}
					}
					while(1 && flag) {
						console.log('neeeeeeeeeeeeeeeeeeeew')
						for(var j=0; j<4; j++) {
							if(pos[colIdx][j] == 0) {
								if(pos[colIdx+1]) {
									if(pos[colIdx+1][j] == 0) {
										pos[colIdx][j] = 2;
										pos[colIdx+1][j] = 2;
										break;
									}
								} else {
									pos.push([0,0,0,0]);
									pos[colIdx][j] = 2;
									pos[colIdx+1][j] = 2;
									break;
								}
							}
						}
						if(j > 3) {
							colIdx++;
							if(!pos[colIdx]) {
								pos.push([0,0,0,0]);
							}
						} else {
							break;
						}
					}
					displayArray(pos, size, colIdx);
					break;
				case '21':
				while(1) {
					for(var j=0; j<3; j++) {
						console.log(pos[colIdx][j])
						if(pos[colIdx][j] == 0 && pos[colIdx][j+1] == 0) {
							pos[colIdx][j] = 3;
							pos[colIdx][j + 1] = 3;
							break;
						}
					}
					if(j == 3) {
						if(~$.inArray(0, pos[colIdx])) {
							spIdxs.push(colIdx);
							console.log(spIdxs)
						}
						colIdx++;
						if(!pos[colIdx]) {
							pos.push([0,0,0,0]);
						}
						// for(var j=0; j<3; j++) {
						// 	console.log(pos[colIdx][j])
						// 	if(pos[colIdx][j] == 0 && pos[colIdx][j+1] == 0) {
						// 		pos[colIdx][j] = 1;
						// 		pos[colIdx][j + 1] = 1;
						// 		break;
						// 	}
						// }
					} else {
						break;
					}
				}
					displayArray(pos, size, colIdx);
					break;
				case '22':
					console.log('happpppppppen!!')
					while(1) {
						for(var j=0; j<3; j++) {
							if(pos[colIdx][j] == 0 && pos[colIdx][j+1] == 0) {
								pos[colIdx][j] = 4;
								pos[colIdx][j + 1] = 4;
								if(!pos[colIdx+1]) {
									pos.push([0,0,0,0]);
								}
								pos[colIdx+1][j] = 4;
								pos[colIdx+1][j + 1] = 4;
								break;
							}
						}
						if(j == 3) {
							if(~$.inArray(0, pos[colIdx])) {
								spIdxs.push(colIdx);
							}
							colIdx++;
							if(!pos[colIdx]) {
								pos.push([0,0,0,0]);
							}
						} else {
							break;
						}
					}
					displayArray(pos, size, colIdx);
					break;
				case '24':
					while(1) {
						for(var j=0; j<3; j++) {
							if(pos[colIdx][j] == 0 && pos[colIdx][j+1] == 0) {
								pos[colIdx][j] = 5;
								pos[colIdx][j + 1] = 5;
								if(!pos[colIdx+1]) {
									pos.push([0,0,0,0]);
								}
								pos[colIdx+1][j] = 5;
								pos[colIdx+1][j + 1] = 5;
								if(!pos[colIdx+2]) {
									pos.push([0,0,0,0]);
								}
								pos[colIdx+2][j] = 5;
								pos[colIdx+2][j + 1] = 5;
								if(!pos[colIdx+3]) {
									pos.push([0,0,0,0]);
								}
								pos[colIdx+3][j] = 5;
								pos[colIdx+3][j + 1] = 5;
								break;
							}
						}
						if(j == 3) {
							if(~$.inArray(0, pos[colIdx])) {
								spIdxs.push(colIdx);
							}
							colIdx++;
							if(!pos[colIdx]) {
								pos.push([0,0,0,0]);
							}
						} else {
							break;
						}
					}
					displayArray(pos, size, colIdx);
					break;
			}
		}
	})
});

$(window).load(function() {
	console.timeEnd('timer')
})

var displayArray = function(arr,size,idx) {
	var outp = '';
	for(var i=0; i<arr.length; i++) {
		outp += arr[i].join(' ') + "\n";
	}
	console.log(size, idx);
	console.log(outp);
}