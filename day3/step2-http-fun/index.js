const http = require("node:http");
/* http.createServer(function(req, res){ }) */
let server = http.createServer((req, res)=>{
    // res.write("welcome to your life");
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Welcome to your life</h1>
        </body>
        </html>
        `)
    res.end();
});

server.listen(5050,"localhost",(error)=>{
    if(error) { console.log("Error ", error)}
    else{ console.log("Server is now live on localhost:5050")}
})