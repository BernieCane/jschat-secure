

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");


// const express = require("express");
// const https = require("https");
// const fs = require("fs");
// const app = express();
// const server = https.createServer({
//     key: fs.readFileSync("path/to/private.key"),
//     cert: fs.readFileSync("path/to/certificate.crt")
//   }, app);
  
//   const io = require("socket.io")(server);


const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

socket.emit("joinRoom", {username, room});

socket.on("roomUsers", ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

socket.on("message", message => {
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join("")}
    `
}