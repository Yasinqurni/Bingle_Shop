const express = require('express')
const app = express()
const userRouter = require('./routers/user.router')

// Middleware: request -> middleware -> controller/handler
app.use(express.json()) // contoh fungsi express.json()

// Router
app.use('/v1', userRouter)

// Design Pattern

// Model (sequelize)


module.exports = app