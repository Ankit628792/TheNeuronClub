import nextConnect from 'next-connect'
import multer from 'multer';

const middleware = nextConnect()

// const storageImage = multer.diskStorage({
//     destination: '/images/question/',
//     filename: (req, file, cb) => {
//         return cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
//     }
// })

const storageImage = multer.memoryStorage()
const uploadImage = multer({
    storage: storageImage
})

middleware.use(uploadImage.single('image'), async (req, res, next) => {
    next()
})

export default middleware