var Backbone 		= require('Backbone');
var Template 		= require('./template/UserTemplate.handlebars');
var GameView 		= require('./gameView');
var Model 			= require('../model/gameModel');

var UserView = Backbone.View.extend({
	initialize: function (options) {
		this.el = options.el;		
		this.render();
		this.model = new Model();
	},
	events: {
		"click #play":"newGame",
		"change #user":"setName",
		"change #room":"setRoom"
	},
	setRoom: function (e) {
		this.model.set(e.target.name, e.target.value);
	},
	render: function () {
		this.$el.html(Template());	
	},
	newGame:function (e) {
		new GameView({model: this.model, el:$("#mainGame")})
	},
	setName:function (e) {
		this.model.set(e.target.name, e.target.value);
	}
});

module.exports = UserView;