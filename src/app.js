const express = require('express');
const morgan = require('morgan');
const DB = require('./database');
const cors = require('cors')

const app = express();

//PUERTO DE CONEXIÓN DE BACKEND 4001 Y PERMISO DE
//ENTRADA DE PUERTO FRONTEND 3077
app.set('port', process.env.PORT || 4001);
app.use(cors({origin: "http://localhost:3077"}))

//TRADUCCION DE JSONS, HTMLS Y MORGAN
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));


//RUTAS
app.use("/login",require('./routes/loginRoutes.js'))
app.use("/register",require('./routes/registerRoutes.js'))
app.use("/rememberpassword",require('./routes/rememberPasswordRoutes.js'))
app.use("/menu",require('./routes/menuRoutes.js'))
app.use("/menu/chats",require('./routes/chatRoutes.js'))
app.use("/menu/profile",require('./routes/userRoutes.js'))

module.exports = app;