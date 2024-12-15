const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// config
app.use(express.static(__dirname));

io.on("connection",function(server){
    console.log("client connected");
    setInterval(function(){
        server.emit("message", {"message" : "hello client "+new Date().getMilliseconds() });
    },1000);
    server.on("clientmessage", function(evt){
        console.log(evt);
    });
    server.on("disconnect",function(){
        console.log("client disconnected")
    })
});


server.listen(6060, "localhost", function(error){
    if(error){ console.log("Error ", error)}
    else{ console.log("Server is now live on localhost:6060") }
});
