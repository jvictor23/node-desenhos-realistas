const mongoose = require('../database');

const imgSchema = new mongoose.Schema({
    titulo:{
        type: String,
    },
    key:{
        type:String
    },
    size:{
        type: Number
    },
    url:{
        type: String,
    },

    createAt:{
        type: Date,
        default: Date.now
    }

})

const imgPost = mongoose.model('imgPost', imgSchema);

module.exports = imgPost;