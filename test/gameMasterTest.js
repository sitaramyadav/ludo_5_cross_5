var chai = require('chai');
var lib = require('../library/gameMaster.js').lib;
var board = require('../library/board.js').Board;
var ld = require('lodash');
var assert = chai.assert;
var should = chai.should();
board = new board;
board = board.board;	

describe('master',function(){
	var players = lib.createPlayers(3);
	describe('createPlayer',function(){
		it('createPlayer creates the players on the number given',function(){
			assert.deepEqual(players.length,3);
		})
	})
	describe('onCoinMove',function(){
		it('onCoinMove moves the coin from current position to specified position',function(){
			lib.onCoinMove(players[0],3,6,board);
			assert.deepEqual([1,4],players[0].coins[3].position);
			lib.onCoinMove(players[0],3,2,board);
			assert.deepEqual([0,3],players[0].coins[3].position);
		})
		it('onCoinMove kills the other coin if the place is not in safe zone',function(){
			players[1].coins[2].position = [0,1];
			board[0][1].coin.push(players[1].coins[2])
			players[0].coins[3].position = [0,2];
			lib.onCoinMove(players[0],3,1,board);
			assert.deepEqual([0,1],players[0].coins[3].position);
			assert.deepEqual([7,7],players[1].coins[2].position);
		})
		it('if there is other coin in the position and the place is safe , then it wont kill the other coin .The place holds more than two coins ',function(){
		 	players[1].coins[2].position = [4,2];
			board[4][2].coin.push(players[1].coins[2])
			players[0].coins[3].position = [7,7];
			lib.onCoinMove(players[0],3,1,board);
			assert.deepEqual([4,2],players[0].coins[3].position);
			assert.deepEqual([4,2],players[1].coins[2].position);
		 })
		// it('in safe places there are more than one coins ',function(){
		// 	console.log(board.grid[4][2].coin.length)
		// 	// assert.deepEqual(,2)
		// })
	})
})