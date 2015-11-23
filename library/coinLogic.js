var lib = {};
exports.lib = lib;

lib.Coin = function(colour,id){
	this.colour = colour;
	this.position = [0,0];
	this.id = id;
}

lib.Coin.prototype = {
	previousPosition : [0,0],
	move : function(finalPosition){
		this.previousPosition = this.position;
		this.position = finalPosition;
	},
	die : function(){
		this.position = [0,0];
	}   
}
