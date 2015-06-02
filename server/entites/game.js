// var cards = require("./cards");
var _ = require("underscore");
// var cards = require("./cards")

//Todo: remove ir from here.
var cards = {
	"A" : {
		"naipe":"Heart",
		"value":"1",
		"card":"A"
	},
	"2" : {
		"naipe":"Heart",
		"value":"2",
		"card":"2"	

	},
	"3" : {
		"naipe":"Heart",
		"value":"3",
		"card":"3"
	},
	"4" : {
		"naipe":"Heart",
		"value":"4",
		"card":"4"
	},
	"5" : {
		"naipe":"Heart",
		"value":"5",
		"card":"5"

	},
	"6" : {
		"naipe":"Heart",
		"value":"6",
		"card":"6"
	},
	"7" : {
		"naipe":"Heart",
		"value":"7",
		"card":"7"
	},
	"8" : {
		"naipe":"Heart",
		"value":"8",
		"card":"8"
	},
	"9" : {
		"naipe":"Heart",
		"value":"9",
		"card":"9"
	},
	"10" : {
		"naipe":"Heart",
		"value":"10",
		"card":"10"
	},
	"J" : {
		"naipe":"Heart",
		"value":"10",
		"card":"J"
	},
	"Q" : {
		"naipe":"Heart",
		"value":"10",
		"card":"Q"
	},
	"K" : {
		"naipe":"Heart",
		"value":"10",
		"card":"K"
	}
};

function Game (userName) {
	if (userName.length > 2)
		throw "You can only play with two users";
	this.users = userName;
	this.userCards = [];
	this.usersDone = [];
};

Game.prototype.noMoreCardsForMe = function(user) {
	this.usersDone.push(user);
	return this.usersDone.length === 2? true :false;
};

Game.prototype.getUserPontuation = function (userName) {
	var points = 0;
	this.userCards.filter(function(a){
		if(a.user === userName) {
			points += +a.value;
			return points;
		}
	});
	return points;
};

Game.prototype.canBuyACard = function (user) {
	for(var i = 0; i < this.usersDone.length; i++) {
		if (this.usersDone[i] === user)
			throw "You already closed your hand"
	}
	return true;
};

Game.prototype.getUsers = function () {
	return this.users;
};

Game.prototype.buyCard = function(user) {
	if (this.canBuyACard(user)){
		var buyedCard = this.pickRandomCard();
		buyedCard.user = user;
		this.assignCard(user, buyedCard);
		return buyedCard;
	}
};

Game.prototype.assignCard = function (user, card) {
	this.userCards.push(card);
};

Game.prototype.pickRandomCard = function () {
	var result;
	var count = 0;
	for (var prop in cards){
	    if (Math.random() < 1/++count){
	       result = prop;
	    }
	}
  return cards[result];
};

Game.prototype.getWinner = function () {
	var user1 = this.users[0];
	var user2 = this.users[1];
	var winnerName;

	if (this.getUserPontuation(user1) === this.getUserPontuation(user2)){
		return winnerName = "draw"
	}

	winnerName = this.getUserPontuation(user1) > this.getUserPontuation(user2) ? user1 : user2
	this.resetGame();
	return winnerName;
};

Game.prototype.resetGame = function () {//receive a game id in the future to reset the correct table`
	this.userCards = [];
	this.usersDone = [];
};

module.exports = Game;