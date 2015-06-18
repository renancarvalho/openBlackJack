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
	beforeEach(function () {
		game = new Game(["Renan","Thiago"]);
	});

	it("Should return the winner name",function () {
		card1 = game.buyCard(game.users[0]);
		card2 = game.buyCard(game.users[1]);		
		winner = +card1.value > +card2.value ? card1 : card2;
		var result = game.getWinner();
		expect(result).toBe(winner.user);
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
	beforeEach(function () {
		game = new Game(["Renan","Thiago"]);
		spyOn(game, "pickRandomCard").andCallFake(function(){
			return {'naipe':'Heart', 'value':'12', 'card':2, 'user':'Renan'},{'naipe':'Heart', 'value':'11', 'card':2, 'user':'Renan'}
		});

		cards = game.buyCard(game.users[0]);
		cards += game.buyCard(game.users[0]);
		cards += game.buyCard(game.users[0]);

		spy = spyOn(game, "canBuyACard").andCallFake(function () {
			//just return false if the user hits more than 21 points
			if (cards.length>2){
				return false;
			}
		});
	});

	it("Should not be able to buy more cards",function () {
		//trying to buy more than 21 points
		game.buyCard(game.users[0]);
		game.buyCard(game.users[0]);
		game.buyCard(game.users[0]);
		// expect(game.userCards.length).toBe(2);
	});
});