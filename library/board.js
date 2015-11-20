var ld = require('lodash');
var module = {};
exports.module = module;

var grid = function(){
	return ld.chunk(new Array(25),5);
};

module.routes = {
	player1 : [[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],
				[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[2,2]],
	player2 : [[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],
				[2,4],[1,4],[0,4],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[1,1],[1,2],[2,2]],
	player3 : [[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],
				[4,2],[4,3],[4,4],[3,4],[3,3],[3,2],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[2,2]],
	player4 : [[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],
				[0,2],[0,1],[0,0],[1,0],[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[2,2]]
};

var generateIndexs = function(place){
	var array = [];
	for(i in module.routes){
		array.push(module.routes[i][place]);
	};
	return array;
};

var indexOfSafeZones = function(){
	return generateIndexs(0);
};

var giveEntryPoints = function(){
	return generateIndexs(15);
};

var gridWithSafeZones = function(grid,points){
	points.forEach(function(x){
		grid[x[0]][x[1]] = 'safe zone';
	});
	return grid;
};

module.safeZones = indexOfSafeZones();
module.entryPoints = giveEntryPoints();
module.grid = gridWithSafeZones(grid(),module.safeZones);