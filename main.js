import Vue from 'vue'
import App from './App'
//引入uview UI
import uView from 'uview-ui';
Vue.use(uView);

import store from './store'
Vue.prototype.$store = store


//全局注册自定义组件
import goodsList from 'components/goodsList.vue'
import orderGoods from 'components/orderGoods.vue'
import dynamics from 'components/dynamics.vue'
import largeImageList from 'components/largeImageList.vue'
Vue.component('goods-list',goodsList)
Vue.component('order-goods',orderGoods)
Vue.component('dynamics',dynamics)
Vue.component('large-image-list',largeImageList)


Vue.prototype.BASE_URL = "https://testapi.reecook.cn"
// Vue.prototype.BASE_URL = "https://api.reecook.cn"
// Vue.prototype.IMAGE_URL = "https://cdn.reecook.cn/static"
Vue.prototype.IMAGE_URL = "https://testcdn.reecook.cn/static"



//保留两位小数的方法
Vue.filter('toFixed',(param,num)=>{
	// console.log(param,typeof param,parseFloat(param))
    return parseFloat(param).toFixed(num);
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/utils/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)


// http接口API集中管理引入部分
// import httpApi from '@/utils/http.api.js'
// Vue.use(httpApi, app)

app.$mount()
