// load the module 
let mongoose = require("mongoose")

mongoose.pluralize(null);       // to avoid creating in lower case with s postfix. 
// create the schema 
let chatSchema = mongoose.Schema({
    name: String,
    message: String,
});

// using schema creating model 
//1st parameter collection name 
// 2nd parameter schema reference. 
let chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;    // we can import using require.
                                // in anothe file