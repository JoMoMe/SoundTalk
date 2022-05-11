const express = require('express');
const morgan = require('morgan');
const DB = require('./database');
const cors = require('cors')
var cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


//PUERTO DE CONEXIÓN DE BACKEND 4001 Y PERMISO DE
//ENTRADA DE PUERTO FRONTEND 3077
app.set('port', process.env.PORT || 4005);
app.use(cors({origin: "http://localhost:4002"}))

//TRADUCCION DE JSONS, HTMLS Y MORGAN
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));


//RUTAS
app.use("/login",require('./routes/loginRoutes.js'))
app.use("/login/cookie",require('./routes/cookieRoutes.js'))
app.use("/register",require('./routes/registerRoutes.js'))
app.use("/validate",require('./routes/validateRoutes.js'))
app.use("/rememberpassword",require('./routes/rememberPasswordRoutes.js'))
app.use("/menu",require('./routes/menuRoutes.js'))
app.use("/menu/chats",require('./routes/chatRoutes.js'))
app.use("/menu/profile",require('./routes/userRoutes.js'))

module.exports = app;