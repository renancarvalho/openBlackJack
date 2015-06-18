var Room  			= require('../entites/room');

describe("When a room is created",function () {
	var room;
	beforeEach(function () {
		room = new Room();
	});	

	it("Should be able to add a user to a specific room",function () {
		room.addUserToSpecificRoom('user1','room1');
		expect(room.getUsersInRoom('room1')[0]).toBe('user1');
	});

	it("Should be able to add two users to a specific room",function () {
		room.addUserToSpecificRoom('user1','room1');
		room.addUserToSpecificRoom('user2','room1');
		expect(room.getUsersInRoom('room1').length).toBe(2);
	});

	it("Should not be able to more than two users to a specific room",function () {
		room.addUserToSpecificRoom('user1','room1');
		room.addUserToSpecificRoom('user2','room1');
		expect(function(){room.addUserToSpecificRoom('user3','room1')}).toThrow("Full Room");
	});

})