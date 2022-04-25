const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('port', process.env.PORT || 3077)

app.use(morgan('dev'))

app.use("/landingpage",require('./routes/routes.js'))
app.use("/register",require('./routes/registerRoutes.js'))
app.use("/menu/profile",require('./routes/userRoutes.js'))


module.exports = app