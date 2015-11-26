var toCell = function(cell,j){
	return '<td id="'+ i + j +'">' +  + '</td>';
}

var toRow = function(row,i){
	return '<tr>' + row.map() + '</tr>';
};

var generateTable = function(board){
	console.log(board);
	return '<table>' + board.map(toRow).join(' ') + '</table>';
};

var postGameRequest = function() {
	document.querySelector('#form').style.display = 'none';
	document.querySelector('#load').style.display = 'block';
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4 && req.status == 200){
			var board = JSON.parse(req.responseText);
			console.log(generateTable(board));
			document.querySelector('#id01').style.display = 'none';
			document.querySelector('#grid').innerHTML = generateTable(board);
		};
	};
	req.open('POST', 'register', true);
	req.send('name=' + document.querySelector('input[name="name"]').value);
};

window.onload = function() {
	document.querySelector('#register').onclick = postGameRequest;
};