const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

let SocketConnected = new Set();

const server = app.listen(PORT, () => {
    console.log("Server is started succesfully at port 4000")
})

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)
    SocketConnected.add(socket.id)

    io.emit("client-total", SocketConnected.size);


    socket.on('disconnect', () => {
        console.log("socket disconnected")
        SocketConnected.delete(socket.id);
        io.emit("client-total", SocketConnected.size);

    })

    socket.on("message" ,(data) =>
    {
        console.log(data)
        socket.broadcast.emit("chat-message" ,data);

    })

}