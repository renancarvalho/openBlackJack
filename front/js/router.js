var socket = io();

var Router = Backbone.Router.extend({
	routes:{
		"":"index"
	},
	initialize:function () {
		Backbone.history.start();
	},
	index: function() {
		this.socket = io.connect('http://127.0.0.1:3000');
		this.socket.on("card",function (data) {
  		this.renderNewCard(data);
  	});
  	this.socket.emit('newCard',"New card");
	}
});

module.exports = Router;