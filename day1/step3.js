// let os = require("node:os");
let os = require("os");

console.log("OS.arch()" ,os.arch())
console.log("OS.cpus().length" ,os.cpus().length)
console.log("OS.userInfo().username" ,os.userInfo().username)
console.log("OS.os.freemem()" ,os.freemem(), "bytes")
console.log("OS.totalmem()" ,os.totalmem(),"bytes")
