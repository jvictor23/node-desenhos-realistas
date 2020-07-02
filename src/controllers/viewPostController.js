const router = require('express').Router();

const Post = require('../models/imgPost');
const Album = require('../models/album');

//Recuperar todas imagens de um album (o id é do album)
router.get('/post/img/:id', async(req, res)=>{
    try {
        const posts = await Post.find({idAlbum: req.params.id})
        res.send(JSON.stringify(posts))
    } catch (error) {
        res.status(400).send({error: "Erro ao carregar imagens!"})
    }
})

//Recuperar todos os albuns
router.get('/album', async(req, res)=>{
    try{
     const albuns = await Album.find().limit(3);
     console.log(albuns);
     res.send(albuns);
        
    }catch(err){
        res.status(400).send({error: "Erro ao carregar albuns"})
    }
 });

 //Recuperar album pelo id
 router.get('/album/:id', async (req, res)=>{
    
    
    try{
        
        const album = await Album.findById(req.params.id);
        console.log(album)
        res.send(album);
    }catch(err){
        res.status(400).send({error: "Erro ao carregar album"});
    }

});

module.exports = app => app.use('/get', router);