const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path')

const userCtrl = require('../controllers/user.controller.js')
const postCtrl = require('../controllers/post.controller.js')

//TRATAMIENTO DE IMAGENES PARA FOTO DE PERFIL
const storage = multer.diskStorage({
    destination: './photo',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

// menu/profile
router.get('/user/:id', userCtrl.getUsersofPosts);
router.put('/edit/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);
//router.get('/', postCtrl.getPost);
router.put('/:id', postCtrl.editPosts);
router.delete('/:id', postCtrl.deletePosts);
router.post('/profilephoto', upload.single('image') ,postCtrl.createPhoto);
router.get('/profilephoto/:id', postCtrl.getPhoto);

module.exports = router;