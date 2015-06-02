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
io.on('connection',function(socket){
	console.log("connected");
	socket.on("clearGame",function (user) {
		users=[];
	})
	socket.on("newGame",function (user) {
		users.push(user);
		if (users.length===2){
			game = new Game(users);
		}
	})
	socket.on("newCard", function(user){
		console.log(user);
		socket.emit("card", game.buyCard(user))
	});
	 socket.on("done",function (user) {
		var userRestult  = game.getUserPontuation(user);
		endgame = game.noMoreCardsForMe(user);
		socket.emit("end",userRestult);
		if (endgame){
			var winnerName = game.endGame();
			io.sockets.emit("ENDGAME", winnerName);
		}
	}.bind(this));
});