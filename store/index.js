import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
const store = new Vuex.Store({
	state: {
		selectCity:"",//城市信息
		preOrderMsg: {},//预购订单信息
		returnGoodsMsg:{},//售后商品信息
		logisticsDetail:[],//物流信息
		userInfo:{},//邀请人的信息
		videoDetail:{},//小视频详情
		invitationNo: '' ,// 本人邀请码
		invite: '' // 别人的邀请码
	},
	mutations: {
		changeCity(state, name) {
			state.selectCity = name
		},
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
		},
		setVideoDetail(state,obj){
			let newObj = Object.assign({}, obj)
			state.videoDetail = newObj
		},
		setinvitationNo(state,val){
			state.invitationNo = val
		},
		setinvite(state,val){
			state.invite = val
		}
	}
})
export default store
