var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');
var Game = require('./entites/game.js');

app.get('/', function(req, res){
  res.send('<h1>Welcome to Open BackJack</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// calculatePoints = function (user) {

// 	console.log(user, "comprando carta")
// 	var potuation = 0;
// 	var item = users.length;
// 	for (var i = 0; i < item; i++) {
// 		//debugger;
// 		if(user == users[i].split("-")[0]){
// 			if(! +users[i].split("-")[1]){
// 				potuation += +users[i].split("-")[1] == "A" ? 11 : 10;
// 			}
// 			else {
// 				potuation += +users[i].split("-")[1];
// 			}
// 		}
// 		// users.pop(i);
// 	}
// 	Adone.push(user +"-"+ potuation);
// 	return potuation;
// };
// var Adone = [];

// checkEndGame = function (user) {
// 	//debugger;
// 	console.log("end", user)
// 	if (Adone.length === 2) {
// 		return true;
// 	}
// 	else 
// 		false;

// };
// getNewCard = function (user) {
// 	var result = cards[Math.floor(Math.random()*cards.length)];
// 	users.push(user +"-"+result.split("-")[0]);
	
// 	return result;
// };

io.on('connection',function(socket){
	console.log("connected");
	var game = new Game(["Renan","Thiago"]);
	debugger;
	socket.on("newGame",function () {
		Adone = [];
		users = [];
	})
	socket.on("newCard", function(user){
		console.log(user);
		socket.emit("chat",game.buyCard(user))
	});
	socket.on("done",function (user) {
		// var userRestult  = calculatePoints(user);
		socket.emit("end",userRestult);
		// if (checkEndGame()){
		// 	var winnerPoints;
		// 	var winnerName;
		// 	if(+Adone[1].split("-")[1] > +Adone[0].split("-")[1]){
		// 		console.log("here", Adone[1])
		// 		winnerPoints = Adone[1].split("-")[1]
		// 		winnerName = Adone[1].split("-")[0]
		// 	}else{
		// 		winnerPoints = Adone[0].split("-")[1]
		// 		winnerName = Adone[0].split("-")[0]
		// 	}
		// 	console.log(winnerName, winnerPoints)
			io.sockets.emit("ENDGAME", winnerPoints, winnerName);
		});
	});
// /});