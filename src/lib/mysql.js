const mysql = require('mysql2/promise')

/* 
database: {
  host: 'localhost',
  user: 'sub',
  password: '123456',
  database: 'sub',
  port: 48036
} 

mysql_url: username:password@tcp(host:port)/database
*/


class MySQL {
  constructor(mysql_url) {
    this.mysql_url = mysql_url
    this.config = this.init_config(mysql_url)
    this.instance = null
    this.pool = this.init_pool(this.config)
  }

  static getInstance(mysql_url) {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new MySQL(mysql_url)
      return this.instance
    }
  }

  init_config(mysql_url) {
    const regex = /^(.+):(.+)@tcp\(([^:]+):(\d+)\)\/(.+)$/
    const matches = mysql_url.match(regex)
    const config = {
      user: matches[1],
      password: matches[2],
      host: matches[3],
      port: matches[4],
      database: matches[5]
    }
    return config
  }

  init_pool(config) {
    return mysql.createPool(config)
  }

  async query(sql) {
    try {
      // 通过连接池连接数据库
      const connection = await this.pool.getConnection()
      const [rows] = await connection.query(sql)
      this.pool.releaseConnection(connection)
      return Promise.resolve(rows)
    } catch (err) {
      return Promise.reject(err)
    }
  }

}

module.exports = MySQL
