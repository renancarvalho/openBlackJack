
var Backbone 						= require('Backbone');
var socket	 						= io();


module.exports = Backbone.Model.extend({
	start:function () {
		this.socket = io.connect('http://127.0.0.1:3000');
		this.listeningEvents()
		this.socket.emit('game:newGame',this.get("user"), this.get('room'));
	},

	listeningEvents:function () {
		this.socket.on("player:newCard",function (card) {
			this.trigger('newCard',card);
		}.bind(this));

		this.socket.on("opponent:newCard",function (data) {
			this.trigger("boughtNewCard")
		}.bind(this));

		this.socket.on("player:fullHand",function (msg) {
			this.trigger('fullhand',msg);
		}.bind(this));
		
		this.socket.on("game:endGame",function (name, pontuation) {
			this.trigger('showWinner', name, pontuation);
		}.bind(this));

		this.socket.on("player:noMoreCards",function (data) {
			this.trigger('pontuation',data)
		}.bind(this));

		this.socket.on("game:users",function (users) {
			this.trigger('usersInGame',users);
		}.bind(this));
	},
	buyNewCard:function () {
		this.socket.emit('player:newCard',this.get("user"),this.get('room'));
	},
	done:function () {
		this.socket.emit('player:done',this.get("user"),this.get('room'));
	},
	newGame:function () {
		this.socket.emit('game:clearGame');
	}
});

