var chai = require('chai');
var Coin = require('../library/coin.js').Coin;
var assert = chai.assert;
var should = chai.should();

describe('coin constructor',function(){
	var coin = new Coin('blue');
	var otherCoin = new Coin('red');

	it('should have only three fields',function(){
		assert.equal(Object.keys(coin).length,3);
	})
	it('has move function',function(){
		assert.isFunction(coin.move);
	})
	it('has die function',function(){
		assert.isFunction(coin.die);
	})
	describe('move function',function(){
		it('moves coin from one cell to other cell',function(){
			assert.deepEqual(coin.position,[0,0]);
			coin.move([2,3]);
			assert.deepEqual(coin.position,[2,3]);
		})
		it('the previous position of coin changes after the execution of move function',function(){
			assert.deepEqual(coin.previousPosition,[0,0]);
			coin.move([5,3]);
			assert.deepEqual(coin.previousPosition,[2,3]);
			assert.deepEqual(coin.position,[5,3]);
		})
	})
	describe('die function',function(){
		it('die kills the object itself and resets its position',function(){
			assert.deepEqual(coin.position,[5,3]);
			coin.die();
			assert.deepEqual(coin.position,[0,0]);
		})
	})
})
