const mongoose = require('mongoose');
//process.env.MONGODB_URL
const Url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/aniflix'
mongoose.connect( Url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});
mongoose.set('useCreateIndex', true)
console.log("conectado a db com sucesso!");
module.exports = mongoose;