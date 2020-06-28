const mongoose = require('../database');

const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha:{
        type: String,
        required: true,
        select: false
    },

    dataCriacao:{
        type: Date,
        default: Date.now,
    }

});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
})

const User = mongoose.model('usuario', UserSchema);

module.exports = User;