const axios = require('axios')
const fs = require('fs')
const path = require('path')
const {
  isValidBase64,
  base64Decode
} = require('./lib/base64.js')
const { getFile } = require('./lib/proxy.js')

const Interval = async () => {
  try {

    // 定时向订阅获取代理 => Si
    getSub('https://linuxdo.dingyue.cc.ua/v2ray', 1000 * 60 * 60 * 1, "Si.txt")
    // 定时向订阅获取代理 => Zn
    // getSub('https://proxy.v2gh.com/https://raw.githubusercontent.com/Pawdroid/Free-servers/main/sub', 1000 * 60 * 60 * 1, "Zn.txt")

  } catch (e) {
    console.log("运行报错！！！")
  }

}

const getSub = (url, time, fileName) => {
  // 定时向订阅获取代理 => Zn
  setInterval(async () => {
    try {
      const file = path.resolve(__dirname, 'data', fileName)
      const res = await axios.get(url)
      if (isValidBase64(res.data)) {
        const data = base64Decode(res.data)
        fs.writeFileSync(file, data)
      } else {
        fs.writeFileSync(file, res.data)
      }
      const Proxies = await deduplicateProxies(fileName)
      if (Proxies) {
        fs.writeFileSync(file, Proxies.join('\n'))
      } else {
        return
      }
      console.log(new Date().toUTCString(), fileName, '任务执行成功！')
    } catch (e) {
      console.log(fileName, "获取失败！！！")
      console.log(e)
    }
  }, time)
}

function deduplicateProxies(file) {
  try {
    const arr = getFile(file)
    if (arr !== false) {
      const data = arr.filter((item, index) => arr.indexOf(item) === index)
      return data
    } else {
      return false
    }
  } catch (e) {
    console.log("去重任务失败")
    console.log(e)
    
    return false
  }

}

module.exports = Interval