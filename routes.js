var fs = require('fs');
var ld = require('lodash');
var querystring = require('querystring');
var gm = require('./library/gameMaster.js').lib;

// var template = fs.readFileSync('./templates/canvas.html', 'utf8');

var method_not_allowed = function(req, res){
	res.statusCode = 405;
	console.log(res.statusCode);
	res.end('Method is not allowed');
};
var fileNotFound = function(req, res){
	res.statusCode = 404;
	console.log(res.statusCode);
	res.end('Not Found');
};

var addPlayer = function(req, res){
	var data = '';
	req.on('data', function(chunk){
		data += chunk;
	});
	req.on('end', function(){
		var entry = querystring.parse(data);
		gm.addPlayer(entry.name,req.connection.remoteAddress);
		serveBoard();
	});

};
var serveBoard = function(req, res){
	if(gm.board)
		res.end(JSON.stringify({ready:true,board:lib.board.grid}));
	res.end(JSON.stringify({ready:false}));
}

var serveIndex = function(req, res, next){
	req.url = '/home.html';
	next();
};
var serveStaticFile = function(req, res, next){
	var filePath = './public' + req.url;
	fs.readFile(filePath, function(err, data){
		if(data){
			res.statusCode = 200;
			console.log(res.statusCode);
			res.end(data);
		}
		else{
			next();
		}
	});
};

exports.post_handlers = [
	{path: '^/register$', handler: addPlayer},
	{path: '', handler: method_not_allowed}
];
exports.get_handlers = [
	{path: '^/$', handler: serveIndex},
	{path:'^/board$',handler:serveBoard},
	{path: '', handler: serveStaticFile},
	{path: '', handler: fileNotFound}
];

