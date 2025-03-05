const express = require('express')
const router = express.Router()
const Logs = require('../lib/log.js')

const make_refresh_token = () => {

}

const make_access_token = (refresh_token) => {

}

router.post('/get_refresh_token', (req, res) => {
  const body = req.body
  Logs.log(`获取 refresh_token: ${body}`)
})

router.post('/get_access_token', (req, res) => {

})

module.exports = router