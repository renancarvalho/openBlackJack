var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Welcome to Open BackJack</h1>');
});


var cards = [
				"A-heart",
				"2-heart",
				"3-heart",
				"4-heart",
				"5-heart",
				"6-heart",
				"7-heart",
				"8-heart",
				"9-heart",
				"10-heart",
				"J-heart",
				"Q-heart",
				"K-heart",
				"A-heart",
				"A-gold",
				"2-gold",
				"3-gold",
				"4-gold",
				"5-gold",
				"6-gold",
				"7-gold",
				"8-gold",
				"9-gold",
				"10-gold",
				"J-gold",
				"Q-gold",
				"K-gold",
				"A-gold"
			];

getNewCard = function () {
	return cards[Math.floor(Math.random()*cards.length)]
};
io.on('connection',function(socket){

	console.log("connected");
	socket.on("newCard", function(message){
		console.log(message);
		socket.emit("chat",getNewCard())
	});
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
