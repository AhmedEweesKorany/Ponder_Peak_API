const fs = require('fs');
const path = require("path")

/**
 * The function `fileRemover` takes a filename as input and attempts to remove the file from a
 * specified directory, logging success or failure messages accordingly.
 * @param filename - The `filename` parameter in the `fileRemover` function is the name of the file
 * that you want to remove from the specified directory.
 */
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