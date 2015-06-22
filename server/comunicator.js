var Game 					= require('./entites/game.js');
var _ 						= require('underscore');

module.exports = function (io, Room){

	var game;
	var room;
	var usersSocket =[];

	io.sockets.on('connection',function(socket){
		console.log("connected");

		socket.on("game:newGame",function (user, roomName) {
			var usersInRoom = Room.addUserToSpecificRoom(user, roomName,socket);
			users = Room.getUsersInRoom(roomName)
			usersSocket.push({"socket":socket, "roomName":roomName});
			socket.join(roomName)
			if (users.length === 2) {
				game = new Game(users); 	
				io.to(roomName).emit('game:users', users);
			}
		});

		socket.on("player:newCard", function(user, roomName){
			console.log(user, "buying card");
			var newCard = game.buyCard(user);
			if (typeof(newCard)==='string') {				
				socket.emit("player:fullHand",newCard)	
			}
			else {
				var sockets = getSocketsInRoom(roomName)
				var opponent = getOpponent(sockets,socket);
				opponent[0].emit("opponent:newCard");
				socket.emit("player:newCard", newCard);	
			}
		});

		 socket.on("player:done",function (user, roomName) {
		 	debugger;
			var userPontuation  = game.getUserPontuation(user);
			endgame = game.noMoreCardsForMe(user);
			socket.emit("player:noMoreCards", userPontuation);
			if (endgame){
				var winner = game.getWinner();
				io.to(roomName).emit('game:endGame', winner);
			}
		}.bind(this));
	});

	function getSocketsInRoom (roomName) {
		var socketUser = [];
		_.each(usersSocket,function (item) {
			if (item.roomName === roomName) {
				socketUser.push(item.socket);
			}
		});
		return socketUser;
	};

	function getOpponent (sockets,opponent) {
		var opponentUser = _.without(sockets, opponent);
		return opponentUser;
	};
}