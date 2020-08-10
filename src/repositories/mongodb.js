const mongoose = require('mongoose');
//process.env.MONGODB_URL
mongoose.connect( process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/aniflix',{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});
mongoose.set('useCreateIndex', true)
console.log("conectado a db com sucesso!");
module.exports = mongoose;