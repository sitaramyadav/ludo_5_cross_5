var Game = require('../library/game');
var assert = require('chai').assert;
var sinon = require('sinon');
var ld = require('lodash');

describe('Game', function(){
	describe('Add Player', function(){
		var game = new Game(2)
		it('can add new player to the game',function(){
	      game.addPlayer('alex');
	      assert.ok(game._players.length == 1);
	      assert.ok(ld.findIndex(game._players,{_name:'alex'})==0);
	    });
	    it('after max players, no other players are added',function(){
	      game.addPlayer('a');
	      game.addPlayer('casper')
	      assert.equal(game._players.length,2);
	      assert.ok(ld.findIndex(game._players,{_name:'casper'})<0);
	    })
	});
	describe("coin movement", function(){
		var game = new Game(2);
		game.addPlayer('alex');
		game.addPlayer('casper');
		it("it should not enter to the board without dice value six", function(){
			var coin = {coinId:1,colour:'yellow'};
			game._diceValue = 2;
			game.moveCoin(coin);
			assert.equal(game._players[1]._coins[0]._position,null);

		});
		it("it should place the coin on the board if the dice value is six", function(){
			var coin = {coinId:5,colour:'blue'};
			game._diceValue = 6;
			game.moveCoin(coin);
			assert.equal(game._players[1]._coins[0]._position,'2,4');

		});
		it("it should place the coin according to the dice value", function(){
			var coin = {coinId:5,colour:'blue'};
			game._diceValue = 2;
			game.moveCoin(coin);
			assert.equal(game._players[1]._path[0]._coins.length,0);
			assert.equal(game._players[1]._coins[0]._position,'0,4');
		});
	});
	describe("kill movement",function(){
		var game = new Game(2);
		game.addPlayer('alex');
		game.addPlayer('casper');
		var coin5 = {coinId:5,colour:'blue'};
		var coin1 = {coinId:1,colour:'yellow'};
		it("the players kill field should increment after killing other player's coin",function(){
			game._diceValue = 6;
			game.moveCoin(coin5);
			game._diceValue = 3;
			game.moveCoin(coin5);
			game._diceValue = 6;
			game.moveCoin(coin1);
			game._diceValue = 7;
			game.moveCoin(coin1);
			assert.equal(game._players[0]._kills,1);
		});
		it("the killed coin position is null",function(){
			assert.equal(game._players[1]._coins[0]._position,null);
		});
		it("the player can enter the innerloop if he has killed a coin of other player",function(){
			game._diceValue = 9;
			game.moveCoin(coin1);
			assert.notEqual(game._players[0]._coins[0]._position,game._players[0]._path[0]._id);
			assert.equal(game._players[0]._coins[0]._position,'3,1');
		});
		it("the player should not enter the innerloop if he did not killed a coin of other player",function(){
			var coin6 = {coinId:6, colour:'blue'};
			game._diceValue = 6;
			game.moveCoin(coin6);
			game._diceValue = 17;
			game.moveCoin(coin6);
			assert.equal(game._players[1]._coins[1]._position,'1,4');
		});
	});
	describe("bonus chances to players", function(){
		var game = new Game(2);
		game.addPlayer('alex');
		game.addPlayer('casper');
		var coin1 = {coinId:1,colour:'yellow'};
		var coin5 = {coinId:5,colour:'blue'};
		it("player turn should change if he doesn't get six when all of his coins are out of board", function(){
			assert.equal(game._currentPlayerIndex,0);
			assert.equal(game._players[0]._chances,1);
			game._diceValue = 2;
			game.validatePlayerChances();
			assert.equal(game._currentPlayerIndex,1);
			assert.equal(game._players[0]._chances,0);
			assert.equal(game._players[1]._chances,1);
		});
		it("player should get one more chance when he get six", function(){
			game._diceValue = 6;
			game.validatePlayerChances();
			game.moveCoin(coin5);
			assert.equal(game._currentPlayerIndex,1);
			assert.equal(game._players[1]._chances,1);
			assert.equal(game._players[0]._chances,0);

		});
		it("player's chance should be removed after rolling dice if he didn't get 6", function(){
			//current player is 1
			game._diceValue = 2;
			game.validatePlayerChances();
			game.moveCoin(coin5);
			// current player is 0
			assert.equal(game._currentPlayerIndex,0);
			assert.equal(game._players[0]._chances,1);
		});
		it("player should get an extra chance to roll dice if he killed other player's coin", function(){
			game._diceValue = 6;
			game.validatePlayerChances();
			game.moveCoin(coin1);
			game._diceValue = 3;
			game.validatePlayerChances();
			game.moveCoin(coin1);
			game._diceValue = 1;
			game.validatePlayerChances();
			game.moveCoin(coin5);
			game._diceValue = 4;
			game.validatePlayerChances();
			game.moveCoin(coin1);
			assert.equal(game._currentPlayerIndex,0);
			assert.equal(game._players[0]._chances,1);
			game._diceValue = 2;
			game.validatePlayerChances();
			game.moveCoin(coin1);
			assert.equal(game._players[1]._chances,1);
			assert.equal(game._currentPlayerIndex,1);
		});
	});	
});
