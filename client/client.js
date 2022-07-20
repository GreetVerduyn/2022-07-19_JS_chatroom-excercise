
let socket = io();

let textClient = document.getElementById('input')
let loggedInUsers = document.getElementById('allUsers')

// set userName
let userName = prompt("enter your name?");

// send message
const sendToAll = () => {
   const message = {
      name: userName,
      msg: textClient.value,
   }
   socket.emit("sendToAll", message);
}

const sendToMe = () => {
   socket.emit("sendToMe", textClient.value);
}


// receive message
socket.on('displayMessage', (message) => {
   target.innerHTML += '<br>'+message;
});

// show all users
socket.on('loggedInUsers', (users) => {
   loggedInUsers.innerHTML = 'users:'
   for (let i=o; users.length; i++){
      loggedInUsers.innerHTML += '<br>'+users[i].name;
   }

});











/*

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
    // ...
});*/
