const e = require('express');
const Tokens = require('../models/tokens');
const Users = require('../models/users');

exports.validateToken = async (req, res) => {
    try {
            var searchToken = await Tokens.findOne({ token: req.params.token}
            )
            if(searchToken){
                var searchUserOfToken = await Users.updateOne({_id: searchToken.user_id}, {accountactive: 1})
                if (searchUserOfToken){
                    res.json({status: 'Verificación realizada, ya puedes logearte'})
                }
                else{
                    res.json({status: 'Verificación incompleta, la ID del usuario asignado a este token no existe'})
                }
            }
            else{
                res.json({status: 'La verificación no pudo realizarse correctamente, token incorrecto'})
            }
        }
    catch (error){
        console.log(error)
    }
}