var ld = require('lodash');
var module = {};
exports.module = module;

var grid = function(){
	var grid=ld.fill(Array(25),{
		coin:[],isSafe:false
	});
	return ld.chunk(grid,5)
};

module.routes = {
	green : [[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],
				[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[2,2]],
	blue : [[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],
				[2,4],[1,4],[0,4],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[1,1],[1,2],[2,2]],
	red : [[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],
				[4,2],[4,3],[4,4],[3,4],[3,3],[3,2],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[2,2]],
	yellow : [[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],
				[0,2],[0,1],[0,0],[1,0],[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[2,2]]
};
var generateIndexs = function(place){
	var array = [];
	for(i in module.routes){
		array.push(module.routes[i][place]);
	};
	return array;
};

var giveEntryPoints = function(){
	return generateIndexs(15);
};

var gridWithSafeZones = function(grid,points){
	points.forEach(function(x){
		grid[x[0]][x[1]] = {
		coin:[],isSafe:true
		};
	});
	return grid;
};

module.safeZones = generateIndexs(0);
module.entryPoints = giveEntryPoints();
module.grid = gridWithSafeZones(grid(),module.safeZones);
