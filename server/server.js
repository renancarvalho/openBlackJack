var app 					= require('express')();
var http  				= require('http').Server(app);
var io 						= require('socket.io')(http);
var _ 						= require('underscore');
var serveStatic   = require ('serve-static');
var Game 					= require('./entites/game.js');

app.use(serveStatic ('./' + '../front', { 'index': 'index.html' }));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var users = [];
var game;
var people = [];
io.on('connection',function(socket){
	console.log("connected");
	
	socket.on("game:clearGame",function () {
		users=[];
	});

	socket.on("game:newGame",function (user) {
		people.push(socket);
		console.log("connected", user);
		users.push(user);
		if (users.length === 2){
			game = new Game(users);
		}
	});

	socket.on("player:newCard", function(user){
		var newCard = game.buyCard(user)
		//testing how to send message to a specific client. this must be refactored.
		console.log(user, "buying card")
		if (typeof(newCard)==='string'){
			socket.emit("player:fullHand",newCard)	
		}
		else {
			var opponent = _.without(people, socket);
			opponent[0].emit("opponent:newCard");
			socket.emit("player:newCard", newCard)	
		}
	});

	 socket.on("player:done",function (user) {
		var userPontuation  = game.getUserPontuation(user);
		endgame = game.noMoreCardsForMe(user);
		socket.emit("player:noMoreCards",userPontuation);
		if (endgame){
			var winnerName = game.getWinner();
			io.sockets.emit("game:endGame", winnerName, userPontuation);
		}
	}.bind(this));
});