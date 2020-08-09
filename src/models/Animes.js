const mongoose = require('../repositories/mongodb');
const mongoosePaginate = require('mongoose-paginate');

const AnimesSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    englishName: {
        type: String,
        default: 'Desconhecido'
    },
    genre: { 
        type: Array,
        default: 'Desconhecido'
    },
    episodes: {
        type: Array,
    },
    seasons: {
        type: Array,
    },
    ovas: {
        type: Array,
    },
    movies: {
        type: Array,
    },
    situation: {
        type: String,
        default: 'Desconhecido'
    },
    year: {
        type: Number,
    },
    director: {
        type: String,
        default: 'Desconhecido'
    },
    studio: {
        type: String,
        default: 'Desconhecido'
    },
    LaunchDay: {
        type: String,
        default: 'Desconhecido'
    }
})

AnimesSchema.plugin(mongoosePaginate)
mongoose.model('Animes', AnimesSchema)