import co from 'co'
import OSS from 'ali-oss'

const OSSConfig = {
  uploadHost: 'zmhx.oss-cn-beijing.aliyuncs.com',
  uploadProtocol: 'http://',
  type: 'scs',
  ossParams: {
    region: 'oss-cn-beijing',
    success_action_status: '200', // 默认200
    accessKeyId: 'LTAI5tCePnicpEFgTZhr5uv2',
    accessKeySecret: 'rXkIFkwRBzBKqGOnKshCVjofwjIEZ2',
    bucket: 'zmhx'
  }
}

function random_string(len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function thisTime() {
  var nowDate = new Date()
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1
  var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
    .getDate()
  var dateStr = year + '-' + month + '-' + day
  return dateStr
}

/**
 *
 * @param event 上传图片的资源路径
 * @param type 图片资源类型
 * @param dir oss要保存的文件夹
 * @returns {OSS文件路径}
 */

function uploadOSS(event, dir = 'api/images/', type = 0) {
	
  return new Promise((resolve, reject) => {
    var client = new OSS({
      region: OSSConfig.ossParams.region,
      accessKeyId: OSSConfig.ossParams.accessKeyId,
      accessKeySecret: OSSConfig.ossParams.accessKeySecret,
      bucket: OSSConfig.ossParams.bucket
    })
    var file
    if (type == 0) {
      file = event
    } else {
      file = event.target.files[0]
    }
    const date = thisTime()
    const randomName = `${dir}${date}/${random_string(16)}${new Date().getTime() / 1000}.${file.name.substring(file.name.lastIndexOf('.') + 1)}`

    co(function * () {
      var result = yield client.multipartUpload(randomName, file)
      resolve(`${OSSConfig.uploadProtocol}${OSSConfig.uploadHost}/${result.name}`)
    }).catch(function(err) {
      reject(err)
    })
  })
}

export { uploadOSS }
