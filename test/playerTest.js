var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;
var Player = require('../library/player.js').Player;
var Coin = require('../library/coinLogic.js').lib.Coin;

describe('Player',function() {
	it('has fields name,color,kill,coins',function() {
		var player = new Player('samantha','red');
		expect(player).to.have.keys('name','color','coins','kill');
		expect(player).to.have.property('kill').and.equal(0);
	});
	it('has 4 coins',function() {
		var player = new Player('samantha','red');
		expect(player.coins).to.have.length(4);
		expect(player.coins[0]).to.be.instanceof(Coin);
	});
})
