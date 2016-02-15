var Coin=function(id,colour) {
	this._id=id;
	this._colour=colour;
	this._position=null;
};

Coin.prototype={
	isSameColourAs:function(otherCoin) {
		return this._colour==otherCoin._colour;
	},
	getPosition	: function(){
		return this._position;
	},
	updatePosition : function(position){
		this._position = position;
	},
	die:function(){
		this._position = null;
	}
};

module.exports=Coin;
