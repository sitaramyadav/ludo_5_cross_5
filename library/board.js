var ld = require('lodash');
var routes=require('./routes.js').routes;

var grid = function(){
	var grid = ld.fill(Array(25),{coin:[],isSafe:false});
	return ld.chunk(grid,5);
};

var generateIndexs = function(place){
	var array = [];
	for(i in routes){
		array.push(routes[i][place]);
	};
	return array;
};

var gridWithSafeZones = function(grid,points){
	points.forEach(function(x){
		grid[x[0]][x[1]] = {coin:[],isSafe:true};
	});
	return grid;
};

exports.Board=function(){
	this.safeZones = generateIndexs(0);
	this.entryPoints = generateIndexs(15);
	this.board = gridWithSafeZones(grid(),this.safeZones);
};