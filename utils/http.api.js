/*

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	let index_getImages = (params = {}) => vm.$u.post('/api/v1/activity/list/query', params)
	let index_getActivitys = (params = {}) => vm.$u.post('/api/v1/goods/list/promotion', params)
	let index_getGoodsList = (params = {}) => vm.$u.post('/api/v1/goods/list/promotion/goods', params)



	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		index_getImages,
		index_getActivitys,
		index_getGoodsList,
	};
}

export default {
	install
}


*/