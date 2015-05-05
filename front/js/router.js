define(['jquery','backbone', '../js/view/singleGameView', 'socketio' ],
	function($, Backbone, SingleGameView, io) {
		var Router = Backbone.Router.extend({
		    
		    routes:{
		    	"" : "newGame"
		    },
		   	newGame:function(){
		    	new SingleGameView({el: $(".sigleGame")});
		    },
		    start:function(){
		    	Backbone.history.start();
		    }

		});
		return Router;
	}
);
