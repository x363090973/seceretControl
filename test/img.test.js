const qiniu = require('qiniu')
var accessKey = 'YQGUO3wZ-SXbo_kw6PrNKUsa5FwlJ1SIPCH6BBbO';
var secretKey = '2SSEcesylQdeZIeGV5lI4xXXT59dHxROcwM1wuXV';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: "script-img-xiangjiacheng",
    deadline : 1000*60*60*24*999,
  };
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;



var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key='小小蚁国/test.png';
const path = require('path')
// 文件上传
formUploader.putFile(uploadToken, key, path.join(__dirname,'./test.png') , putExtra, function(respErr,
respBody, respInfo) {
if (respErr) {
    throw respErr;
}
if (respInfo.statusCode == 200) {
    console.log(respBody);
} else {
    console.log(respInfo.statusCode);
    console.log(respBody);
}
});