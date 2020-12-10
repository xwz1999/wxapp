/*

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	let getIndexImage = (params = {}) => vm.$u.post('/api/v1/activity/list/query', params)
	let getIndexActivity = (params = {}) => vm.$u.post('/api/v1/goods/list/promotion', params)
	let getIndexGoodsList = (params = {}) => vm.$u.post('/api/v1/goods/list/promotion/goods', params)
	let getRankList1 = (params = {}) => vm.$u.post("/api/v1/goods/recook_make/list", params)



	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getIndexImage,
		getIndexActivity,
		getIndexGoodsList,
		getRankList1
	};
}

export default {
	install
}


*/