const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const path = require('path')


module.exports = (req, res, next ) => {
    const authHeader = req.headers.authorization
    if (!authHeader){
        console.log("token não informado!")
        return res.status(401).send({ erro: "token não informado!"})
    }

    const parts = authHeader.split(' ')
    if (!parts.lenght === 2){
        console.log("token incompleto!")
        return res.status(401).send({ erro: "token incompleto!"})
    }
    const [ scheme, token ] = parts
    
    if (!/^Bearer$/i.test(scheme)){
        console.log("token mal formado!")
        return res.status(401).send({ erro: "token mal formado!"})
    }

    jwt.verify(token, authConfig.secret,async (err, decoded) => {
        if (err) {
            // const user = await Users.findById({_id: req.headers.userid})
            // if (user.token === token && err.message === "jwt expired" && user.remainingTokens > 0) {
            //     function gerarToken(params = {}){
            //         return jwt.sign(params, authConfig.secret, { expiresIn: 24 * 3600 }); //24 horas
            //     }
            //     const newToken = await gerarToken({ id: user.id });
            //     let remainingTokens = user.remainingTokens - 1;
            //     const userWithToken = await Users.findByIdAndUpdate({_id: user._id},{refreshToken: newToken, remainingTokens: remainingTokens},{new: true});
            //     // return res.json({newToken: userWithToken.token})
            //     return next();
            // }
            return res.status(401).json('Invalid token')
        }
        if (req.headers.userid == decoded.id) {
            return next();
        }  
        return res.status(401).json('userId not found')      
    })
}