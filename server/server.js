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
let users = [];

server.listen(port, () =>{
    console.log("server running on "+port);
});

let counter=0;

io.on('connection', (socket) => {
    counter += 1;
    console.log(counter+' someone connected')

    socket.on('sendToAll', (message) => {
        console.log('send: ' + message);
        io.emit("displayMessage", (message));
    });

    socket.on('sendToMe', (message) => {
        console.log('send: ' + message + ' from: ' +socket.id);
        socket.emit("displayMessage",(message));
    });

    socket.on("login", (userName)=>{
        let user= {
            name: userName,
            id:socket.id
        }
        users.push(user);
        io.emit("loggedInUsers",(users));
        });

    socket.on('disconnect', () => {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                users.splice(i, 1);
            }
        }

        console.log('left: ', socket.id)
        io.emit("loggedInUsers", (users));
    });
})
;














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
