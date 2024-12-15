const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.json");
const session = require("client-sessions");
const bcrypt = require("bcrypt");

// app configuration
const app = express();
// middleware configuration
app.use(express.static(__dirname));
app.use(express.urlencoded({extended : "extended"}));
app.use( session({
    cookieName: 'intellipaat', // cookie name dictates the key name added to the request object
    secret: 'ertghbvdsw34r5t6yuy6543wsdcvghyt654e3wsdft5r4w345tyhbvfdsw2345tgvc', // should be a large unguessable string
    duration: 30 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 10 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie : {
        ephemeral : true
    }
}));
// logs
// console.log("hash a for 1 time",bcrypt.hashSync("vijay",bcrypt.genSaltSync(10)));
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
        if(bcrypt.compareSync(req.body.password, dbres.password)){
            req.intellipaat.user = dbres;
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
    let hashpass = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    let user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : hashpass,
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
    // console.log("get for profile");
    if(req.intellipaat && req.intellipaat.user){
        console.log("cookie and cookie.user found");
        User.findOne({ email : req.intellipaat.user.email })
        .then(dbres => {
            res.render("profile.pug");
            // if(!dbres){
            //     req.intellipaat.reset();
            //     res.redirect("/login");
            // }else{
            // }
        })
        .catch(error => {
            req.intellipaat.reset();
            res.redirect("/login");
        })
    }else{
        res.redirect("/login");
        req.intellipaat.reset();
    }
})
app.get("/logout", function(req, res){
    req.intellipaat.reset();
    res.redirect("/");
})
app.listen(3000,"localhost", function(error){
    error ? console.log("Error ", error) : console.log("server is live on localhost:3000")
})