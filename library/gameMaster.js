var routes = require('./routes.js').routes;
var Player = require('./player.js').Player;
var ld = require('lodash');
var lib = {};
exports.lib = lib;

var colours = ['green','blue','red','yellow'];
var name = ['a','b','c','d'];

lib.createPlayers = function(numOfPlayers){
	var players = [];
	for(var i=0; i<numOfPlayers;i++)
		players.push(new Player(name[i],colours[i]));
	return players;
}

lib.onCoinMove = function(player,coinNum,diceValue,board){
	var coin = player.coins[coinNum] ;
	var route =  routes[player.color];
	var currentIndex = ld.findIndex(route,coin.position);
	currentIndex = (JSON.stringify(coin.position)=='[7,7]')?-1:currentIndex;
	currentIndex=currentIndex+diceValue;
	var newPosition = route[currentIndex];
	var cell = board[newPosition[0]][newPosition[1]];
	if(cell.coin.length>0 && (cell.isSafe==false)){
		var otherCoin = cell.coin[0];
		otherCoin.die();
		player.kill++;
	}
	coin.move(newPosition);
}
