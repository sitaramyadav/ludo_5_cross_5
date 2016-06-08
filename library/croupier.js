var ld = require('lodash');

var Croupier = function(Game) {
  this._games = [];
  this.Game = Game;
}

Croupier.prototype = {
  addGame: function(size, name) {
    var id = this._games.length + 1;
    var game = new this.Game(+size, id);
    game.addPlayer(name);
    this._games.push(game);
    return id;
  },
  getAvailableGames: function(handler) {
    var games = [];
    for (game of this._games) {
      if (game._size - game._players.length)
        games.push(handler(game));
    }
    return games;
  },
  getGameById: function(id) {
    return ld.find(this._games, {
      _id: +id
    });
  },
  endGame: function(id) {
    var indexOfGame = ld.findIndex(this._games, this.getGameById(id));
    if (indexOfGame != -1)
      this._games.splice(indexOfGame, 1);
  }
}

module.exports = Croupier;
