const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('port', process.env.PORT || 3077)

app.use(morgan('dev'))

app.use(require('./routes/routes'))

module.exports = app