// ---------------------------------以下为服务配置---------------------------------
const koa = require('koa')
const app = new koa()
const cors = require('@koa/cors')
const router = require('@koa/router')()
const token = require('./token.js')
const users = require('./users.js')
const { verifyToken } = require('./lib/jwt.js')
const { getProxy } = require('./lib/proxy.js')
const axios = require('axios')
const { bodyParser } = require("@koa/bodyparser")
const interval = require('./interval.js')
const config = require('./config/config.js')



// ---------------------------------以下为服务启动---------------------------------
app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(token.routes())
app.use(token.allowedMethods())
app.use(users.routes())
app.use(users.allowedMethods())


app.listen(8103, async () => {
  console.log('服务在端口8103上启动成功!')
  await interval()
  console.log('定时任务启动成功!')
})

// ---------------------------------以下为路由配置---------------------------------

router.get('/proxy', verifyToken(), async ctx => {

  const proxy = await getProxy(ctx.rule, ctx.rules, ctx.number, ctx.level)

  if (proxy === false) {
    ctx.header['Content-Type'] = 'text/html'
    ctx.body = '<h1 style="margin: 200px auto; width: 300px; text-align: center;font-size:48px;">Token无效</h1>'
  } else {
    ctx.body = proxy
  }
})

router.get('/', verifyToken(), async ctx => {
  const res = await axios.get(`${config.subconverter}/sub?target=clash&url=https%3A%2F%2F${config.host}%2Fproxy%3Ftoken%3D${ctx.token_body}&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online_Full_MultiMode.ini`)
  ctx.body = res.data
})

router.get('/files', verifyToken(), async ctx => {
  const files = config.level[ctx.level]

  ctx.body = {
    code: 8200,
    message: '获取成功',
    files
  }
})