const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authconfig = require('../config/auth');

const User = require('../models/user');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    const {email} = req.body;
    try{

        if(await User.findOne({email})){
            return res.status(400).send({error: "Este usuario já existe!"});
        }

        const user  = await User.create(req.body);

        user.senha = undefined;
        

        return res.send({user});
    }catch(err){
        return res.status(400).send({error: 'Erro ao registrar usuario!'});
    }
});

router.post('/autenticar', async (req, res)=>{
    const {email, senha} = req.body;

    const user = await User.findOne({email}).select('+senha');
    if(!user){
        return res.status(400).send({error: "Usuario não encontrado!"});
    }

    if(!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({error: "Senha Inválida!"});
    }

    user.senha = undefined;

    const token =  jwt.sign({id: user.id}, authconfig.secret,{
        expiresIn: 86400,
    });

    return res.send({user, token});


})

module.exports = app => app.use('/usuario', router);