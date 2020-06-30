const mongoose = require('../database');

const albumSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique:true
    },

    urlUltimaImagem:{
        type: String
    }
});

const Album = mongoose.model('albun', albumSchema);

module.exports = Album;