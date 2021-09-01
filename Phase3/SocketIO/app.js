// load the express module 
let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "//index.html");
})

var MSGS = ["Im sorry.", "I can't help right now.", "Our server is busy.","Please try again later."]

io.on("connection", (socket) => {
    console.log("Client connected");
    // receive the message from client application 
    socket.on("body",(msg2) =>{
        // sending data to client 
        var msg = MSGS[Math.floor(Math.random() * MSGS.length)];
        var date = new Date;
        var serversays = " Server says: ";
        var completemsg = date.toLocaleString() + serversays + msg;
        socket.emit("obj1", completemsg);
    })
})


// please run the server using http module not express module 
http.listen(9090, () => console.log("Server running on port number 9090"));