const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect( '${process.env.MONGODB_URL}',{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});
mongoose.set('useCreateIndex', true)
console.log("conectado a db com sucesso!");
module.exports = mongoose;
