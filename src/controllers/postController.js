const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const Post = require('../models/imgPost');

router.post('/post/img', multer(multerConfig).single('file'), async (req, res) =>{

    const post = await Post.create({
        titulo: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: ''
    })

    res.send(post);
});

module.exports = app => app.use('/admin', router);