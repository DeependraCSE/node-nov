const express = require("express");
let figGen = require("./utils/fib-gen");
// console.log(figGen.computeFibNumber(50));

let app = express();

app.get("/:num", (req, res)=>{
    if(req.url == "/"){
        res.send("enter a number")
    }else{
        let output = figGen.computeFibNumber(Number(req.params.num));
        res.send(`<h1> Your Fib Number is : ${ output } </h1>`)
    }
})

app.listen(3000,"localhost", function(){
    console.log("server is running on localhost:3000")
})