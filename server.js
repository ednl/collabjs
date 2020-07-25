const express = require('express');
const app = express();
const server = app.listen(3000, listen);

function listen() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Server listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

const io = require('socket.io')(server);
io.sockets.on('connection', socket => {
	console.log("New client: " + socket.id);
	socket.on('mouse', data => socket.broadcast.emit('mouse', data));
	// socket.on('disconnect', () => console.log("Client has disconnected"));
});
