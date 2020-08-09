const mongoose = require('../repositories/mongodb');

const schema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 0
    },
    money: {
        type: Number,
        default: 0
    }
});

mongoose.model('Users', schema);
// mongoose.model('User', UserSchema);
