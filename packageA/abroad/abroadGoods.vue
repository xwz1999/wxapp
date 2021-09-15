<template>
	<view class="flex flex-direction" style="height: 100%;">
		
		<!-- 搜索导航栏 -->
<!-- 		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap">
					<u-search v-model="keyword" :show-action="true" height="56" @custom="searchGoods"></u-search>
				</view>
			</view>
		</u-navbar> -->
		
		<!-- 筛选导航栏 -->
		<view class="nav-top flex text-center bg-white">
			<view class="flex-sub" @tap="chooseItem(0)">综合</view>
			<view class="flex-sub flex justify-center" @tap="chooseItem(1)">价格<text :class="flag1?'cuIcon-triangledownfill':'cuIcon-triangleupfill'"></text></view>
			<view class="flex-sub flex justify-center" @tap="chooseItem(2)">销量<text :class="flag2?'cuIcon-triangledownfill':'cuIcon-triangleupfill'"></text></view>
			<view class="flex-sub flex justify-center icon" @tap="changePlain">排列<text :class="isBlock?'cuIcon-list':'cuIcon-apps'"></text></view>
		</view>
		
		<!-- 列表为空时 -->
		<view v-if="isNull" class="null flex flex-direction justify-center align-center" style="height: 60vh;">
			<image :src="IMAGE_URL + '/null05.png'"  style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无商品</view>
		</view>
		
		<!-- 商品列表 -->
		<scroll-view v-else class="flex-sub" scroll-y="true" style="height: 0;" @scrolltolower="getGoodsList">
			<view class="goods-box">
				<!-- 单行排列方式 -->
				<goods-list v-if="isBlock" :goodsList="goodsList"></goods-list>
				<!-- 缩略图排列方式 -->
				<large-image-list v-else :goodsList="goodsList"></large-image-list>
			</view>
			<u-loadmore :status="loadStatus" margin-bottom="40" />
		</scroll-view>
	</view>
</template>

<script>
	import goodsList from '@/components/goodsList.vue'
	import largeImageList from '@/components/largeImageList.vue'
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL,
				keyword: "",
				goodsList: [],
				page: 0,
				country_id:null,
				category_id:null,
				country_icon:null,
				
				cate_id: null,
				flag1: true,
				flag2: true,
				brandId: 0,
				stopLoad: false,
				loadStatus: "loadmore", //触底加载状态,
				requestUrl:"",
				order:"",
				isBlock:true,
				isNull:false
			};
		},
		components:{
			goodsList,
			largeImageList
		},
		onLoad(options) {
			uni.setNavigationBarTitle({title:options.category_name})
			this.country_id = Number(options.country_id),
			this.category_id = Number(options.category_id),
			this.country_icon = options.country_icon
			// 进来默认按照综合降序排序
			// this.requestUrl = "/api/v2/app/abroad/view_goods"
				this.requestUrl = "/api/v1/goods/comprehensive/list"
			// this.order="desc"
			
			// //点击品牌进来的
			// if (options.brandId) {
			// 	this.brandId = parseInt(options.brandId)
			// }
			// // 有分类id的则是从分类页过来的
			// if (options.cate_id) {
			// 	this.cate_id = parseInt(options.cate_id)
			// }
			// if (options.keyword) {
			// 	this.keyword = options.keyword
			// }
			this.getGoodsList()
		},
		methods: {
			changePlain(){
				this.isBlock = !this.isBlock
			},
			// chooseItem(i) {
			// 	if (i == 0) {
			// 		this.requestUrl = "/api/v1/goods/comprehensive/list"
			// 		// 为true时排序箭头朝下,为降序
			// 		this.flag1 = this.flag2 = true
			// 		// this.$u.toast("综合排序");
			// 	}
			// 	if (i == 1) {
			// 		this.requestUrl = "/api/v1/goods/price/list"
			// 		this.flag2 = true
			// 		this.flag1 = !this.flag1
			// 		this.flag1?this.order="desc":this.order="asc"
			// 		// this.$u.toast(this.flag1?"价格降序":"价格升序");
			// 	}
			// 	if (i == 2) {
			// 		this.requestUrl = "/api/v1/goods/sales/list"
			// 		this.flag1 = true
			// 		this.flag2 = !this.flag2
			// 		this.flag2?this.order="desc":this.order="asc"
			// 		// this.$u.toast(this.flag2?"销量降序":"销量升序");
			// 	}
			// 	this.page = 0
			// 	this.stopLoad = false
			// 	this.goodsList = []
			// 	this.getGoodsList()
			// },
			// searchGoods() {
			// 	if (!this.keyword) {
			// 		this.$u.toast("请输入关键字");
			// 		return
			// 	}
			// 	this.page = 0
			// 	this.stopLoad = false
			// 	this.goodsList = []
			// 	this.getGoodsList()
			// },
			getGoodsList() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
			// let data = {
			// 	country_id:this.country_id,
			// 	category_id:this.category_id,
			// 	page:{
			// 		limit:20,
			// 		page:this.page
			// 	}
			// }
			let data = {
				country_id:this.country_id,
				secondCategoryID:this.category_id,
				page:this.page,
				user_id:uni.getStorageSync("userInfo").id
			}
				this.$u.post(this.requestUrl, data).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let goodsList = res.data.data
					// console.log(goodsList)
				this.page++
					if (goodsList==null || goodsList.length == 0) {
						this.loadStatus = "nomore"
						this.stopLoad = true
						if(this.page==1){
							this.isNull = true
						}
						return
					}
					//为了防止第一页商品数量不够时scrollview不能触底导致底部一直显示正在加载
					if (goodsList.length < 5) {
						this.loadStatus = "nomore"
					}
					for (let i = 0; i < goodsList.length; i++) {
						goodsList[i].totalSalesVolume = goodsList[i].salesVolume
						goodsList[i].price = goodsList[i].discountPrice
						goodsList[i].primePrice = goodsList[i].originalPrice
						goodsList[i].goodsId = goodsList[i].id
					}
					this.goodsList.push(...goodsList)
				});
			}
		}

	}
</script>

<style lang="scss">
	page {
		width: 100vw;
		height: 100vh;
	}

	.nav-top {
		line-height: 80rpx;
		.icon{
			text{
				font-size: 30rpx;
			}
		}
	}
	
</style>
