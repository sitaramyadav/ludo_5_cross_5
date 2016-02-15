var assert=require('chai').assert;
var Coin=require('../library/coin.js');
var Colours=require("../library/colours.js");

describe("isSameColourAs",function(){
	it("should return true for a coin with the same colour",function(){
		var coin1=new Coin(1,Colours.green);
		var coin2=new Coin(2,Colours.green);
		assert.ok(coin1.isSameColourAs(coin2));
	});
	it("should return false for a coin with different colour",function(){
		var coin1=new Coin(1,Colours.green);
		var coin2=new Coin(2,Colours.red);
		assert.notOk(coin1.isSameColourAs(coin2));
	});

});
