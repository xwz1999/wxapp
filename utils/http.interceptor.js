//引入
const Encrypt = require('./cryptojs.js').Encrypt;
const Decrypt = require('./cryptojs.js').Decrypt;

///解密  Encrypt(待加密数据)    Decrypt(待解密数据)
// Encrypt(data)
// Decrypt(data)


const install = (Vue, vm) => {
	console.log( Vue.prototype.BASE_URL)
	Vue.prototype.$u.http.setConfig({
		baseUrl: Vue.prototype.BASE_URL,
		loadingText: '努力加载中~',
		loadingTime: 5000,
		// 设置自定义头部content-type
		header: {
			'content-type': 'application/json'
			// 后台接口是从app转移的,参数加密过的所以改成form-data格式传参
			// 'content-type': 'multipart/form-data;boundary=XXX'
		}
		// ......
	});
	
	
	// 小程序直接设置content-type为''multipart/form-data;'无效，故需要手动封装form-data；XXX为边界值
	//content-type为form-data 需要处理传参格式
	// Vue.prototype.dealSendData = (obj = {})=> {
	// 	let result = ''
	// 	for (let name of Object.keys(obj)) {
	// 		let value = obj[name];
	// 		result +=
	// 			'\r\n--XXX' +
	// 			'\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
	// 			'\r\n' +
	// 			'\r\n' + value
	// 	}
	// 	return result + '\r\n--XXX--'
	// }
	
	
	
	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// if(!uni.getStorageSync('auth')){
		// 	console.log("未登录")
		// }
		const id = uni.getStorageSync('auth').id
		const token = uni.getStorageSync('auth').token
		config.header["X-Recook-ID"] = id
		config.header["X-Recook-Token"] = token
		config.header["Device-Type"] = "wxapp"
		// console.log("请求参数为========",config.data)
		config.data = Encrypt(config.data)
	}
	// 响应拦截
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.code=="FAIL"){
			vm.$u.toast(res.msg);
			return false
		}
		if (res.data.msg == "游客无法使用该功能，请登录"||res.data.msg == "登录失效") {
			console.log("响应拦截")
			vm.$u.toast(res.data);
			setTimeout(() => {
				vm.$u.route('/pages/login/login')
			}, 1500)
			return false;
		}else{
			return res;
		}
	}
	
}

export default {
	install
}
