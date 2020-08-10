const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');
const Animes = mongoose.model('Animes');
const Users = mongoose.model('Users');


module.exports = {
    async showAll(req,res){
        const { page = 1, limit = 10 } = req.query
        const categories = await Categories.paginate({},{page, limit: parseInt(limit)})
          
        var categoriesWithAnimes = [];

        categories.docs.map(async (category, index) => {
            const animes = await Animes.find({category: category.id}); 
            
            categoriesWithAnimes.push({
                name: category.name, 
                description: category.description,
                id: category.id,
                color: category.color,
                animes
            })
            //verifica se é o ultimo loop do map e retorna o resultado
            if (index === categories.docs.length -1) {
                setTimeout(() => {return res.json(categoriesWithAnimes);},500);
                 
            }
        })
        
        
    },
    async editCategory(req, res){
        const user = await Users.findById(req.headers.userid)
        if (user.level > 0) {
            const filter = req.body.id
            const update = {
                name: req.body.name,
                description: req.body.description,
                color: req.body.color,
            };
            const category = await Categories.findOneAndUpdate(filter, update, {new: true})
            res.json(category)
        }
        else {
            res.json("you don't have permission to edit categories")
        }
    },
    async createCategory(req,res){
        const user = await Users.findById(req.headers.userid)
        if (user.level > 0) {
            const { name, id, description } = req.body;
            const verifyExist = await Categories.find({ 
                $or: [{ name: name }, { id: id }, { description: description }]
             });
            if (verifyExist.length > 0) {
                return res.json("category alread exist");
            }
            else {
                let newCategory = await Categories.create(req.body);
                console.log(newCategory);
                return res.json(newCategory);
            }
        }
    },
    async deleteCategory(req, res) {
        const user = await Users.findById(req.headers.userid)
        if (user.level > 0) {
            const { name, id, description } = req.body;
            const verifyExist = await Categories.find({ 
                $or: [{ name: name }, { id: id }]
             });
            if (verifyExist.length === 0) {
                return res.json("category not exist");
            }
            else {
                let deletedCategory = await Categories.findOneAndDelete({name})
                console.log(deletedCategory);
                return res.json(deletedCategory);
            }
        }
    },
};