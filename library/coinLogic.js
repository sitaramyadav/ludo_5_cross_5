var lib = {};
exports.lib = lib;


var coinMoving = function(currentValue){

}

// var coinMoving = function(currentPosition){
// 	var cv = currentPosition[0].toString()+currentPosition[1];
// 	var currentID = document.querySelector('#'+currentPosition);
// 	var x = currentPosition[0]; y = currentPosition[1];
// 	var myInterval = setInterval(function(){
//       (x>nextPosition[0])?y++:x++;
//       element.setAttribute('transform', "translate("+x+" "+y+")");
//       if(y>nextPosition[1])
//         clearInterval(myInterval);  
//     },10)
// }

lib.Coin = function(colour,id){
	this.colour = colour;
	this.position = [0,0];
	this.id = id;
}
lib.Coin.prototype = {
	previousPosition : [0,0],
	move : function(finalPosition){
		this.previousPosition = this.position;
		// coinMoving(this.position,finalPosition);
		this.position = finalPosition; 
	},
	die : function(){
		this.position = [0,0];
	}   
}




    // var coinMoving = function(currentPosition,nextPosition){
    //   var word = {'0':'zero','1':'one','2':'two','3':'three','4':'four'}
    //   var cvX = currentPosition[0].toString();
    //   var cvY = currentPosition[1].toString();
    //   var cv = word[cvX]+word[cvY];
    //   var currentID = document.querySelector('#'+cv);
    //   var x = currentPosition[0]; y = currentPosition[1];
    //   var myInterval = setInterval(function(){
    //       (x>nextPosition[0])?y++:x++;
    //       currentID.setAttribute('transform', "translate("+x+" "+y+")");
    //       if(y>nextPosition[1])
    //         clearInterval(myInterval);  
    //     },10)
    // }