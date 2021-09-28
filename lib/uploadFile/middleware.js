import nextConnect from 'next-connect'
import multer from 'multer';

const middleware = nextConnect()

const storageImage = multer.diskStorage({
    destination: '/var/task/public/images/question/',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
    }
})

const uploadImage = multer({
    storage: storageImage
})

middleware.use(uploadImage.single('image'), async (req, res, next) => {
    console.log("middle")
    console.log(req.file)
    console.log("middle")
    next()
})

export default middleware