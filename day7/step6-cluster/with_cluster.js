const express = require("express");
const cluster = require("cluster");
const os = require("os");

let FibGen = require("./utils/fib-gen");
let totalCPUs = os.cpus().length;
console.log("Total CPUs", totalCPUs);
if(cluster.isMaster){
    for(let i = 0; i < totalCPUs; i++){
        cluster.fork();
    }
    cluster.on("online", worker => {
        console.log(`Worker id is ${ worker.id } and PID is ${ worker.process.pid } is Online`);
    })
    cluster.on("exit", worker => {
        console.log(`Worker id is ${ worker.id } and PID is ${ worker.process.pid } is Offline`);
        // console.log("let's fork a new worker");
        // cluster.fork();
    })
}else{
    console.log("Worker says ",cluster.isWorker);

    let app = express();

    app.get("/:num", (req, res)=>{
        if(req.url == "/"){
            res.send("enter a number");
        }else{
            let output = FibGen.computeFibNumber(Number(req.params.num));
            console.log(`Worker Process Id - ${cluster.worker.process.pid} has accepted the request!`);
            res.send(`<h1> Your Fib Number is : ${ output } </h1>`)
        }
    })

    app.listen(3000,"localhost", function(){
        console.log("server is running on localhost:3000")
    }) 
}
