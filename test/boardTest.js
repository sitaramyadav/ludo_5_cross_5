var lib = require('../library/board.js').module;
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('board',function(){
	it('grid length in terms of rows',function(){
		assert.equal(5,lib.grid.length);
	});
	it('grid length in terms of columns',function(){
		assert.equal(5,lib.grid[0].length);
		assert.equal(5,lib.grid[1].length);
		assert.equal(5,lib.grid[2].length);
		assert.equal(5,lib.grid[3].length);
		assert.equal(5,lib.grid[4].length);
	});
	it('grid',function(){
		expect(lib.grid[0]).to.include({coin:[],isSafe:false});
		expect(lib.grid[0]).to.include({coin:[],isSafe:true});
	});
	it('cell in grid should have property coin',function(){
		expect(lib.grid[0][0]).to.have.property('coin');
	});
	it('cell in grid should have property isSafe',function(){
		expect(lib.grid[0][0]).to.have.property('isSafe');
	});
	it('safe points in the grid',function(){
		assert.deepEqual([[4,2],[0,2],[2,4],[2,0]],lib.safeZones)
	});
	it('entry points to the inner loop',function(){
		assert.deepEqual([[4,1],[0,3],[3,4],[1,0]],lib.entryPoints);
	});
});
