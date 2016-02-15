var ld = require('lodash');
var Player = function(name, colour, coins, path) {
  this._name = name;
  this._colour = colour;
  this._coins = coins;
  this._path = path;
  this._kills = 0;
  this._chances = 1;
	this._destinationCoins = 0;
  this._killHappened = false;
};

Player.prototype = {
  move: function(coinId, diceValue) {
    var coinToMove = this.getCoinById(+coinId);
    var coinPosition = coinToMove.getPosition();
    var position = ld.findIndex(this._path, {
      _id: coinPosition
    });
    var previousTile = this._path[position];
    var destinationIndex = (position >= 0) ? position + diceValue : (diceValue == 6) ? 0 : null;
    if (destinationIndex == null)
      return;
    if(destinationIndex > 15 && !this._kills)
      destinationIndex = destinationIndex % 16;
    var tile = this._path[destinationIndex];
    if (tile.canPlaceCoin(coinToMove)) {
      if(previousTile)previousTile.removeCoin(coinToMove);
			if(tile._id == '2,2') this._destinationCoins ++;
      if(tile.placeCoin(coinToMove)){
        this._killHappened = true;
        this._kills++;
      }

      coinToMove.updatePosition(tile._id);
      return true;
    }
  },
  incrementChances: function(){
    this._chances++;
  },
  decrementChances: function(){
    this._chances--;
  },
  getCoinById: function(id) {
    return ld.find(this._coins, {
      _id: id
    });
  },
  hasAnyMoves: function(diceValue) {
    var paths = this._path;
    if (!diceValue)
      return false;
    return this._coins.some(function(coin) {
      var coinPosition = coin.getPosition();
      var position = ld.findIndex(paths, {
        _id: coinPosition
      });
      var destinationIndex = (position >= 0) ? position + diceValue : (diceValue == 6) ? 0 : null;
      if (destinationIndex == null || destinationIndex>24)
        return;
      var tile = paths[destinationIndex];
      return tile.canPlaceCoin(coin);
    });
  }
};

module.exports = Player;
