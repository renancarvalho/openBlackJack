var _ 				= require("underscore");
var cards 		= require("./cards")

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
		if (this.usersDone[i] === user){
			throw "You already closed your hand"
		}
	}
	return this.userCanBuyAgain(user);
};

Game.prototype.getUsers = function () {
	return this.users;
};

Game.prototype.buyCard = function(user) {
	if (this.canBuyACard(user)){
		var boughtCard = this.pickRandomCard();
		boughtCard.user = user;
		this.assignCard(user, boughtCard);
		return boughtCard;
	}
	this.noMoreCardsForMe(user)
	return "This user cannot buy more cards in this turn."
};

Game.prototype.userCanBuyAgain = function (user) {
	if (this.getUserPontuation(user)>21){
		this.usersDone.push(user);
		return false;
	}
	return true
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
	var winner;

	if (this.getUserPontuation(user1) === this.getUserPontuation(user2)){
		return winnerName = "draw"
	}

	winner = this.getUserPontuation(user1) > this.getUserPontuation(user2) ? {"winnerName":user1, "winnerPontuation": this.getUserPontuation(user1)} : {"winnerName":user2, "winnerPontuation": this.getUserPontuation(user2)}
	this.resetGame();
	return winner;
};

Game.prototype.resetGame = function () {
	this.userCards = [];
	this.usersDone = [];
};

module.exports = Game;