/*
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.use(express.static(__dirname));
app.use(express.static(__dirname+"/public"));

io.on('connection', function(socket){
    console.log("new client connected");
    socket.emit("msg", "Client Connected");
})

http.listen(2020);
console.log("server is now live on localhost:2020");
*/

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(express.static(__dirname+"/public"));

io.on('connection', function(socket){
    socket.on("clientMessage", data => {
        io.emit("serverMessage", data );
    })
})
io.on('disconnect', function(socket){
    // socket.on("clientMessage", data => {
    //     io.emit("serverMessage", data );
    // });
    console.log("Client dis-connected");
})

http.listen(2020);
console.log("server is now live on localhost:2020");