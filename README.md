# Open BlackJack
This is the open version of the famous game BlackJack (work in progress) built in JS, the main idea of this project is to study `socket.io` and `js` in general. 

Here you will probably find more advanced usage of socket.io, like sending messages to a specific socket.id, broadcasting messages, creating rooms (tables) dynamically, etc. Of course you're invited to help this repo and create a good code base with good examples of socket.io power, but remember this is a work in progress, it's not done yet.

### How to study together or contribute?
Just fork it and create a pull request.

If you could help me with the layout and css, would be awesome :)

### How to run?
1st - `npm install` 
2nd - go to `/server` and type `nodemon server.js`
3rd - go to `/fron` and type `gulp run`

### How to run the tests?
Go to `server/` and run `npm test`.


### Next steps?

* Build all the client side project, the current one is just for testing.
* Refactor the game.js, the logic that calculates the winner is not reliable.

### How to play?

The game is available on this heroku [url](https://infinite-citadel-7060.herokuapp.com/), it is a free account, so it will probably be a little slow. Also the game is not 100% reliable yet, but is possible to play a little bit(with some bugs..heheh)

When you open the game, you just need to write your user name, and a room name. It is only possible to play with a friend, so you need to send the room name that you create, and of course he/she needs to use this room name in 'room name' field.