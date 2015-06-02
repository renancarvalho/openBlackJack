var Backbone 		= require('Backbone');
var socket	 		= io();

module.exports = Backbone.Collection.extend({
	updateHand:function (card) {
		this.add(card)
	}
});