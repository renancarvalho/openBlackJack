define(['backbone','../../js/model/singleGameCollection'],function(Backbone, GameCollection){

  describe("When instantiated", function(){
  	var gameCollection;
  	var wsSpy;
  	beforeEach(function() {
  		debugger;
  		gameCollection = new GameCollection();  		
  		 wsSpy = jasmine.createSpy();
		spyOn(io, 'connect').and.returnValue(wsSpy);

    });
  	it ("Should connect on the server",function(){
  		expect(wsSpy).toHaveBeenCalled();

  	});
  });
  
});