const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.json");

// app configuration
const app = express();
// middleware configuration
app.use(express.static(__dirname));
app.use(express.urlencoded({extended : "extended"}));

// db configuration
let rawurl = "mongodb+srv://{{dbuser}}:{{pass}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?retryWrites=true&w=majority&appName=Cluster0";
let url = rawurl
        .replace("{{dbuser}}",config.dbuser)
        .replace("{{pass}}",config.dbpass)
        .replace("{{dbstring}}",config.dbstring)
        .replace("{{dbname}}",config.dbname)

// model configuration
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
// ORM
let User = mongoose.model("User",new Schema({
    id : ObjectId,
    firstname : String,
    lastname : String,
    email : { type : String, unique : true },
    password : String
}))

// db connection
mongoose.connect(url)
.then(()=> console.log("DB Connected"))
.catch((error)=> console.log("Error ", error));

app.get("/", function(req, res){
    res.render("home.pug");
})
app.get("/login", function(req, res){
    res.render("login.pug");
})
app.post("/login", function(req, res){
    User.findOne({ email : req.body.email })
    .then(dbres => {
        if(dbres.password === req.body.password){
            res.redirect("/profile")
        }else{
            res.render("login.pug",{errorMessage : "invalid password"})
        }
    })
    .catch(error => {
        res.render("login.pug",{errorMessage : "no user by that credentials"})
    })
})
app.get("/register", function(req, res){
    res.render("register.pug");
})
app.post("/register", function(req, res){
    let user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password,
    });
    user
    .save()
    .then((dbres)=>{
        res.redirect("/profile");
        console.log("user is registered")
    })
    .catch((error)=>{
        let errorMessage = "";
        if(error.code == 11000){
            errorMessage = "Email id already exists";
        }else{
            errorMessage = "something went wrong"
        }
        res.render("register.pug",{errorMessage})
    })
})
app.get("/profile", function(req, res){
    res.render("profile.pug");
})
app.get("/logout", function(req, res){
    res.redirect("/");
})
app.listen(3000,"localhost", function(error){
    error ? console.log("Error ", error) : console.log("server is live on localhost:3000")
})