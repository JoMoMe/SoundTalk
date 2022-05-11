const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path')

const userCtrl = require('../controllers/user.controller.js')
const postCtrl = require('../controllers/post.controller.js')
const promoCtrl = require('../controllers/promo.controller.js')

//TRATAMIENTO DE IMAGENES
const storage = multer.diskStorage({
    destination: '../../../frontend/src/assets/photo',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})
const upload = multer({storage})


// /menu

//OBTENIM EL NOSTRE USUARI (getUser), A TRAVÉS D'ELL VEIEM ELS NOSTRES CONTACTES i els busquem per id (getUser), busquem en la seva propietat 
//"postsid" els seus posts (getPost) i busquem a "commentsid" les id dels comentaris, per lo que fem ús de (searchCommentsOfPosts) i els incloim adins
router.get('/', userCtrl.getUser);
router.get('/:id', postCtrl.getPost);
router.get('/:id', postCtrl.searchCommentsOfPosts);

//TENIM DOS SISTEMES D'OBTENCIÓ DE POSTS QUE NO SIGUIN ELS NOSTRES CONTACTES, UN ALEATORI QUE ENS TROBA 10 POSTS DEL TOTAL EXISTENTS (getRandomPosts)
//(AQUEST SISTEMA NOMÉS LI FEM ÚS SI L'USUARI NO TÉ CONTACTES AGENDATS) 
//EL SEGON SISTEMA FUNCIONA TENINT AMICS O NO, ES BUSCA A LA TAULA "promo" EL TOTAL DE POSTS QUE HAN PAGAT UNA PROMOCIÓ I ESTARÁN MOSTRATS A SOBRE DE TOTS ELS POSTS
router.post('/', postCtrl.createPost);
router.get('/posts/allpost', postCtrl.getallPosts);
router.get('/posts/allcomments/:idcomment', postCtrl.getCommentsOfPost);
router.post('/posts/:id/comment', postCtrl.commentPost);
router.delete('/posts/:id', postCtrl.deletePosts);
router.get('/', promoCtrl.getPromoPost);

router.post('/audio', postCtrl.createAudio);
router.get('/audio/:id', postCtrl.getAudio);
//router.get('/audio/:id', postCtrl.deleteAudio);

router.post('/photos', upload.single('image') ,postCtrl.createPhoto);
router.get('/photos/:id', postCtrl.getPhoto);
router.delete('/photos/:id', postCtrl.deletePhoto);

module.exports = router;