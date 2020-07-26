const PORT = 3000;
const express = require('express');
const app = express();
const server = app.listen(PORT, () => console.log('Listening on port ' + PORT));
app.use(express.static('public'));

const io = require('socket.io')(server);
io.sockets.on('connection', socket => {
	console.log("New client: " + socket.id);
	socket.on('draw', data => {
		data.id = socket.id;
		socket.broadcast.emit('draw', data);
	});
});
