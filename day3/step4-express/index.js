const express = require("express");
let app = express();
app.get("/", (req, res) => {
     /*  
    res.write("welcome to your life");
    res.end(); 
    */
   // res.send("welcome to your life");
   res.sendFile(__dirname+"/index.html")
})
app.listen(5050,"localhost", (err)=>{
    err 
    ? console.log("Error ", err) 
    : console.log("server is now live on localhost:5050")
});