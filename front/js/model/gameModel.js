
var Backbone 						= require('Backbone');
var socket	 						= io();


module.exports = Backbone.Model.extend({
	initialize:function (argument) {
		this.socket = io.connect('http://127.0.0.1:3000');
		this.listeningEvents()
		this.socket.emit('newGame',this.get("user"));
	},
	listeningEvents:function (argument) {
		this.socket.on("card",function (data) {
			this.trigger('newCard',data);
		}.bind(this));

		this.socket.on("opponent:newCard",function (data) {
			this.trigger("opponent:boughtNewCard")
		}.bind(this));


		this.socket.on("fullhand",function (msg) {
			this.trigger('fullhand',msg);
		}.bind(this));
		

		this.socket.on("ENDGAME",function (name, pontuation) {
			this.trigger('showWinner', name, pontuation);
		}.bind(this));

		this.socket.on("end",function (data) {
			this.trigger('pontuation',data)
		}.bind(this));
	},
	buyNewCard:function () {
		this.socket.emit('newCard',this.get("user"));
	},
	done:function () {
		this.socket.emit('done',this.get("user"));
	},
	newGame:function () {
		this.socket.emit('clearGame');
	}
});

