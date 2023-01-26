const express = require('express')
const app = express()
const {userRouter, itemRouter, cartRouter } = require('./routers')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
// Router
app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', cartRouter)



module.exports = app