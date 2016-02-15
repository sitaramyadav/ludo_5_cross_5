var Croupier = require('../library/croupier');
var Game = require('../library/game');
var assert = require('chai').assert;
var sinon = require('sinon');
var ld = require('lodash');
describe("Croupier", function() {
  describe("addGame", function() {
    var croupier = new Croupier(Game);
    it("should add new game with 1 player ", function() {
      croupier.addGame(4, 'jhony');
      var games = croupier._games;
      assert.ok(games.length, 1);
      assert.ok(games[0]._size, 4);
      assert.ok(games[0]._players.length, 1);
    });

    describe("getGameById", function() {
      it("gives the game of particular id", function() {
        var games = croupier._games;
        var game = croupier.getGameById('1');
        assert.ok(game._id, 1);
      });
    });

    describe('getAvailableGames', function() {
      it('gives all games with filtered fields', function() {
        croupier.addGame(2, 'guss');
        var handler = sinon.stub().returns({});
        handler = sinon.spy();
        var games = croupier.getAvailableGames(handler);
        assert.ok(games.length, 2);
        assert.ok(handler.calledTwice);
      });
    });
  });
});
