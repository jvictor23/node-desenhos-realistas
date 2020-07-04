const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Album = require('../models/album');
const Post = require('../models/imgPost');

//Upload de imagem
router.post('/upload/img', multer(multerConfig).single('file'), async (req, res) =>{
    if(req.file.path){

        const {key: fileName, size} = req.file;
        const data={
            fileName,
            size,
        }
        res.send(data); 
        console.log("local")
      
    }else{
        
        const {key: fileName, size, location: url} = req.file;
        const data={
            fileName,
            size,
            url
        }
        res.send(data); 
        console.log("s3")
    }
    
});

//Salvar Dados da imagem
router.post('/post/img', async(req, res)=>{
    try {
        const post = await Post.create(req.body)
        res.send(post)
    } catch (error) {
        res.status(400).send({error: "Erro ao adicionar imagem"})
    }
})

//Recuperar todas imagens (o id é do album)
router.get('/post/img/:id', async(req, res)=>{
    try {
        const posts = await Post.find({idAlbum: req.params.id})
        res.send(JSON.stringify(posts))
    } catch (error) {
        res.status(400).send({error: "Erro ao carregar imagens!"})
    }
})

//deletar imagem (o id é da imagem)
router.delete('/post/img/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        
        await post.remove();

        res.send(true);
    }catch(err){
        res.status(400).send({error: "Erro ao excluir imagem"})
    }
})

//Criar album
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

// Atualizar Album
router.put('/album/:id', async (req, res)=>{
    const {titulo, urlUltimaImagem} = req.body;
    try{

        if(urlUltimaImagem){
            await Album.findByIdAndUpdate(req.params.id, {$set:{urlUltimaImagem}}, {useFindAndModify: false});
            const album = await Album.findById(req.params.id);
            
            res.send(album);
        }else{

            if(await Album.findOne({titulo})){
                return res.status(400).send({error: "Este album já existe!"})
            }
    
            await Album.findByIdAndUpdate(req.params.id, {$set:{titulo: titulo}});
            const album = await Album.findById(req.params.id);
            
            res.send(album);

        }
        
    }catch(err){
        return res.status(400).send({error: "Erro ao atualizar album!"});
    }
})

// Recuperar todos albuns
router.get('/album', async(req, res)=>{
   try{
    const albuns = await Album.find();
    
    res.send(albuns);
       
   }catch(err){
       res.status(400).send({error: "Erro ao carregar albuns"})
   }
})

//Recuperar album pelo id (o id é do album)
router.get('/album/:id', async (req, res)=>{
    
    
    try{
        
        const album = await Album.findById(req.params.id);
        console.log(album)
        res.send(album);
    }catch(err){
        res.status(400).send({error: "Erro ao carregar album"});
    }

})

//Deletar album
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