var ld = require('lodash');
var Coin = require('../library/coin.js');
var assert=require('chai').assert;
var sinon = require('sinon');
var Player=require('../library/player.js');
var paths = require("../library/paths.js");
var allPaths = paths.generate(2);

describe("move",function(){
  it("should be able to move a coin by one position",function(){
  	var coin = new Coin(1,'green');
  	var coins = [];
    coins[1]=coin;
    var tile2={placeCoin:function(){}};
    var spy=sinon.spy(tile2,"placeCoin");
    var path=[tile2];
    var player=new Player("Sarath","green",coins,path);
    var coinId = ld.findIndex(coins,{_id:1});
    player.move(coinId,2);
    assert.equal(coin._position,null);
  });
  describe("hasAnyMoves", function(){
    var path = allPaths[0];
    var coin = new Coin(1,'green');
    var coins = [];
    coins[1]=coin;
    var player = new Player("kappa", "green", coins, path);
    it("should give false when the coin is out of board", function(){
      player.move(coin._id,2);
      assert.notOk(player.hasAnyMoves(2));
    });
    it("should give true when the coin is out of board and dice value is 6", function(){
      player.move(coin._id,6);
      assert.ok(player.hasAnyMoves(6));

    });
    it("should give false when the coin is on the board and out of moves", function(){
      assert.notOk(player.hasAnyMoves(25));
    });

  });
});
