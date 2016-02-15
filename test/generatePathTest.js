var assert=require('chai').assert;
var Paths=require('../library/paths.js');
var Coin=require('../library/coin.js');
var Colours=require('../library/colours.js');

var paths;
var coin1;
var coin2;

beforeEach(function(){
	paths=Paths.generate();
	coin1=new Coin(1,Colours.green);
	coin2=new Coin(2,Colours.green);
});

describe("generatePath",function(){
	describe("safe Tile",function() {
		it("should create all safe tiles for the first player",function(){
			var path=paths[0];
			var safeTiles=[0,4,8,12,24];
			safeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.ok(tile.canPlaceCoin(coin2));
			});
		});
		it("should create all safe tiles for the second player",function(){
			var path=paths[1];
			var safeTiles=[0,4,8,12,24];
			safeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.ok(tile.canPlaceCoin(coin2));
			});
		});
		it("should create all safe tiles for the third player",function(){
			var path=paths[2];
			var safeTiles=[0,4,8,12,24];
			safeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.ok(tile.canPlaceCoin(coin2));
			});
		});
		it("should create all safe tiles for the fourth player",function(){
			var path=paths[3];
			var safeTiles=[0,4,8,12,24];
			safeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.ok(tile.canPlaceCoin(coin2));
			});
		});
	});
	describe("unsafe tile",function(){
		it("should create the first and last unsafe tile for the first player",function(){
			var path=paths[0];
			var unsafeTiles=[1,23];
			unsafeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.notOk(tile.canPlaceCoin(coin2));
			});
		});
		it("should create the first and last unsafe tile for the second player",function(){
			var path=paths[1];
			var unsafeTiles=[1,23];
			unsafeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.notOk(tile.canPlaceCoin(coin2));
			});
		});
		it("should create the first and last unsafe tile for the third player",function(){
			var path=paths[2];
			var unsafeTiles=[1,23];
			unsafeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.notOk(tile.canPlaceCoin(coin2));
			});
		});
		it("should create the first and last unsafe tile for the fourth player",function(){
			var path=paths[3];
			var unsafeTiles=[1,23];
			unsafeTiles.forEach(function(index) {
				var tile=path[index];
				assert.ok(tile.canPlaceCoin(coin1));
				tile.placeCoin(coin1)
				assert.notOk(tile.canPlaceCoin(coin2));
			});
		});
	});
	describe("path",function(){
		it("last tile of all players should be the same",function(){
			var path=paths[0];
			var lastTile=path[24];
			lastTile.placeCoin(coin1);
			var players=[1,2,3];
			players.forEach(function(player){
				var tile=paths[player][24];
				assert.equal(1,tile.numberOfCoins());
			})
		});
	});
});
