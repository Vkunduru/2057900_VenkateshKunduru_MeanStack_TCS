// load all modules 
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

// create the reference of express 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

//let routerProduct = require("./course.router");
let chatModel = require("./chat.model");


// add middleware 
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//url database 
let url = "mongodb://localhost:27017/tcsmean"

// connect the database 
mongoose.connect(url).then(res => console.log("connected")).catch(error => console.log(error));

let io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "//index.html");
})

io.on("connection", (socket) => {
    console.log("Client connected");
    var msgName = "";
    var msgBody = "";
    // receive the message from client application 
    socket.on("name", (msg) => {
        msgName = msg;
        console.log(msgName);
    })

    socket.on("body", (msg2) => {
        msgBody = msg2;
        console.log(msgBody);
        chatModel.insertMany({ name: msgName, message: msgBody }, (err, result) => {
            if (!err) {
                console.log("Course stored successfully.")
            } else {
                console.log(err);
            }
        })

    })

})


// please run the server using http module not express module 
http.listen(9090, () => console.log("Server running on port number 9090"));