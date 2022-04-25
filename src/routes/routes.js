const { Router } = require('express')
const router = Router()

const fileController = require('../controllers/FileController')

router.get('/landingpage', fileController)

module.exports = router