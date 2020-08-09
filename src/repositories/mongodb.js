const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/aniflix',{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});
mongoose.set('useCreateIndex', true)
console.log("conectado a db com sucesso!");
module.exports = mongoose;