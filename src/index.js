const dotenv = require('dotenv')
const { app } = require('./routes/index.js')
const Logs = require('./lib/log.js')

dotenv.config()

const SERVICE_PORT = process.env.SERVICE_PORT || 8103

app.listen(SERVICE_PORT, async () => {
  Logs.log(`服务运行在: http://localhost:${SERVICE_PORT}`)
})

