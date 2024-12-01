const http = require("node:http");
const fs = require("fs");

let server = http.createServer((req, res)=>{
    // console.log(req.url);
    /* 
    res.write(`welcome to your life`);
    res.end(); 
    */
   if(req.url === "/"){
    fs.readFile("index.html","utf-8", function(error, data){
        if(error){ console.log("Error ", error)}
        else{
            res.write(data);
            res.end(); 
        }
    })
   }else if(req.url === "/index.html"){
        fs.readFile("index.html","utf-8", function(error, data){
            if(error){ console.log("Error ", error)}
            else{
                res.write(data);
                res.end(); 
            }
        })
   }else if(req.url === "/about.html"){
    fs.readFile("about.html","utf-8", function(error, data){
        if(error){ console.log("Error ", error)}
        else{
            res.write(data);
            res.end(); 
        }
    })
}else if(req.url === "/contact.html"){
        fs.readFile("contact.html","utf-8", function(error, data){
            if(error){ console.log("Error ", error)}
            else{
                res.write(data);
                res.end(); 
            }
        })
   }else{
        fs.readFile("404.html","utf-8", function(error, data){
            if(error){ console.log("Error ", error)}
            else{
                res.write(data);
                res.end(); 
            }
        })
   }
});

server.listen(5050,"localhost",(error)=>{
    if(error) { console.log("Error ", error)}
    else{ console.log("Server is now live on localhost:5050")}
})