var Backbone = require("Backbone");

var Router = Backbone.Router.extend({
	routes:{
		"":"index"
	},
	initialize:function () {
		Backbone.history.start();
	},
	index: function() {
	}
});

module.exports = Router;