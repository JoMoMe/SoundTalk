const express = require('express');
const morgan = require('morgan');
const DB = require('./database');
const cors = require('cors')
var cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


//PUERTO DE CONEXIÓN DE BACKEND 4001 Y PERMISO DE
//ENTRADA DE PUERTO FRONTEND 3077
app.set('port', process.env.PORT || 4000);
app.use(cors({origin: "142.132.239.200"}))

//TRADUCCION DE JSONS, HTMLS Y MORGAN
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));


//RUTAS
app.set("/login",require('./routes/loginRoutes.js'))
app.set("/login/cookie",require('./routes/cookieRoutes.js'))
app.set("/register",require('./routes/registerRoutes.js'))
app.set("/validate",require('./routes/validateRoutes.js'))
app.set("/rememberpassword",require('./routes/rememberPasswordRoutes.js'))
app.set("/menu",require('./routes/menuRoutes.js'))
app.set("/menu/chats",require('./routes/chatRoutes.js'))
app.set("/menu/profile",require('./routes/userRoutes.js'))

module.exports = app;