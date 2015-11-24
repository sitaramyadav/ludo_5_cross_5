var Coin = function(colour,id){
	this.colour = colour;
	this.position = [7,7];
	this.id = id;
	this.previousPosition = [7,7]
}

Coin.prototype = {
	move : function(finalPosition){
		this.previousPosition = this.position;
		this.position = finalPosition;
	},
	die : function(){
		this.position = [7,7];
	}   
}


exports.Coin = Coin;
