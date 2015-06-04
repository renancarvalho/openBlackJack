var Backbone 						= require('Backbone');
var Template 						= require('./template/gameTemplate.handlebars');
var CardTemplate 				= require('./template/card.handlebars');
var FakeCardTemplate 		= require('./template/fakeCard.handlebars');


//decouple this view, this is just testing..
module.exports = Backbone.View.extend({
	initialize: function (options) {
		this.model = options.model;
		this.el = options.el;
		this.model.on('newCard', this.renderCard, this);
		this.model.on('pontuation', this.renderPontuation, this);
		this.model.on('showWinner', this.renderWinner, this);
		this.model.on('fullhand', this.renderServerMsg, this);
		this.model.on('opponent:boughtNewCard', this.renderOpponentCard, this);
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
		this.$('#cards').append(CardTemplate(card))
	},
	renderServerMsg:function (msg) {
		this.$(".msg").html(msg);
	},
	renderPontuation:function (pontuation) {
		this.$('h2').append(pontuation)
		this.$("#newCard").hide();
		this.$("#done").hide();
	},
	renderOpponentCard:function () {
		debugger;
		this.$("#otherCards").append(FakeCardTemplate())
	},
	renderWinner:function (winner, pontuation) {
		alert(winner +" won "+ pontuation +" points ");
		this.model.newGame();
		this.render();
	}
});