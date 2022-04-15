import Vue from 'vue'
import App from './App'
//引入uview UI
import uView from 'uview-ui';
Vue.use(uView);
// 引入过滤器
import * as filters from 'plugins/filters.js'

import store from './store'
Vue.prototype.$store = store

//全局注册自定义组件
import goodsList from 'components/goodsList.vue'
import orderGoods from 'components/orderGoods.vue'
import largeImageList from 'components/largeImageList.vue'
import tipModel from 'components/userTipModel.vue'
import Progress from 'components/Progress.vue'
Vue.component('Progress', Progress)
Vue.component('tip-model', tipModel)
Vue.component('goods-list', goodsList)
Vue.component('order-goods', orderGoods)
Vue.component('large-image-list', largeImageList)
// 测试域名
Vue.prototype.BASE_URL = "https://testapi.zjycshop.com"
Vue.prototype.IMAGE_URL = "https://testcdn.zjycshop.com/static"
Vue.prototype.H5_BASE_URL = "https://testh5.zjycshop.cn"
// 正式域名
Vue.prototype.BASE_URL = "https://jyyapi.reecook.cn"
Vue.prototype.IMAGE_URL = "https://jyycdn.reecook.cn/static"
Vue.prototype.H5_BASE_URL = "https://jyyh5.reecook.cn"
//小程序静态资源存储地址（由于小程序代码包大小限制，比较大的静态资源图片放在了宝塔上对应域名下的recook-weapp文件夹里面）
Vue.prototype.STATIC_URL = Vue.prototype.IMAGE_URL + "/recook-weapp/"

//腾讯地图key
Vue.prototype.MAP_KEY = "SPVBZ-2EXWJ-WTEFC-K7ANJ-VG7G6-V7FQ6"
//过滤器 保留两位小数
Vue.filter('toFixed', (param, num) => {
	// console.log(param,typeof param,parseFloat(param))
	if(!param){
		return '0.00';
	}
	return parseFloat(param).toFixed(num);
})
//全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

// http拦截器，此为需要加入的内容
import httpInterceptor from '@/utils/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)


// http接口API集中管理引入部分
// import httpApi from '@/utils/http.api.js'
// Vue.use(httpApi, app)

app.$mount()
