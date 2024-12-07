const express = require("express");
const config = require("./config.json");
const app = express();
let usercount = Math.round(Math.random() * 100);
app.get("/", (req, res)=>{
    // res.render("home.pug",{admin : "Vijay", count : usercount })
    res.render("home.ejs",{admin : "Vijay", count : usercount })
});
app.listen(config.port,config.host, (error)=>{
    if(error){
        console.log("Error ", error);
    }else{
        console.log(`web server is now live on ${config.host}:${config.port}`)
    }
})