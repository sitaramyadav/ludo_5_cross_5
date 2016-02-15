var ld = require('lodash');
var SafeTile=function(id) {
	this._id=id;
	this._coins=[];
}

SafeTile.prototype = {
	canPlaceCoin:function(coin) {
		return true;
	},
	placeCoin:function(coin) {
		this._coins.push(coin);
		return false;
	},
	isEqual:function(tile) {
		return this===tile;
	},
	numberOfCoins:function() {
		return this._coins.length;
	},
	removeCoin: function(coin){
		var coinPosition = ld.findIndex(this._coins, {
      _id: coin._id
    });
		this._coins.splice(coinPosition,1);
	}
}

module.exports = SafeTile;
