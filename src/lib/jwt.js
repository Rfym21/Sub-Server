const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
var privateKey = fs.readFileSync(path.join(__dirname, 'config', 'private.key'))

class JWT {
  constructor() {
    this.instance = null
    this.privateKey = privateKey
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new JWT()
      return this.instance
    }
  }

  sign(payload, expiresIn) {
    return jwt.sign(payload, this.privateKey, { algorithm: 'RS256', expiresIn })
  }

  verify(token) {
    try {
      const result = jwt.verify(token, this.privateKey, { algorithm: 'RS256' })
      if (result) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }


}

module.exports = JWT
