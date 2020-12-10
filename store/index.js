import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
const store = new Vuex.Store({
	state: {
		preOrderMsg: {},//预购订单信息
		returnGoodsMsg:{},//售后商品信息
		logisticsDetail:[],//物流信息
		userInfo:{}//邀请人的信息
	},
	mutations: {
		updatePreOrderMsg(state, obj) {
			let newObj = Object.assign({}, obj)
			state.preOrderMsg = newObj
		},
		setReturnGoodsMsg(state,obj){
			let newObj = Object.assign({}, obj)
			state.returnGoodsMsg = newObj
		},
		setLogisticsDetail(state,arr){
			let newArr = arr
			state.logisticsDetail = newArr
		},
		setUserInfo(state,obj){
			let newObj = Object.assign({}, obj)
			state.userInfo = newObj
		}
	}
})
export default store
