const express = require('express');
const morgan = require('morgan');

const app = express();

//CONEXIÓN A BASE DE DATOS MONGODB
const mongoose = require("mongoose");

const uri = "mongodb+srv://Oliver:tarda12341234@soundtalk.eoijz.mongodb.net/SoundTalk?retryWrites=true&w=majority";

try {
  mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},  () =>
    console.log("BD CONECTADA BEBE"));    
}
catch (error) { 
  throw err;
}

//PUERTO DE CONEXIÓN
app.set('port', process.env.PORT || 3077);

//TRADUCCION DE JSONS, HTMLS Y MORGAN
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));


//RUTAS
app.use("/menu/profile",require('./routes/userRoutes.js'))

module.exports = app;