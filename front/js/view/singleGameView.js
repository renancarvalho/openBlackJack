define(['jquery','backbone','hb!../view/template/SingleGame.tpl','hb!../view/template/card.tpl','socketio'],
	function($, Backbone, Template, CardTemplate,io) {
		var SingleGameView = Backbone.View.extend({
		    initialize : function(options){
		    	//simple test
		    	this.el = options.el;
		    	this.socket = io.connect('http://127.0.0.1:3000');
		    	this.on("newCard",function (data) {
		    		this.renderNewCard(data);
		    	});
		    	this.socket.on('chat',function  (data) {
		    		console.log(data)
		    		this.trigger("newCard",data);
		    	}.bind(this));
		    	this.render();
		    },
		    events:{
		    	"click .newCard":"newCard"
		    },
		    newCard:function() {
		    	this.socket.emit('newCard',"New card");
		    },
		    render:function () {
				this.$el.html(Template());		    	
		    },
		    renderNewCard:function (card) {
		    	this.$('.cards').append(CardTemplate(new Backbone.Model({"number":card.split("-")[0],"naipe":card.split("-")[1]}).toJSON()));		    		
		    }

		});
		return SingleGameView;
	}
);