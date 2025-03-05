const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const tokenRouter = require('./token.js')

app.use(bodyParser.json())
app.use("/", router)
app.use("/token", tokenRouter)

router.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = { app }