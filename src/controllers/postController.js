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