const express = require("express");
const config = require("./config.json");
const mongoose = require("mongoose");

const app = express();
// connect to DB
mongoose.connect("mongodb+srv://admin:C96BWFXaYPhQMBwM@cluster0.kt0oh.mongodb.net/intellipaatDB?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("DB Connected"))
.catch((error)=> console.log("Error ", error));

// Model
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Friend = mongoose.model("Friend", new Schema({
    id : ObjectId,
    title : String,
    firstname : String,
    lastname : String,
    city : String
}))

setTimeout(function(){
    Friend.find().then(res => console.log(res)).catch(error => console.log("Error ", error))
}, 2000);

// render the data
/* app.get("/", (req, res) => {
    // res.sendFile(__dirname+"/public/index.html");
    res.render("index.pug",{data : []})
}) */
app.listen(config.port,config.host, (error)=>{
    error ? console.log("Error ", error) : console.log("Server is now live on ",config.host,":",config.port)
})