var CryptoJS = require('./aes.js').CryptoJS; //引用AES源码js
var MD5 = require('./md5.js').md5;

import { JSEncrypt } from 'wxmp-rsa'
// 定义公钥
const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzNWyjYe3qt4YRTDwANxD
  PNLAJ9TZBuHsSqSjJM5B35fABwN3gwm5Q/SCz/6kgKTqeSgCVPFYhO/zOD6G8K7E
  JLgx95ZIeAB9EkW+xrhFDDthUZAkA03zHJO6SkFKOciLFVi94BdCdGlNFlnaBBqA
  +8XvCpD1V8DFc/9cpb5icZvngu8vEkwkbYceCXKUMNxoXY/E2cFe8f2tVFR5pRkQ
  gRLbM70jt4yBGOD8pbuk6fcnD7ghGWgzMq/845N3wISSTp/gAQg8403Fk+8AoL+F
  KgxUkjUOpPI2XrcpQm0EphuAX4J0Xvo3Hu6TEPZYyqULEXGT2Jukmh0NSkNO0F39
  xwIDAQAB
  -----END PUBLIC KEY-----
`
//加密
function Encrypt(pargam) {
	let word = JSON.stringify(pargam)
	let keyStr = new Date().getTime()
	keyStr = MD5(keyStr)
	var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key ,{ mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
	const myEncrypt = new JSEncrypt()
	myEncrypt.setPublicKey(publicKey)
	key = myEncrypt.encryptLong(keyStr)
	return {key: key, body: encrypted.toString()}
}
//解密方法 word待解密数据,keyStr密钥
function Decrypt(word, keyStr) {
	keyStr = keyStr ? keyStr : `3sd&d24h@$udD2s*`;
	var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
	var decrypt = CryptoJS.AES.decrypt(word, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt = Encrypt;
