const express = require('express');
const morgan = require('morgan');
const DB = require('./database');

const app = express();

//PUERTO DE CONEXIÓN
app.set('port', process.env.PORT || 4000);

//TRADUCCION DE JSONS, HTMLS Y MORGAN
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));


//RUTAS
app.use("/login",require('./routes/loginRoutes.js'))
app.use("/register",require('./routes/registerRoutes.js'))
app.use("/menu/profile",require('./routes/userRoutes.js'))
app.use("/menu/chats",require('./routes/chatRoutes.js'))

module.exports = app;