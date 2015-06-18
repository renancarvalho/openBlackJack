var Game 					= require('./entites/game.js');
var _ 						= require('underscore');

module.exports = function (io, Room){

	var game;
	var room;

	io.sockets.on('connection',function(socket){
		console.log("connected");


		socket.on("game:newGame",function (user, roomName) {
			var usersInRoom = Room.addUserToSpecificRoom(user, roomName);
			users = Room.getUsersInRoom(roomName)
			socket.join(roomName)
			if (users.length === 2){
				game = new Game(users); 	
				io.to(roomName).emit('game:users', users);
			}
		});

	// 	socket.on("player:newCard", function(user, roomName){
	// 		console.log(user, "buying card");
	// 		var newCard = game.buyCard(user);
	// 		if (typeof(newCard)==='string'){
	// 			socket.emit("player:fullHand",newCard)	
	// 		}
	// 		else {
	// 			var opponent = getOpponent(socket);
	// 			opponent[0].emit("opponent:newCard");
	// 			socket.emit("player:newCard", newCard);	
	// 		}
	// 	});

	// 	 socket.on("player:done",function (user, roomName) {
	// 		var userPontuation  = game.getUserPontuation(user);
	// 		endgame = game.noMoreCardsForMe(user);
	// 		socket.emit("player:noMoreCards",userPontuation);
	// 		if (endgame){
	// 			var winnerName = game.getWinner();
	// 			io.sockets.emit("game:endGame", winnerName, userPontuation);
	// 		}
	// 	}.bind(this));
	});

	// function getOpponent (opponent) {
	// 	var opponentUser = _.without(people, opponent);
	// 	return opponentUser;
	// };
}