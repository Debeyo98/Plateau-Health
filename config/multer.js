const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage:multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb)=>{
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg"){
            cb(new Error(`File type not supported`), false)
            return
        }
        cb(null, true)
    }
})