var Player = require('./player');
var Dice = require('./dice');
var Path = require('./paths');
var Coin = require('./coin');
var colours = require('./colours');
var ld = require('lodash');

var Game = function(size, id) {
  this._id = id;
  this._players = [];
  this._size = size;
  this._colours = Object.keys(colours);
  this._paths = Path.generate(size);
  this._dice = new Dice();
  this._diceValue = null;
  this._currentPlayerIndex = 0;
  this._winner;
};

var generateCoins = function(count, numOfPlayers, colour) {
  var coins = [];
  var start = (numOfPlayers * count) + 1;
  var end = start + count;
  for (var i = start; i < end; i++)
    coins.push(new Coin(i, colour));
  return coins;
};

Game.prototype = {
  addPlayer: function(name) {
    var playerPosition = this._players.length;
    if (playerPosition >= this._size) return;
    var colour = this._colours.pop();
    var coins = generateCoins(4, playerPosition, colour);
    var player = new Player(name, colour, coins, this._paths[playerPosition]);
    this._players.push(player);
  },
  moveCoin: function(coin) {
    var player = ld.find(this._players, {
      _colour: coin.colour
    });
    var diceValue = this._diceValue;
    this._diceValue = player.move(coin.coinId, diceValue) ? undefined : this._diceValue;
    if(player._destinationCoins == 4) 
      this._winner = player;
    this.changeTurnIfPossible();
  },
  getDiceValue: function() {
    if(this.currentPlayer._chances<1)
      return;
    this._diceValue = this._dice.roll();
    this.validatePlayerChances();
    return this._diceValue;
  },
  validatePlayerChances: function(){
    if(this._diceValue==6)
      this.currentPlayer.incrementChances();
    else
      this.changeTurnIfPossible();
  },
  isReady: function() {
    return (this._size == this._players.length);
  },
  get currentPlayer(){
    return this._players[this._currentPlayerIndex];
  },
  changeTurnIfPossible: function () {
    var currentPlayer = this.currentPlayer;
    if(currentPlayer._killHappened){
      currentPlayer.incrementChances();
      currentPlayer._killHappened = false;
    }
    else
      currentPlayer.decrementChances();
    if(!currentPlayer.hasAnyMoves(this._diceValue) && currentPlayer._chances<=0 && !currentPlayer._killHappened) {
      this._currentPlayerIndex = (this._currentPlayerIndex+1)%this._size;
      this._players[this._currentPlayerIndex]._chances = 1;
    };
  },
  getNamesOfPlayers: function() {
    return this._players.map(function(player) {
      return Player._name;
    });
  },
  getAllCoins: function() {
    var players = this._players;
    var allCoins = [];
    for (var i in players) {
      allCoins = allCoins.concat(players[i]._coins);
    }
    return allCoins;
  },
  setWinner: function(){
    this
  }
};

module.exports = Game;
