var Backbone 				= require('Backbone');
var Template 				= require('./template/gameTemplate.handlebars');
var CardTemplate 		= require('./template/card.handlebars');

module.exports = Backbone.View.extend({
	initialize: function (options) {
		this.model = options.model;
		this.el = options.el;
		this.model.on('newCard', this.renderCard, this);
		this.model.on('pontuation', this.renderPontuation, this);
		this.model.on('showWinner', this.renderWinner, this);
		this.render();
	},
	events: {
		"click #newCard":"buyNewCard",
		"click #done":"done"
	},
	buyNewCard:function () {
		this.model.buyNewCard();
	},
	done:function () {
		this.model.done();
	},
	render:function () {
		this.$el.html(Template(this.model.toJSON()))
	},
	renderCard:function (card) {
		$('#cards').append(CardTemplate(card))
	},
	renderPontuation:function (pontuation) {
		$('h2').append(pontuation)
		$("#newCard").hide();
		$("#done").hide();
	},
	renderWinner:function (winner) {
		alert(winner);
		this.model.newGame();
		this.render();
	}
});

