# Open BlackJack
This is the open version of the famous game BlackJack (work in progress) built only using javascript, the main idea of this project is to study `socket.io` and `js` in general. 

Here you will probably find more advanced usage of socket.io, like sending messages to a specific socket.id, broadcasting messages, creating rooms (tables) dynamically, seding messages to a specific room and etc. Of course you're invited to help this repo and create a good code base with good examples of socket.io power, but remember this is a work in progress, it's not done yet.

### How to study together or contribute?
Just fork it and create a pull request.

If you could help me with the layout and css, would be awesome :)

### How to run?
1st - go to project path and type `npm install`.

2nd - go to `/server` and type `nodemon app.js`.

3rd - go to `/front` and type `gulp run`

### How to run the tests?
Go to `server/` and run `npm test`.

### Know issues.

* If both users buy the same card, the game is not returning the correct pontuation
* Need to figure how to disconnect from socket/room when the player leaves the game.
* Rebuild the client side project, this one used is just for testing.


### Next steps?

* Build all the client side project, the current one is just for testing.
* Refactor the game.js, the logic that calculates the winner is not reliable.
* Log In with Facebook, twitter and github.

### How to play?

The game is available on this heroku [url](https://infinite-citadel-7060.herokuapp.com/), this is a free heroku's account, so it will probably take a while to load the game. Also the game is not 100% reliable yet, but is possible to play a little bit(with some bugs..heheh)

When you open the game, you just need to write your user name, and a room name. It is only possible to play with a friend, so you need to send to your friend the room name that you create, and of course he/she needs to use this room name in 'room name' field.