const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth.json');



const salt = bcrypt.genSaltSync(13);

module.exports = {


async signin (req,res){
    function gerarToken(params = {}){
        return jwt.sign(params, authConfig.secret, { expiresIn: 3 * 24 * 3600 }); //3 dias
    }
    const user = await Users.findOne({user:req.body.user}).select('+password')
    //verifica se o usuário existe
    if (user == null){
        return res.json('invalid username')
    }
    //verifica se a senha é valida
    if (!await bcrypt.compare(req.body.password, user.password)){
        return res.json('invalid password');
    }
    const newToken = await gerarToken({ id: user.id });
    const userWithToken = await Users.findByIdAndUpdate({_id: user._id},{token: newToken, refreshToken: ''},{new: true});
    userWithToken.password = undefined;
    res.send({userWithToken})
},


async renewtoken(req, res){
    function gerarToken(params = {}){
        return jwt.sign(params, authConfig.secret, { expiresIn: 3 * 24 * 3600 }); //3 dias
    }
    const filter = req.headers.authorization
    const newToken = await gerarToken({ id: req.headers.userid });
    const userWithNewToken = await Users.findOneAndUpdate(filter,{token: newToken}, {new: true});
    
    return res.json({token: userWithNewToken.token});
},


async signup (req,res){
    function gerarToken(params = {}){
        return jwt.sign(params, authConfig.secret, { expiresIn: 85999 });
    }
    try {
        if ( await Users.findOne({ user:req.body.user }) ){
            return res.json('user already in use')
        }
        if (await Users.findOne({ email:req.body.email })) {
            return res.json('email already in use')
        }
        var hash = bcrypt.hashSync(req.body.password, salt)
        
        const user = await Users.create({
            name:req.body.name,
            user: req.body.user,
            email: req.body.email,
            money: req.body.money,
            password: hash 
        })
        //remove a senha da resposta
        user.password = undefined
        console.log("Registered successfully")
        return res.send({ 
            user:user.user,
            name:user.name,
            email:user.email,
            money: user.money,
            level: user.level,
            competitionName: user.competitionName,
            token: gerarToken({ id: user.id }),
         })
    } 
    catch (err){
        console.log(err)
        return res.json('error when registering')
    }
},


async updateUser(req,res){
    //loga na conta para poder editar outro usuário
    const user = await Users.findOne({user:req.body.user}).select('+password')
    //verifica se a senha é valida
    if (!await bcrypt.compare(req.body.password, user.password)){
        return res.json('invalid password')
    }

    //verifica se tem nivel para editar o dinheiro do usuário
    if (user.level < 0){
        const filter = {user: req.body.update.user, email: req.body.update.email};
        const user = await Users.findOne(filter)
        const update = {
            money: req.body.update.money
        }
        if (user) {
            var editedUser = await Users.findByIdAndUpdate(user._id, update, {new:true})
            return res.json(editedUser)  
        }
        else {
            return res.json('user not found')
        }
    }

    //verifica se tem nível para editar o nível de outros usuários
    if (user.level === 2){
        const filter = {user: req.body.update.user, email: req.body.update.email};
        const id = await Users.findOne(filter)
        const update = {
            money: req.body.update.money,
            level: req.body.update.level
        }
        if (id) {
            var editedUser = await Users.findByIdAndUpdate(id._id, update, {new:true})
            editedUser.password = undefined;
            return res.json(editedUser);
        }
        else {
            return res.json('user not found')
        }
    }
    else {
        return res.json("you don't have permission to update");
    }
},

};