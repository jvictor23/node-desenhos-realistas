const mongoose = require('../database');

const aws = require('aws-sdk');

const s3 = new aws.S3();

const fs = require('fs');
const path = require("path");
const {promisify} = require('util');

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

    idAlbum:{
        type: String,
        required:true
    },

    createAt:{
        type: Date,
        default: Date.now
    }

});

imgSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
});

imgSchema.pre('remove', function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: process.env.BUCKET_AWS,
            Key: this.key
        }).promise()
    }else{
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
    }
})

const imgPost = mongoose.model('imgPost', imgSchema);

module.exports = imgPost;