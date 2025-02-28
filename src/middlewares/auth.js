module.exports = (req,res,next) =>{
    const jwt = require('jsonwebtoken');
    const authConfig = require('../config/auth.json')
    
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: 'Token não foi aprovado!'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length ===2){
        return res.status(401).send({error: "Token error"});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token mal formatado!'})
    }

    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({error: 'Token inválido!'});
        }

        req.userId = decoded.id;
        return next();
    })
}