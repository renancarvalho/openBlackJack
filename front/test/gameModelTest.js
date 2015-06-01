var chai 			= require('chai');
var expect 		= require('chai').expect
var GameModel = require('../js/model/gameModel');
var socket 		= require('socket.io-client');

describe("When the new game is created",function () {

	it("should register the user on the server",function () {
		var model =  new GameModel({user:"fakeUser1"});
		model.registerUser();
		debugger;
		expect(socket).at_least_once;
	});	

});