const fs = require('fs');
const path = require("path")
const fileRemover  = (filename)=>{
    fs.unlink(path.join(__dirname,"../uploads",filename),(err)=>{
        if(err && err.code == "ENOENT"){ // this mean file doesnot exist
            console.log(`file ${filename} doesn't exists`);
        }else if(err ){
             console.log("error happend while removing file")
        }else{
            console.log("file removed successfully");
        }
    })
}

module.exports = fileRemover;