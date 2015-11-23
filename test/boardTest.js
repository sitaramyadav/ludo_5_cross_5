var lib = require('../library/board.js');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('board',function(){
	var grid=new lib.Board();
	it('grid length in terms of rows',function(){
		assert.equal(5,grid.board.length);
	});
	it('grid length in terms of columns',function(){
		assert.equal(5,grid.board[0].length);
		assert.equal(5,grid.board[1].length);
		assert.equal(5,grid.board[2].length);
		assert.equal(5,grid.board[3].length);
		assert.equal(5,grid.board[4].length);
	});
	it('grid',function(){
		expect(grid.board[0]).to.include({coin:[],isSafe:false});
		expect(grid.board[0]).to.include({coin:[],isSafe:true});
	});
	it('cell in grid should have property coin',function(){
		expect(grid.board[0][0]).to.have.property('coin');
	});
	it('cell in grid should have property isSafe',function(){
		expect(grid.board[0][0]).to.have.property('isSafe');
	});
	it('safe points in the grid',function(){
		assert.deepEqual([[4,2],[0,2],[2,4],[2,0]],grid.safeZones)
	});
	it('entry points to the inner loop',function(){
		assert.deepEqual([[4,1],[0,3],[3,4],[1,0]],grid.entryPoints);
	});
});
