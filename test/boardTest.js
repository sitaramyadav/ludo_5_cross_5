var lib = require('../library/board.js').module;
var chai = require('chai');
var assert = chai.assert;

describe('board',function(){
	it('grid',function(){
		var expected = [[undefined,undefined,'safe zone',undefined,undefined],
						[undefined,undefined,undefined,undefined,undefined],
						['safe zone',undefined,undefined,undefined,'safe zone'],
						[undefined,undefined,undefined,undefined,undefined],
						[undefined,undefined,'safe zone',undefined,undefined]];
		assert.deepEqual(expected,lib.grid);
	});
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
	it('safe points in the grid',function(){
		assert.deepEqual([[4,2],[0,2],[2,4],[2,0]],lib.safeZones)
	});
	it('entry points to the inner loop',function(){
		assert.deepEqual([[4,1],[0,3],[3,4],[1,0]],lib.entryPoints);
	});
});
