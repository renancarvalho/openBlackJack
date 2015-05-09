var Game = require("../entites/game.js");

describe("When creating a new game",function () {
	var game ;
	beforeEach(function(){
		game = new Game(["Renan","Thiago"]);
	});

	it("Should register the user",function(){
		var users = game.getUsers();
		expect(users[0]).toBe("Renan");
	});
	it("Should accept only two players", function(){
		expect(function(){game = new Game(["Renan","Thiago","Andrea"]);}).toThrow("You can only play with two users");
	});
});

describe("When the user buy one card",function () {
	var game;
	var count = 8;
	var card;
	beforeEach(function(){
		game = new Game(["Renan","Thiago"]);
		spyOn(game, "pickRandomCard").andCallFake(function(){
			return "{ 'naipe' : 'Heart', 'value' : "+count+", 'card' : "+count+", 'user' : 'Renan'}";
		});
		card = game.buyCard("Renan");
	});

	it("Should return one random card",function(){
		expect(card).toBe("{ 'naipe' : 'Heart', 'value' : "+count+", 'card' : "+count+", 'user' : 'Renan'}");
	});
	it("Should assign the card to the user",function(){
	    expect(game.userCards).toBeDefined()
	});
	it("Should have the user points",function () {
		spyOn(game, "pickRandomCard").reset();
		vargame.buyCard("Renan");
		expect(game.getUserPontuation("Renan")).toBe("16")
	});
});