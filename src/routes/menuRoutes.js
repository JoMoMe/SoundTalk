const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')
const postCtrl = require('../controllers/post.controller.js')
const promoCtrl = require('../controllers/promo.controller.js')

// /menu

//OBTENIM EL NOSTRE USUARI (getUser), A TRAVÉS D'ELL VEIEM ELS NOSTRES CONTACTES i els busquem per id (getUser), busquem en la seva propietat 
//"postsid" els seus posts (getPost) i busquem a "commentsid" les id dels comentaris, per lo que fem ús de (searchCommentsOfPosts) i els incloim adins
router.get('/', userCtrl.getUser);
router.get('/:id', postCtrl.getPost);
router.get('/:id', postCtrl.searchCommentsOfPosts);

//TENIM DOS SISTEMES D'OBTENCIÓ DE POSTS QUE NO SIGUIN ELS NOSTRES CONTACTES, UN ALEATORI QUE ENS TROBA 10 POSTS DEL TOTAL EXISTENTS (getRandomPosts)
//(AQUEST SISTEMA NOMÉS LI FEM ÚS SI L'USUARI NO TÉ CONTACTES AGENDATS) 
//EL SEGON SISTEMA FUNCIONA TENINT AMICS O NO, ES BUSCA A LA TAULA "promo" EL TOTAL DE POSTS QUE HAN PAGAT UNA PROMOCIÓ I ESTARÁN MOSTRATS A SOBRE DE TOTS ELS POSTS
router.get('/', postCtrl.getRandomPosts);
router.get('/', promoCtrl.getPromoPost);

//QUAN FEM CLICK A UN POST, PUJEM EL COMENTARI/LIKE/COMPARTIT
router.post('/', postCtrl.createPost);
router.post('/:id', postCtrl.commentPost);
router.put('/:id', postCtrl.commentIDInPost);

module.exports = router;