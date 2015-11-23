var board = require('./board.js').module;
var lib = {};
exports.lib = lib;

var coinMoving = function(player,currentPosition,finalPosition){
	var currentIndex = board.routes.player.indexOf(currentPosition);
	var finalIndex = board.routes.player.indexOf(finalPosition);
	var path = [];
	for(var i = currentIndex ; i<finalIndex; i++){
		path.push(player[i])
	}
	return path;
}

lib.Coin = function(colour,id){
	this.colour = colour;
	this.position = [0,0];
	this.id = id;
}

lib.Coin.prototype = {
	previousPosition : [0,0],
	move : function(finalPosition){
		this.previousPosition = this.position;
		this.path = coinMoving(this.colour,this.position,finalPosition);
		this.position = finalPosition;
	},
	die : function(){
		this.position = [0,0];
	}   
}
