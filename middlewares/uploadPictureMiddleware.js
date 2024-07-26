const multer = require("multer")
const path = require("path")


const uploadPicture = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,path.join(__dirname,"../uploads"))
        },
        filename: (req,file,cb)=>{
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    }),
    limits:{
        fileSize: 5 * 1024 *1024 //5MB
    },
    fileFilter: (req,file,cb)=>{
        let ext = path.extname(file.originalname
        )
        if(ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg"){
            cb(new Error("Only .jpg,.png,.jpeg files are allowed"), false)
        
        }
        cb(null,true) // accept file

    }
})

module.exports = uploadPicture;