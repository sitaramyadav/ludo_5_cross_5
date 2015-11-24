var board = require('./board.js').module;
var Player = require('./player.js').Player;
var ld = require('lodash');
var lib = {};
exports.lib = lib;

var routes = {
	green : [[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],
				[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[2,2]],
	blue : [[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],
				[2,4],[1,4],[0,4],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[1,1],[1,2],[2,2]],
	red : [[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],
				[4,2],[4,3],[4,4],[3,4],[3,3],[3,2],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[2,2]],
	yellow : [[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],
				[0,2],[0,1],[0,0],[1,0],[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[2,2]]
};
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
	var cell = board.grid[newPosition[0]][newPosition[1]];
	if(cell.coin.length>0 && (cell.isSafe==false)){
		var otherCoin = cell.coin[0];
		otherCoin.die();
		player.kill++;
	}
	coin.move(newPosition);
}
