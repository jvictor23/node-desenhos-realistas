const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Album = require('../models/album');
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

router.post('/create/album', async (req,res)=>{
    const {titulo} = req.body;
    try{
        if(await Album.findOne({titulo})){
            return res.status(400).send({error: "Este album já existe!"})
        }

        const album = await Album.create(req.body);
        res.send(album);

    }catch(err){
        return res.status(400).send({error: "Erro ao criar album!"});
    }
  
})

module.exports = app => app.use('/admin', router);