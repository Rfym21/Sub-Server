// 验证是否是base64编码
function isValidBase64(str) {
  try {
      return btoa(atob(str)) === str
  } catch (err) {
      return false
  }
}

// base64编码
function base64Encode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1)
  }))
}

// base64解码
function base64Decode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}


module.exports={
  isValidBase64,
  base64Decode,
  base64Encode
}