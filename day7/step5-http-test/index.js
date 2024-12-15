var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
// var morgan = require("morgan");
// --------------------------------------
mongoose.set('strictQuery', false);
// Configurations for express
var app = express();
// Route Configuration
var friendsRoutes = express.Router();
// --------------------------------------
// Middleware Configuration
app.use(express.json());
app.use(cors());// 
// app.use(express.static(__dirname+"/public"));

// app.use(morgan('combined'));
app.use('/friends', friendsRoutes);

// --------------------------------------
// Database Configuration
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let Friend = mongoose.model("Friend", new Schema({
    id : ObjectId, 
    name : String, 
    email : String, 
    city : String 
}));

let uri = "mongodb+srv://admin:C96BWFXaYPhQMBwM@cluster0.kt0oh.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)
.then(function(){ console.log("DB connection success")})
.catch(function(err){ console.log("Error : ", err)});
// --------------------------------------

// Create Read Udate Delete
// CREATE
friendsRoutes.route("/").post(function(req, res){
    console.log("recieved post request", req.body);
    let friend = new Friend(req.body);
    friend
    .save()
    .then(function(dbres){
        console.log(dbres)
        res.status(200).json({"added":"new friend added", "email":"kit@walker.com","city":"Bhangala"})
    })
    .catch(function(err){
        res.send("your info was not saved to database")
    });
})

// READ
friendsRoutes.route("/").get(function(req, res){
    Friend.find()
    .then(friendlist => res.status(200).json(friendlist))
    .catch(err => console.log("Error : ", err))
})


// REQUEST BEFORE UPDATE
friendsRoutes.route("/edit/:id").get(function(req, res){
    Friend.findById({ _id : req.params.id })
    .then( dbres => res.status(200).json(dbres))
    .catch(err => res.status(400).json({"error":err}) )
})


// UPDATE
friendsRoutes.route("/update/:id").post(function(req, res){
    Friend.findById({ _id : req.params.id })
    .then(friend => {
        friend.name = req.body.name;
        friend.email = req.body.email;
        friend.city = req.body.city;
        friend.save()
        .then(function(data){
            res.status(200).json(data);
        })
        .catch(function(err){
            res.status(400).send("friend's info was not updated")
        })
    } )
    .catch(error => res.status(400).json({"Error": error}))
})

// DELETE
friendsRoutes.route("/delete/:id").delete(function(req, res){
    // console.log(req.params.id);
    Friend.findByIdAndDelete({ _id : req.params.id })
    .then( deletedFriend => res.status(200).json({"delete_success": deletedFriend}))
    .catch( error => res.status(400).json({"error ": error}))
})

// --------------------------------------
// Web Configurations
app.listen(5050,"localhost",function(error){
    if(error){
        console.log("Error : ", error)
    }else{
        console.log("Server is now live on localhost:5050")
    }
});
// --------------------------------------

module.exports = app;