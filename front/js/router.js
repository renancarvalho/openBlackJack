// var socket = io();
var UserView			= require("./view/UserView");

var Router = Backbone.Router.extend({
	routes:{
		"":"newGame"
	},
	initialize:function () {
		Backbone.history.start();
	},
	newGame: function() {
		new UserView({el:$("#mainGame")});
		// this.socket = io.connect('http://127.0.0.1:3000');
		// this.socket.on("card",function (data) {
  	// 		// this.renderNewCard(data);
  	// 	});
  	// 	this.socket.emit('newCard',"New card");
	}
});

module.exports = Router;