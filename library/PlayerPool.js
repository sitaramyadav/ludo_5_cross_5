var _ = require('lodash');

var PlayerPool = function() {
	this._counter = new Counter();
	this._players = [new Player(0, 'admin', 'Helpdesk')];
};

PlayerPool.prototype = {
	getIdOf: function(username) {
		var player = _.filter(this._players, {
			'username': username
		})[0];
		return (player) ? player.getId() : null;
	},

	addPlayer: function(username, password) {
		var id = this._counter.incrementAndGet();
		this._players.push(new Player(id, username, password))
	},

	isUserNameAvailable: function(username) {
		var player = _.filter(this._players, {
			username: username
		});
		return !player.length;
	},

	authenticate: function(username, password) {
		var player = _.filter(this._players, {
			'username': username,
			'password': password
		});
		return !!player.length;
	}
};

var Player = function(id, username, password) {
	this.id = id;
	this.username = username;
	this.password = password;
};

Player.prototype = {
	getId: function() {
		return this.id;
	}
};

var Counter = function() {
	this.count = 1;
};

Counter.prototype = {
	incrementAndGet: function() {
		return this.count++;
	}
};

module.exports = PlayerPool;
