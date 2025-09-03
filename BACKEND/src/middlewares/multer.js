import multer, { diskStorage } from "multer"
import fs from "fs"
import path from "path"

const publicPath = path.resolve('./public')
if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath, { recursive: true })

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})

export default upload