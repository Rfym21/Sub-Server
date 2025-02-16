// 导入模块
const mysql = require('mysql2/promise')
// 导入配置文件
const config = require('../config/config.js')

// 创建一个数据库连接
const v2apiPool = mysql.createPool(config.database)

// 封装线程池
const v2api = {
  // 接受一条sql语句
  async query(sql) {
    try {
      // 通过连接池连接数据库
      const conn = await v2apiPool.getConnection()
      const [rows] = await conn.query(sql)
      v2apiPool.releaseConnection(conn)
      return Promise.resolve(rows)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

// 登录
const login = (username, password) => {
  const _sql = `select * from users where username="${username}" and password="${password}"`
  return v2api.query(_sql)
}

// 注册
const register = (username, password, nickname) => {  
  const _sql = `insert into users (id, username, password, nickname, level) values ("${new Date().getTime()}", "${username}", "${password}", "${nickname}", "Y")`
  return v2api.query(_sql)
}

// 查找账号
const findUser = (id) => {
  const _sql = `select * from users where id="${id}"`
  return v2api.query(_sql)
}

// 查找用户名
const findUsername = (username) => {
  const _sql = `select * from users where username="${username}"`
  return v2api.query(_sql)
}

// 根据token_body查找对应的token_header
const findToken_header = (token_body) => {
  const _sql = `select * from users where token_body="${token_body}"`
  return v2api.query(_sql)
}

// 给用户注入一个token
const insertToken = (id, token_header, token_body) => {
  const _sql = `update users set token_header="${token_header}" , token_body="${token_body}" where id="${id}"`
  return v2api.query(_sql)
}

// token唯一性验证
const findToken = (id, token_header, token_body) => {
  const _sql = `select * from users where id="${id}" and token_header="${token_header}" and token_body="${token_body}"`
  return v2api.query(_sql)
}

v2api.login = login
v2api.register = register
v2api.findUser = findUser
v2api.insertToken = insertToken
v2api.findToken = findToken
v2api.findToken_header = findToken_header
v2api.findUsername = findUsername

module.exports = {
  v2api,
  login,
  register,
  findUser,
  insertToken,
  findToken,
  findToken_header,
  findUsername
}