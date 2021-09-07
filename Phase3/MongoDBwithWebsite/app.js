// load all modules 
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
//let routerProduct = require("./course.router");
let courseModel = require("./course.model");



// create the reference of express 
let app = express();

// add middleware 
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//url database 
let url = "mongodb://localhost:27017/tcsmean"

// connect the database 
mongoose.connect(url).then(res => console.log("connected")).catch(error => console.log(error));

// middleware which help to match main path and pass the
// request to router file. 
// http://localhost:9090/course/getAllCourses     : Get
// http://localhost:9090/course/addCourse       : Post 
// http://localhost:9090/course/deleteCourse       : Delete
// http://localhost:9090/course/updateCourse       : Update

app.get("/", (req, res) => { res.sendFile(__dirname + "/index.html") });

app.post("/addCourse", (req,res) => {
    let course = req.body;
    courseModel.insertMany(course, (err, result) => {
        if (!err) {
            res.send("Course stored successfully.")
        } else {
            res.send(err);
        }
    })
});

app.post("/updateCourse", (req, res) => {
    let course = req.body;
    courseModel.updateOne({ courseId: course.courseId }, { $set: { amount: course.amount } }, (err, result) => {
        if (!err) {
            res.send("Course successfully updated.");
        } else {
            res.send(err);
        }
    })
});
app.post("/deleteCourse", (req, res) => {
    let cid = req.body;
    courseModel.deleteOne({ courseId: cid.courseId }, (err, result) => {
        if (!err) {
            res.send("Course successfully deleted.")
        } else {
            res.send(err);
        }
    })
});
app.post("/getAllCourses", (req, res) => {
    courseModel.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.json(err);
        }
    })
});

//
// app.use("/course", routerProduct);
app.listen(9090, () => console.log("Server running on port number 9090"))


