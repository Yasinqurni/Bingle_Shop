const express = require('express')
const app = express()
const {userRouter, itemRouter, cartRouter, orderRouter } = require('./routers')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
// Router
app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', cartRouter)
app.use('/v1', orderRouter)

//error handler
app.use((err, req, res, next) => {
    console.log(err)

    const status = err.status || 500
    const error = err.error || err.message || 'Internal server error'

    return res.status(status).json({
        status: false,
        data: {},
        error: error
    })
})

module.exports = app