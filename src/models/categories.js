const mongoose = require('../repositories/mongodb');
const mongoosePaginate = require('mongoose-paginate');

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: "black"
    }
})

CategoriesSchema.plugin(mongoosePaginate)
mongoose.model('Categories', CategoriesSchema)