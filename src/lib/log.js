class Logs {
  constructor() {
    
  }

  static log(message) {
    console.log(this.makeMessage(message))
  }

  static error(message) {
    console.error(this.makeMessage(message))
  }

  static warn(message) {
    console.warn(this.makeMessage(message))
  }
  
  static makeMessage(message) {
    return `[${new Date().toLocaleString()}]: ${message}`
  }
  
}

module.exports = Logs
