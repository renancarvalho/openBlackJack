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
	
	socket.on("clearGame",function () {
		users=[];
	});

	socket.on("newGame",function (user) {
		people.push(socket);
		console.log("connected", user);
		users.push(user);
		if (users.length === 2){
			game = new Game(users);
		}
	});

	socket.on("newCard", function(user){
		var newCard = game.buyCard(user)
		//testing how to send message to a specific client. this must be refactored.
		console.log(user,"buying card")
		if (typeof(newCard)==='string'){
			socket.emit("fullhand",newCard)	
		}else {
			var index = people.indexOf(socket);
			if(index===1){
				people[0].emit("opponent:newCard");
			}else{
				people[1].emit("opponent:newCard");
			}
			socket.emit("card", newCard)	
		}
	});

	 socket.on("done",function (user) {
		var userRestult  = game.getUserPontuation(user);
		endgame = game.noMoreCardsForMe(user);
		socket.emit("end",userRestult);
		if (endgame){
			var winnerName = game.getWinner();
			io.sockets.emit("ENDGAME", winnerName, userRestult);
		}
	}.bind(this));
});