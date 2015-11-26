var toRow = function(row){
	return ['<tr>','<td>', ,'</td>','<td>', , '</td>','<td>', , '</td>','</tr>'].join(' ');
};
var generateTable = function(board){
	return '<table>' + board.map(toRow).join(' ') + '</table>';
};
var postGameRequest = function() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4 && req.status == 200){
			var board = JSON.parse(req.responseText);
			document.querySelector('#grid').innerHTML = generateTable(board);
		};
	};
	req.open('POST', 'register', true);
	req.send('name=' + document.querySelector('input[name="name"]').value);
};

window.onload = function() {
	document.querySelector('#register').onclick = postGameRequest;
};