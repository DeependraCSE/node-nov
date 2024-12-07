const express = require("express");
const app = express();
//---------------------------------
// Middle Wares
app.use(express.urlencoded({extended : "extended"}));
//---------------------------------
let data = [];

app.get("/",(req, res)=>{
    res.render("home.pug",{ data });
})
app.post("/",(req, res)=>{
    // console.log(req.body);
    data.push(req.body.avenger);
    // console.log(data);
    res.redirect("/");
})

app.listen(1010,"localhost", (error)=>{
    error ? console.log("Error ", error) : console.log("server is running on localhost:1010")
})