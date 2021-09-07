// load the module 
let mongoose = require("mongoose")

mongoose.pluralize(null);       // to avoid creating in lower case with s postfix. 
// create the schema 
let courseSchema = mongoose.Schema({
    courseId: Number,
    name: String,
    description: String,
    amount: Number
});

// using schema creating model 
//1st parameter collection name 
// 2nd parameter schema reference. 
let courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;    // we can import using require.
                                // in anothe file