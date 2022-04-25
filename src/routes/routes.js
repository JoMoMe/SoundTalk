const { Router } = require('express')
const router = Router()

const fileController = require('../controllers/FileController')

router.get('/', fileController)

module.exports = router