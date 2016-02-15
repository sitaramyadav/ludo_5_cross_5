var ld = require('lodash');

var Dice = function(){};

Dice.prototype = {
	roll : function(){
		return ld.random(1,6);
	},
}

module.exports = Dice;