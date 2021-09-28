import { config, uploader } from 'cloudinary';
const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: 'dxfghedzo',
        api_key: '453233359282847',
        api_secret: 'E6HNQmolIaTIE2O8saGQN5RavHs',
    });
    // config({
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET,
    // });
    next()
}
export { cloudinaryConfig, uploader };