
let socket = io();

let textClient = document.getElementById('input')

// send message
const sendToAll = () => {
   socket.emit("sendToAll", textClient.value);
}

const sendToMe = () => {
   socket.emit("sendToMe", textClient.value);
}

// receive message
socket.on('displayMessage', (message) => {
   target.innerHTML += '<br>'+message;
});

const setUser = () => {
   let userName = document.getElementById('userName')

}










/*

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
    // ...
});*/
