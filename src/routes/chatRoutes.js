const express = require('express')
const router = express.Router()

const chatCtrl = require('../controllers/chat.controller.js')
const messageCtrl = require('../controllers/message.controller.js')

// menu/chats

//************************************************MENU VISUAL************************************************//


//BUSQUEDA DE MIS CHATS POR LA ID DE USUARIO, OBTENCION DEL OTRO USUARIO DEL CHAT Y CARGA DEL ÚLTIMO MENSAJE (PARA PODER VERLO SIN ABRIR EL CHAT)
router.get('/', chatCtrl.getChats);
router.get('/', chatCtrl.getUserOfChat);
router.get('/', chatCtrl.chargeLastMessage);

//OBTENCION DE TODOS LOS USUARIOS PARA EL BUSCADOR DE LA PARTE SUPERIOR
router.get('/', chatCtrl.getAllUsers);

//**************************************************FUNCIONS*************************************************//


//****************************NOU CHAT****************************//

//CREACION DE PRIMER MENSAJE PARA USAR SU ID Y INCORPORARLA EN LA CREACION DE UN NUEVO CHAT
router.post('/', messageCtrl.createMessage);
router.post('/', chatCtrl.createChat);


//*************************CHAT EXISTENT*************************//

//COM TENIM ELS CHATS DEL NOSTRE USUARI DESCARREGATS, QUAN SELECCIONEM UN UTILITZAREM LA ID DE LA POSICIÓ PER FER TOTES LES ACCIONS

//OBTENCIÓ DE MISSATGES DEL CHAT SELECCIONAT
router.get('/:chatid/:id', chatCtrl.getMessages);

//ELIMINACIÓ D'UN CHAT CONCRET
router.delete('/:id', chatCtrl.deleteChat);


//*************************DINS DEL CHAT************************//

//CREACIÓ DE MISSATGE A LA TAULA "messages" I INCORPORACIÓ DE LA ID D'AQUEST DINS DE "messageid" DINS DE LA TAULA "chats"
router.post('/:chatid', messageCtrl.createMessage);
router.post('/:chatid', chatCtrl.putMessageInChat);

//EDICIÓ D'UN MISSATGE CONCRET I ELIMINACIÓ D'AQUEST TAMBÉ
router.put('/:chatid/:id', messageCtrl.editMessage);
router.delete('/:chatid/:id', messageCtrl.deleteMessage);

module.exports = router;