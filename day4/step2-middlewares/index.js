const express = require("express");
const { mymiddleware } = require("./middlewares/firstmiddleware");
const app = express();

// middleware
/* 
app.use(function(req, res, next){
    console.log("hello from first middleware");
    next();
})
app.use(function(req, res, next){
    console.log("hello from second middleware")
    next();
})
app.use(function(req, res, next){
    console.log("hello from third middleware")
    next();
})
app.get("/",function(req, res){
    res.sendFile(__dirname+"/public/index.html")
})
*/
// 

app.use(mymiddleware);
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname));
app.get("/",function(req, res){
    res.sendFile(__dirname+"/public/index.html")
})

app.listen(5050,"localhost",(error)=>{
    if(error){
        console.log("Error ", error)
    }else{
        console.log("Web server is live on localhost:5050");
    }
})

// webpack
// turbo 