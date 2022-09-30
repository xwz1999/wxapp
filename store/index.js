import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
const store = new Vuex.Store({
	state: {
		selectCity: "", //城市信息
		preOrderMsg: {}, //预购订单信息
		returnGoodsMsg: {}, //售后商品信息
		logisticsDetail: [], //物流信息
		userInfo: {}, //邀请人的信息
		videoDetail: {}, //小视频详情
		invitationNo: '', // 本人邀请码
		invite: '', // 别人的邀请码
		url: null, // 跳转到登录页面时原地址
		roleLevel: 500, //用户等级默认设置会员
		isLogin: false,
		isPifa: false,
		userBrief:{}//
	},
	mutations: {
		setIsLogin(state,val) {
			
			if (uni.getStorageSync("auth").token) {
				state.isLogin = true
			} else {
				state.isLogin = false
			}
		},
		setIsPiFa(state,val) {
			state.isPifa = val
		},
		setRoleLevel(state, val) {
			state.roleLevel = val
		},
		setUserBrief(state, val) {
			state.userBrief = val
		},
		changeCity(state, name) {
			state.selectCity = name
		},
		updatePreOrderMsg(state, obj) {
			let newObj = Object.assign({}, obj)
			state.preOrderMsg = newObj
		},
		setReturnGoodsMsg(state, obj) {
			let newObj = Object.assign({}, obj)
			state.returnGoodsMsg = newObj
		},
		setLogisticsDetail(state, arr) {
			let newArr = arr
			state.logisticsDetail = newArr
		},
		setUserInfo(state, obj) {
			let newObj = Object.assign({}, obj)
			state.userInfo = newObj
		},
		setVideoDetail(state, obj) {
			let newObj = Object.assign({}, obj)
			state.videoDetail = newObj
		},
		setinvitationNo(state, val) {
			state.invitationNo = val
		},
		setinvite(state, val) {
			state.invite = val
		},
		setUrl(state, val) {
			state.url = val
		},
		removeUrl(state) {
			state.url = null
		}
	}
})
export default store
