
var Backbone 						= require('Backbone');
var HandCollection	 		= require('./handCollection');
var socket	 						= io();


module.exports = Backbone.Model.extend({
	initialize:function (argument) {
		this.socket = io.connect('http://127.0.0.1:3000');
		this.collection = new HandCollection();
		this.listeningEvents()
		this.socket.emit('newGame',this.get("user"));
	},
	listeningEvents:function (argument) {
		this.socket.on("card",function (data) {
			this.collection.updateHand(data)
			this.trigger('newCard',data);
		}.bind(this));

		this.socket.on("ENDGAME",function (data) {
			this.trigger('showWinner',data);
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

