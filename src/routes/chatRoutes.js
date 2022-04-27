const express = require('express')
const router = express.Router()

const chatCtrl = require('../controllers/chat.controller.js')
const messageCtrl = require('../controllers/message.controller.js')

// menu/chats
router.get('/', chatCtrl.getChats);
router.post('/', chatCtrl.createChat);
router.get('/:id', chatCtrl.getChat);
router.delete('/:id', chatCtrl.deleteChat);

router.post('/message', messageCtrl.createMessage);
router.get('/:chatid/message/:id', messageCtrl.getMessage);
router.put('/:chatid/message/:id', messageCtrl.editMessage);
router.delete('/:chatid/message/:id', messageCtrl.deleteMessage);

module.exports = router;