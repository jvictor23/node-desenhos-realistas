const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Album = require('../models/album');
const Post = require('../models/imgPost');

router.post('/upload/img', multer(multerConfig).single('file'), async (req, res) =>{
    console.log(req.file)
    res.send(req.file)
});

router.post('/post/img', async(req, res)=>{
    try {
        const post = await Post.create(req.body)
        res.send(post)
    } catch (error) {
        res.status(400).send({error: "Erro ao adicionar imagem"})
    }
})

router.get('/post/img/:id', async(req, res)=>{
    try {
        const posts = await Post.find({idAlbum: req.params.id})
        res.send(JSON.stringify(posts))
    } catch (error) {
        res.status(400).send({error: "Erro ao carregar imagens!"})
    }
})

router.delete('/post/img', async(req,res)=>{
    try{
        const post = Post.findByIdAndDelete(req.params.id);
        if(post.length === 0){
            res.status(400).send({error: "Imagem não existe!"})
        }

        res.send(true);
    }catch(err){
        res.status(400).send({error: "Erro ao excluir imagem"})
    }
})

router.post('/album/create', async (req,res)=>{
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

router.put('/album/:id', async (req, res)=>{
    const {titulo} = req.body;
    try{
        if(await Album.findOne({titulo})){
            return res.status(400).send({error: "Este album já existe!"})
        }

        await Album.findByIdAndUpdate(req.params.id, {$set:{titulo: titulo}});
        const album = await Album.findById(req.params.id);
        
        res.send(album);

    }catch(err){
        return res.status(400).send({error: "Erro ao atualizar album!"});
    }
})

router.get('/album', async(req, res)=>{
   try{
    const albuns = await Album.find();
    
    res.send(albuns);
       
   }catch(err){
       res.status(400).send({error: "Erro ao carregar albuns"})
   }
})

router.get('/album/:id', async (req, res)=>{
    
    
    try{
        
        const album = await Album.findById(req.params.id);
        console.log(album)
        res.send(album);
    }catch(err){
        res.status(400).send({error: "Erro ao carregar album"});
    }

})

router.delete('/album/:id', async (req, res) =>{
    try {
        const deletar = await Album.findByIdAndDelete(req.params.id);
        if(deletar.length === 0){
            res.status(400).send({error: "Este album não existe ou já foi excluido!"})
        }
        res.send(true);
    } catch (error) {
        res.status(400).send({error: "Erro ao excluir album!"})
    }
})

module.exports = app => app.use('/admin', router);