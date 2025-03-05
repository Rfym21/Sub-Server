const express = require('express')
const router = express.Router()
const JWT = require('../lib/jwt').getInstance()
const MySQL = require('../lib/mysql').getInstance()

const user_login = async (username, password) => {
  if (!username || !password) {
    return false
  }
}

const user_register = async (username, password) => {
  if (!username || !password) {
    return false
  }


}

const user_logout







module.exports = router
