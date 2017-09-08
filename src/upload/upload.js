const Busboy = require('busboy')
const os = require('os')
const fs = require('fs')
const path = require('path')
const mkdirSync = (dirname) => {
  if(fs.existsSync(dirname)) {
    return true
  } else {
    fs.mkdirSync(dirname, '0755')
    return  true
  }
}
const getSuffficName = (fileName) => {
  let arr = fileName.split('.')
  return arr[arr.length-1]
}
const uploadFile = (ctx, options) => {
  let { res, req } = ctx
  let busboy = new Busboy({
    headers: req.headers
  })
  let fileType = options.fileType || 'common'
  let filePath = path.resolve(options.path, fileType)
  console.log(filePath)
  let mkdirResult = mkdirSync(filePath)

  return new Promise( (resolve, reject) => {
    console.log("文件上传中...")
    let result = {
      success: false,
      formData: {}
    }
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) +"."+ getSuffficName(filename)
      let uploadFilePath = path.join(filePath,fileName)
      file.pipe(fs.createWriteStream(uploadFilePath))
      file.on('end', function() {
        result.success = true
        result.message = "upload success!"
        console.log("文件上传成功")
        resolve(result)
      })
    })

    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })
}
module.exports = uploadFile