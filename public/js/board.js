var stateOfGame;

var move = function() {
  var id = this.id.split('-')[1];
  var colour = this.className.split(' ')[1];
  $.post('/move', {
    coinId: id,
    colour: colour,
    playerName: document.cookie.split(/[=;]/)[1]
  }, update)
}

var updateCoins = function(coins) {
  for (coin of coins) {
    if (coin._position)
      $('#' + coin._position.split(',').join('')).append($('#c-' + coin._id));
    else {
      var temp = Math.ceil(coin._id / 4);
      $('#h' + temp).append($('#c-' + coin._id));
    }
  }
}

var getId = function(id){
  var ids = {yellow:"h1", blue:"h2", red:"h3", green:"h4"};
  return ids[id];
};

var removeClass = function(currentId){
  var ids = ['h1','h2','h3','h4'];
  var colours = ['yellow','blue','red','green'];
  ids.forEach(function(id, i){
      $('#'+id).removeClass(colours[i]);
  });
}

var update = function() {
  $.get('/getStatus', function(data) {
    var name = document.cookie.split(/[=;]/)[1];
		if(data.winner){
      $('#win-modal').addClass('winner-container-show')
      if(name == data.winner._name)
        $('#winner-name').html('Congratulation '+data.winner._name+" you won the game.")
      else
        $('#winner-name').html("you lose"+'<br>'+data.winner._name+" won "+"<br>"+" try next time..");
    }
    $('#username').html(data.player + "'s turn");
    var id = getId(data.colour);
    removeClass(id);
    $('#'+id).addClass(data.colour);
    var name = document.cookie.split(/[=;]/)[1];
    if(name == data.player){
      $('#cut-lbl').html(data.kills);
      $('#final-lbl').html(data.destinationCoins);
      $('#shed-lbl').html(data.homeCoinCount);
    };
    $('.dice-lbl').html(data.diceValue);
    updateCoins(data.coins);
    changeDice(data.diceValue);
  }, 'json')
}

var rollDice = function(dice) {
  $.post('/dice', function(data) {
    $('.dice-lbl').html(data.diceValue);
    changeDice(data.diceValue);
  }, 'json');
}

var changeDice=function(diceValue){
    if(diceValue==undefined)
          return ;
      $('.dice').html('<img src="./images/d'+diceValue+'.gif">');

}

var showPlayersCoins=function(){
  $.post('/getPlayerCoins',function(data){
      $('.player1').html(data.players[0].name);
      $('.player2').html(data.players[1].name);
      if(data.players[2])
        $('.player3').html(data.players[2].name);
      if(data.players[3])
        $('.player4').html(data.players[3].name);
  },'json');
};
var onContinueClick = function () {
	$.post('/endGame',function(data){
		if (data.status) {
			window.location.replace('/chooseGame');
		}
	},'json');
}

var onload = function() {
  $('.dice').click(rollDice);
  $('.coin').click(move);
  showPlayersCoins();
  setInterval(update, 1000);
};

$.ready(onload);
