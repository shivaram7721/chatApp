const express = require('express')
const app = express(); //instance of express server

const http = require('http'); // socket io is created upon http server
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);

//this is how we create a http server from above code

//by below code we can do anything in backend related to socket io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

//when user emits, this is the listener to that emited data
//by io.on we lister, and connection is event to be done first and we get socket object
io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on('join_room', (room) => {
        socket.join(room)
    })

    socket.on("send_message", (data) => {
        // socket.broadcast.emit("receive_message", data);
        socket.to(data.room).emit("receive_message", data)
    })
    // broadcast to all other connected users, leaving me who sent message
    // we write listener in frontend
})

// the above code enables us to use socket io

server.listen(5174, () => {
    console.log("SERVER RUNNING");
})