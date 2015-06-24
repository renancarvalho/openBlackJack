var _ 				= require("underscore");
var deck 			= require("./cards");

function Game (userName) {
	if (userName.length > 2)
		throw "You can only play with two users";
	this.users = userName;
	this.userCards = [];
	this.usersDone = [];
	this.usersWithMoreThan21 = [];
	this.cards = deck;
};

Game.prototype.noMoreCardsForMe = function(user) {
	if (this.usersDone.indexOf(user) === -1) { 
		this.usersDone.push(user);
	}
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
		if (this.usersDone[i] === user) {
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
		this.assignCard(user, boughtCard);
		return boughtCard;
	}
	this.noMoreCardsForMe(user)
	return "This user cannot buy more cards in this turn."
};

Game.prototype.userCanBuyAgain = function (user) {
	if (this.getUserPontuation(user) > 21){
		this.usersDone.push(user);
		this.usersWithMoreThan21.push(user);
		return false;
	}
	return true
};

Game.prototype.assignCard = function (user, card) {
	card.user = user;
	this.userCards.push(card);
};

Game.prototype.pickRandomCard = function () {
	var index = _.random(0, this.cards.length);
	var result = this.cards[index];
	this.cards.splice(index,1);
  return result;
};

Game.prototype.getWinner = function () {
	var user1 = this.users[0];
	var user2 = this.users[1];
	var winner;


	if (this.usersWithMoreThan21.length === 2) {
		return {"winnerName":"Nobody Win", "winnerPontuation": this.getUserPontuation(user1)};
	}

	if (this.getUserPontuation(user1) === this.getUserPontuation(user2)){
		return winnerName = {"winnerName":"Draw", "winnerPontuation": this.getUserPontuation(user1)};
	}

	winner = this.getUserPontuation(user1) > this.getUserPontuation(user2) ? {"winnerName":user1, "winnerPontuation": this.getUserPontuation(user1)} : {"winnerName":user2, "winnerPontuation": this.getUserPontuation(user2)}
	

	this.resetGame();
	return winner;
};

Game.prototype.resetGame = function () {
	this.userCards = [];
	this.usersDone = [];
	this.usersWithMoreThan21 = [];
	this.cards = deck;

};

module.exports = Game;