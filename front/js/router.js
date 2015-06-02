var UserView = require("./view/UserView");

var Router = Backbone.Router.extend({
	routes:{
		"":"newGame"
	},
	initialize:function () {
		Backbone.history.start();
	},
	newGame: function() {
		new UserView({el:$("#mainGame")});
	}
});

module.exports = Router;