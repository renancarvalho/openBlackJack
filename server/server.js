var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/newgame', function(req, res){
  res.send('<h1>Welcome to Open BackJack</h1>');
});


io.on('connection',function(socket){
	console.log('New user');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
