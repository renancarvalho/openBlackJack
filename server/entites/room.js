
var _ 		= require('underscore');

function Room (user) {
	this.rooms = [];
}

Room.prototype.addUserToSpecificRoom = function (user, roomName) {
	var room;
	// this.checkIfRoomIsFull();
	var roomInfo = this.getRoomInfo(roomName);

	if (roomInfo.usersCount === 0) {
		room = {"roomName":roomName, "users":[user]}
		this.rooms.push(room);
	} 
	if (roomInfo.usersCount === 1) 
	{
		this.addUserToRoom(user, roomName);
	}
};

Room.prototype.addUserToRoom = function (user,roomName) {
	_.each(this.rooms, function (item) {
		if(item.roomName === roomName) {
			item.users.push(user);
		}
	});
};

Room.prototype.getRoomInfo = function (roomName) {

	var info = {"usersCount": 0};
	_.each(this.rooms, function (item) {
		if(item.roomName === roomName) {
			info = {"usersCount": item.users.length}
		}
	});
	console.log("infoooooo", info);
	return info;
};

Room.prototype.checkIfRoomIsFull = function (roomName) {
	_.each(this.rooms, function (item) {
		if(item.name === roomName && item.users.length === 2) {
			throw 'Full Room';
		}
	});
};

Room.prototype.getUsersInRoom = function (roomName) {
	var users = [];
	_.each(this.rooms, function (item) {
		if(item.roomName === roomName) {
			users = item.users
		}
	});
	return users;
};

module.exports = Room;