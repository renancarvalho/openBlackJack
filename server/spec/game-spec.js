var Game = require("../entites/game");

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
		expect(function(){game = new Game(["Renan","Thiago","Andrea"])}).toThrow("You can only play with two users");
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
});

describe("When the user say that is enougth",function () {
	var game;
	beforeEach(function () {
		game = new Game(["Renan","Thiago"]);
	});
	it("Should be able to finish the game",function () {
		game.noMoreCardsForMe("Renan");
		expect(game.usersDone[0]).toBe("Renan");
	});
	it("Should not be able to buy a card if the user has already finished the game",function() {
		game.noMoreCardsForMe("Renan");
		expect(function(){game.buyCard("Renan")}).toThrow("You already closed your hand");

	});
});

describe("When the game ends",function () {
	var game;
	var winner;
	var params = {
		"cardValue" : 1
	};
	beforeEach(function () {
		game = new Game(["Renan","Thiago"]);
	});

	it("Should return the winner game and pontuation",function () {
		spyOn(game, "pickRandomCard").andCallFake(function(){
			return {'naipe':'Heart', 'value':params.cardValue, 'card':2, 'user':'Renan'};
		});

		card1 = game.buyCard(game.users[0]);
		params.cardValue = 2
		card2 = game.buyCard(game.users[1]);//Winner with 2 points	
		var result = game.getWinner();
		expect(result.winnerName).toBe("Thiago");
		expect(result.winnerPontuation).toBe(2);
	});

	it("Should return a draw message if is draw",function () {
		spyOn(game, "buyCard").andReturn(function(){
			return "{ 'naipe' : 'Heart', 'value' : 5, 'card' : 5, 'user' : 'Renan'}";
		});
		var result = game.getWinner();
		expect(result).toBe("draw");
	});

	it("Should reset the game",function () {
		game.buyCard(game.users[0]);
		game.buyCard(game.users[1]);
		game.getWinner();
		expect(game.userCards.length).toBe(0);
	});
});

describe("When user hit more than 21 points",function () {
	var game;
	var cards;
	var spy;
	beforeEach(function () {
		game = new Game(["Renan","Thiago"]);
		spyOn(game, "pickRandomCard").andCallFake(function(){
			return {'naipe':'Heart', 'value':'10', 'card':2, 'user':'Renan'};
		});
	});

	it("Should not be able to buy more cards",function () {
		game.buyCard("Renan");
		game.buyCard("Renan");
		game.buyCard("Renan");
		expect(game.buyCard("Renan")).toBe("This user cannot buy more cards in this turn.");
	});
});