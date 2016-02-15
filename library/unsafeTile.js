var UnsafeTile=function(id) {
  this._id=id;
  this._coin=null;
}

UnsafeTile.prototype = {
  placeCoin:function(coin) {
    if(this._coin){
      this._coin.die();
      this._coin = coin;
      return true;
    }
    this._coin=coin;
    return false;
  },
  canPlaceCoin:function(coin) {
    if(this._coin && this._coin.isSameColourAs(coin))
      return false;
    return true;
  },
  numberOfCoins:function() {
    return this._coin?1:0;
  },
	isEqual:function(tile) {
		return this===tile;
	},
  removeCoin: function(){
    this._coin = null;
  }

}
module.exports=UnsafeTile;
