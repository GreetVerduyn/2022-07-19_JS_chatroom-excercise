"use strict";

const express = require('express');
const http = require('http');
const app = express();                              // To define our application
const clientPath = `${__dirname}/../client`;        // To give the path to our client
app.use(express.static(clientPath));                // To use express to host the client
const server = http.createServer(app);              // To use http to serve the app that express provides
const port = 8080;

const { Server } = require("socket.io");
const io = new Server(server);


server.listen(port, () =>{
    console.log("server running on "+port);
});

let counter=0;

io.on('connection', (socket) => {
    counter += 1;
    console.log(counter+' someone connected')

    socket.on('sendToMe', (msg) => {
        console.log('send: ' + msg);
        socket.emit("displayMessage",(msg));
    });

    socket.on('sendToAll', (msg) => {
        console.log('send: ' + msg);
        io.emit("displayMessage", (msg));
    });
});














/*

io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

    // receive a message from the client
    socket.on("hello from client", (...args) => {
        // ...
    });
});
*/
