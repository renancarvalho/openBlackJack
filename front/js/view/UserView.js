var Backbone 		= require('Backbone');
var Template 		= require('./template/UserTemplate.handlebars');
var GameView 		= require('./gameView');
var Model 			= require('../model/gameModel');

var UserView = Backbone.View.extend({
	initialize: function (options) {
		this.el = options.el;		
		this.render();
	},
	events: {
		"click #play":"newGame",
		"change #user":"setName"
	},
	render: function () {
		this.$el.html(Template());	
	},
	newGame:function (e) {
		new GameView({model: this.model, el:$("#mainGame")})
	},
	setName:function (e) {
		this.model = new Model({"user":e.target.value.toString()});
	}
});

module.exports = UserView;