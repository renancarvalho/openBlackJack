var app 					= require('express')();
var http  				= require('http').Server(app);
var io 						= require('socket.io')(http);
var _ 						= require('underscore');
var serveStatic   = require ('serve-static');
var Game 					= require('./entites/game.js');

app.use(serveStatic (__dirname + '/front', { 'index': 'index.html' }));
console.log(__dirname)
http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection',function(socket){
	console.log("connected");
	debugger;
	var game = new Game(["fake1","fake2"]);
	socket.on("newGame",function () {
		Adone = [];
		users = [];
	})
	socket.on("newCard", function(user){
		console.log(user);
		socket.emit("card", game.buyCard(user))
	});
	socket.on("done",function (user) {
		socket.emit("end",userRestult);
		io.sockets.emit("ENDGAME", winnerPoints, winnerName);
	});
});