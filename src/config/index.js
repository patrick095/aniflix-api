const MONGODB_URL = window.location.hostname.includes('localhost')
? 'mongodb://127.0.0.1:27017/aniflix'
: 'mongodb+srv://admin:VSK33cm@2hkgAZL@cluster0.jiyct.mongodb.net/aniflix?retryWrites=true&w=majority'
// const MONGODB_URL= 'mongodb://127.0.0.1:27017/aniflix';
//process.env.MONGODB_URL
module.exports = MONGODB_URL;
