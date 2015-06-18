var app 					= require('express')();
var http  				= require('http').Server(app);
var io 						= require('socket.io')(http);
var serveStatic   = require('serve-static');
var comunicator		= require('./comunicator.js');

app.use(serveStatic ('./' + '../front', { 'index': 'index.html' }));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

comunicator(io);
