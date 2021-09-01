module.exports = {
    images: {
        domains: ['sample-api-data.vercel.app', 'images.unsplash.com']
    },
    env: {
        mongodbURI: process.env.MONGODB_URI,
        secret_key: process.env.SECRET_KEY
    }
}