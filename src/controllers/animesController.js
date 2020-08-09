// const Anime = require('../models/Animes');
const mongoose = require('mongoose');
const Animes = mongoose.model('Animes');

module.exports = {
    async showAll(req,res){
        const { page = 1 } = req.query
        const animes = await Animes.paginate({},{page, limit: 10})
        return res.json(animes);
    },
    async createAnime(req,res){
        const {
            name, englishName, genre, episodes, seasons, ovas, movies, situation, year,
            director, studio, launchDay
        } = req.body;
        const verifyExist = await Animes.findOne({ $or: [
            { name : name }, 
            { englishName: name },
            { name: englishName },
            { englishName: englishName }
        ]});
        if (verifyExist) {
            return res.json("Anime alread exist");
        }
        else {
            let newAnime = await Animes.create(req.body);
            console.log(newAnime);
            return res.json(newAnime);
        }
    },
    async editAnime(req, res) {
        const {
            name, englishName, genre, episodes, seasons, ovas, movies, situation, year,
            director, studio, launchDay
        } = req.body;
        const verifyExist = await Animes.findOne({ $or: [
            { name : name }, 
            { englishName: name },
            { name: englishName },
            { englishName: englishName }
        ]});
        if (!verifyExist) {
            return res.json("Anime not exist");
        }
        else {
            const filter = {name: name};
            let newAnime = await Animes.findOneAndUpdate(filter, req.body, {new:true});
            return res.json(newAnime);
        }
    },
    async deleteAnime(req, res) {
        const {
            name, englishName, genre, episodes, seasons, ovas, movies, situation, year,
            director, studio, launchDay
        } = req.body;
        const verifyExist = await Animes.findOne({ $or: [
            { name : name }, 
            { englishName: name },
            { name: englishName },
            { englishName: englishName }
        ]});
        if (!verifyExist) {
            return res.json("Anime not exist");
        }
        else {
            const filter = {name: name};
            let deletedAnime = await Animes.findOneAndDelete(filter)
            return res.json(deletedAnime);
        }
    },


}