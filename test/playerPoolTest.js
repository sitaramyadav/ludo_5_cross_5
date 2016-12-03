var PlayerPool = require('../library/playerPool');
var assert = require('chai').assert;
var sinon = require('sinon');
var ld = require('lodash');

describe('PlayerPool', function() {
	describe('addPlayer', function() {
		it('can add a player', function() {
			var playerPool = new PlayerPool();
			var username = 'Alex',
				password = 'Alex';
			playerPool.addPlayer(username, password);
			console.log(playerPool.getIdOf(username));
			assert.ok(playerPool.getIdOf(username) != null);
		});
	});

	describe('isUserNameAvailable', function() {
		it('can tell a username is available', function() {
			var playerPool = new PlayerPool();
			var username = 'Alex',
				password = 'Alex';
			assert.ok(playerPool.isUserNameAvailable(username));
			playerPool.addPlayer(username, password);
			assert.notOk(playerPool.isUserNameAvailable(username));
		});
	});

	describe('authenticate', function() {
		it('can authenticate a user', function() {
			var playerPool = new PlayerPool();
			var username = 'Alex',
				password = 'Alex';
			assert.notOk(playerPool.authenticate(username, password));
			playerPool.addPlayer(username, password);
			assert.ok(playerPool.authenticate(username, password));
		});
	});

});
