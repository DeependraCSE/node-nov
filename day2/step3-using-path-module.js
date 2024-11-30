let path = require("node:path");

let driveName = "C:";
let folderName = "node-nov";
let fileName = "step2-using-globals.js";

// C:\node-nov\step2-using-globals.js;
// C:\node-nov\step2-using-globals.js;

console.log("path.join()",path.join(driveName,folderName,fileName));

let mypath = "C://node-nov/step2-using-globals.js";

console.log("path.resolve()",path.resolve(mypath));
