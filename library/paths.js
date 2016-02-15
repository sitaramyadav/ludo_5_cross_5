var ld=require("lodash");
var UnsafeTile=require("./unsafeTile.js");
var SafeTile=require("./safeTile.js");

var Paths={};

var createKey=function(x,y) {
	return [x,y].join(",");
}

var generateBoard=function(size) {
	var board={};
	for (var i = 0; i < size; i++) {
		for (var j=0; j < size; j++) {
			var key=createKey(i,j);
			board[key]=new UnsafeTile(key);
		}
	}
	var midPoint=Math.floor(size/2);
	var midPoints=[[0,midPoint],[midPoint,midPoint],
								 [midPoint,0],[size-1,midPoint],[midPoint,size-1]];
	midPoints.forEach(function(point){
		var key=createKey(point[0],point[1])
		board[key]=new SafeTile(key);
	});
	return board;
}

var directions=[[0,1],[-1,0],[0,-1],[1,0]];

var nextPoint=function(point,offset) {
	return [point[0]+offset[0],point[1]+offset[1]];
}

var isPointOutside=function(point,size) {
	return point[0]<0 || point[0]>=size || point[1]<0 || point[1]>=size;
}

var isVisited=function(path,point) {
	return ld.findIndex(path,point)>=0;
}

var generatePath=function(point,size,path,directionIndex) {
	path.push(point);
	if(path.length==(size*size))
		return;
	var newPoint=nextPoint(point,directions[directionIndex]);
	while(isPointOutside(newPoint,size)||isVisited(path,newPoint)) {
		directionIndex=(directionIndex+1)%directions.length;
		newPoint=nextPoint(point,directions[directionIndex]);
	}
	generatePath(newPoint,size,path,directionIndex);
}

var masterPath=function(size) {
	var startPoint=[4,2];
	var path=[];
	generatePath(startPoint,size,path,0);
	return path;
}

var rotater=function(max) {
	return function(point) {
		return [max-point[1],point[0]];
	}
}

Paths.generate=function(size) {
	var board=generateBoard(5);
	var rotatePath=rotater(4);
	var firstPath=masterPath(5);
	var secondPath=firstPath.map(rotatePath);
	var thirdPath=secondPath.map(rotatePath);
	var fourthPath=thirdPath.map(rotatePath);
	return [firstPath,secondPath,thirdPath,fourthPath].map(function(path){
		return path.map(function(point){
			return board[point.join(",")];
		})
	});
}

module.exports=Paths;
