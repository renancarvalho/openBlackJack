var express       = require('express');
var app 					= express();
var http  				= require('http').Server(app);
var io 						= require('socket.io')(http);
var serveStatic   = require('serve-static');
var comunicator		= require('./comunicator.js');
var path 					= require('path');
var Room 					= require('./entites/room.js');


app.use("/front", express.static(__dirname + '/../front'));

var room = new Room();

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/../front/index.html'));
});

comunicator(io, room);