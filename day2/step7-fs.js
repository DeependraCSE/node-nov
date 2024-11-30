let fs = require("node:fs");

/* 

write
read
watch
delete

*/

// synchronous
// console.log("line before writing");
fs.writeFileSync("temp.txt","welcome to your life","utf-8");
// console.log("line after writing");

// asynchronous

console.log("line before writing");
fs.writeFile("temp.txt","welcome to your life : time created "+new Date().getMilliseconds()+"\n",{flag : "a"},function(error){
    if(error){
        console.log("Error", error)
    }else{
        console.log("File is created");
        console.log("line while creating");
    }
});
console.log("line after writing");