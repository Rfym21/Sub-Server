app.get('/proxy', verifyToken(), async ctx => {

  const proxy = await getProxy(ctx.rule, ctx.rules, ctx.number, ctx.level)

  if (proxy === false) {
    ctx.header['Content-Type'] = 'text/html'
    ctx.body = '<h1 style="margin: 200px auto; width: 300px; text-align: center;font-size:48px;">Token无效</h1>'
  } else {
    ctx.body = proxy
  }
})

app.get('/', verifyToken(), async ctx => {
  const res = await axios.get(`${config.subconverter}/sub?target=clash&url=https%3A%2F%2F${config.host}%2Fproxy%3Ftoken%3D${ctx.token_body}&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online_Full_MultiMode.ini`)
  ctx.body = res.data
})

app.get('/files', verifyToken(), async ctx => {
  const files = config.level[ctx.level]

  ctx.body = {
    code: 8200,
    message: '获取成功',
    files
  }
})