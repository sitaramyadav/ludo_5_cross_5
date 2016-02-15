var assert=require('chai').assert;
var sinon = require('sinon');
var UnsafeTile=require('../library/unsafeTile.js');

describe("placeCoin",function(){
  it("should kill an existing coin when a new coin is placed on it",function(){
    var tile=new UnsafeTile(1);
    var coin1={die:sinon.spy()};
    var coin2={};
    tile.placeCoin(coin1);
    tile.placeCoin(coin2);
    assert.ok(coin1.die.calledOnce);
  });
});

describe("canPlaceCoin",function(){
  it("should be able to place coin on an empty tile",function(){
    var tile=new UnsafeTile(1);
    var coin={colour:"green"};
    assert.ok(tile.canPlaceCoin(coin));
  });
  it("should be unable to place coin on tile occupied by coin of same player",function(){
    var tile=new UnsafeTile(1);
    var coin1={colour:"green",isSameColourAs:sinon.stub().returns(true)};
    var coin2={colour:"green"};
    tile.placeCoin(coin1);
    assert.notOk(tile.canPlaceCoin(coin2));
  });
  // it("it should remove coin from the tile after moving",function() {
  //   var coin = {coinId:5,colour:'blue'};
  //   game._diceValue = 2;
  //
  //   game.moveCoin(coin);
  //   assert.equal(game._players[1]._coins[0]._position,'0,4');
  // })
});
