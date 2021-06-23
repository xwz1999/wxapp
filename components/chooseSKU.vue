<template>
	<view>
		<u-popup v-model="showPop" mode="bottom" border-radius="20" :closeable="true">
			<view class="spec-box">
				<view class="spec-top flex">
					<view class="goods-pic">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+checkedSkuMsg.picUrl" :index="index" height="200" border-radius="10"
						 :loading-img="IMAGE_URL + '/null05.png'"  :error-img="IMAGE_URL + '/null05.png'"  img-mode="aspectFill"></u-lazy-load>
					</view>
					<view class="goods-msg flex-sub">
						<view class="text-black">
							<text>￥<text style="font-size: 36rpx;font-weight: 700;">{{checkedSkuMsg.discountPrice}}</text></text>
							<text style="padding:0 5rpx;" v-if="roleLevel!=500">/</text>
							<text class="text-red" style="font-size: 24rpx;" v-if="roleLevel!=500">赚{{checkedSkuMsg.commission}}</text>
						</view>
						<view style="font-size: 24rpx;color: #AAAAAA;margin: 10rpx 0;">库存 {{checkedSkuMsg.inventory}}件</view>
						<view style="font-size: 24rpx;">已选择:{{checkedSku}}</view>
					</view>
				</view>
				<view class="spec-con">
					<view v-for="(attr,index1) in goodsDetail.attributes" :key="index1">
						<view class="spec-title text-black">{{attr.name}}</view>
						<view class="flex flex-wrap">
							<view class="spec-item" v-for="(item,index2) in attr.children" :key="index2" :class="[item.isShow?'':'noneActive',subIndex[index1]==index2?'spec-checked':'']"
							 @tap="chooseAttr(index1,index2,item.id,item.value)">{{item.value}}</view>
						</view>
					</view>
				</view>
				<view class="goods-num-box flex align-center justify-between">
					<view class="">数量</view>
					<u-number-box v-model="buyNum" :min="1" :input-width="72" :size="24" @change="changeNum"></u-number-box>
				</view>
			</view>
			<view class="spec-btn-box flex justify-center text-white text-center">
				<template v-if="goodsDetail.inventory==0">
					<view class="flex-sub cannot-buy">该商品已售罄</view>
				</template>
				<template v-else>
					<view class="flex-sub buy-now" @tap="$u.throttle(createOrder,1000)">立即购买</view>
				</template>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'choose',
		props: {
			showSpecs: Boolean,
			goodsId: Number
		},
		data () {
			return {
				showPop: false,
				isLogin: false,
				parameterShow: false,
				swiperImgList: [],
				roleLevel: 500,
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				showLoading: true,
				showTip: false,
				id: null,
				current: 0,
				goodsDetail: null,
				pictures: [],
				buyNum: 1, //购买数量
				selectArr: [], //存放被选中的值
				selectName: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				checkedSkuMsg: {}, //选中的规格的全部信息
				checkedSku: "", //选中的规格的名称拼接
				sku_id: 0,
				type: null,
				containerIndex: 0,
				dynamics: [], //动态列表,
				showBtn: false, //是否显示发布按钮
				addressList: [],
				address: null,
				brandFirstImg:'',//图文详情第一张图片
				brandLastImg:'',//图文详情最后一张图片
			}
		},
		created () {
			this.showPop = this.showSpecs
			this.getGoodsDetail()
		},
		watch: {
			showPop (val) {
				if (val === false) {
					this.$emit('closed')
				}
			}
		},
		methods: {
			// 获取商品详情信息
			getGoodsDetail() {
				this.$u.post('/api/v1/goods/detail/summary', {
					userID: uni.getStorageSync("userInfo").id,
					GoodsID: this.goodsId
				}).then(res => {
					console.log(res.data);
					this.showLoading = false
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goodsDetail = res.data.data
					// 商样图片  根据type判断放在什么位置
					if(res.data.data.notice.type === 1){
						this.brandFirstImg = res.data.data.notice.img
						this.brandLastImg = ''
					}else if(res.data.data.notice.type === 2){
						this.brandFirstImg =  ''
						this.brandLastImg =  res.data.data.notice.img
					}else{
						this.brandFirstImg = res.data.data.notice.img
						this.brandLastImg =  res.data.data.notice.img
					}
					// 规格只有一个 默认选中
					if (this.goodsDetail.attributes.length === 1 && this.goodsDetail.attributes[0].children.length === 1) {
						this.selectName[0] = this.goodsDetail.attributes[0].children[0].name
						this.selectArr[0] = this.goodsDetail.attributes[0].children[0].id
						this.subIndex[0] = 0
					}
					if (this.goodsDetail.attributes.length > 1) {
						let arr = []
						if (this.goodsDetail.attributes[0].children[0].id < this.goodsDetail.attributes[1].children[0].id) {
							this.goodsDetail.attributes.forEach((item) => {
								arr.unshift(item)
							})
							this.$set(this.goodsDetail, 'attributes', arr)
						}
					}
					console.log(res.data.data)
					
					this.swiperImgList = res.data.data.mainPhotos
			
					//初始化商品sku信息
					this.initData()
				})
			},
			
			//初始化商品规格sku信息
			initData() {
				// console.log(this.goodsDetail)
				this.checkedSkuMsg = this.goodsDetail.sku[0]
				this.skuPrice = this.goodsDetail.sku[0].discountPrice || ''
				this.skuPhoto = this.IMAGE_URL + this.goodsDetail.sku[0].picUrl
				this.skuStoreCount = this.goodsDetail.sku[0].inventory
				this.checkedSku = "请选择规格"
			
				if (this.goodsDetail.sku.length === 1) {
					this.checkedSku = this.goodsDetail.sku[0].name
					this.sku_id = this.goodsDetail.sku[0].id
					console.log(this.sku_id)
				}
				for (let i in this.goodsDetail.sku) {
					this.shopItemInfo[this.goodsDetail.sku[i].combineId.split(",").reverse().join(",")] = this.goodsDetail.sku[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
				}
				// console.log(this.shopItemInfo)
				this.checkItem();
			},
			
			//选择规格
			chooseAttr(i1, i2, id, name) {
				if (this.selectArr[i1] != id) {
					this.selectName[i1] = name
					this.selectArr[i1] = id
					this.subIndex[i1] = i2
				} else {
					this.selectName[i1] = ""
					this.selectArr[i1] = ""
					this.subIndex[i1] = -1 //去掉选中的颜色
				}
			
				// console.log(this.selectArr,this.subIndex,this.selectName)
				this.checkedSku = this.selectName.join(",")
				this.checkItem();
			},
			checkItem() {
				let option = this.goodsDetail.attributes
				let result = [] //定义数组储存被选中的值
				for (let i in option) {
					result[i] = this.selectArr[i] ? this.selectArr[i] : '';
				}
				console.log(option)
				for (let i in option) {
					let last = result[i]; //把选中的值存放到字符串last去
					for (let k in option[i].children) {
						result[i] = option[i].children[k].id; //赋值，存在直接覆盖，不存在往里面添加id
						option[i].children[k].isShow = this.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
					}
					result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
				}
				// console.log(result)
			
				if (this.shopItemInfo[result]) {
					this.checkedSkuMsg = this.shopItemInfo[result]
					this.sku_id = this.shopItemInfo[result].id
				} else {
					this.sku_id = 0
				}
				this.$forceUpdate(); //重绘
			},
			isMay(result) {
				console.log(this.shopItemInfo, result)
				for (var i in result) {
					if (result[i] == '') {
						return true; //如果数组里有为空的值，那直接返回true
					}
				}
				console.log(this.shopItemInfo[result])
				return this.shopItemInfo[result].inventory == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
			},
			
			createOrder() {
				console.log(this.sku_id)
				console.log(this.checkedSku)
				if (!this.sku_id) {
					this.$u.toast("请选择商品规格")
					return
				}
				let sendData = {
					UserID: uni.getStorageSync("userInfo").id,
					SkuID: this.sku_id,
					SkuName: this.selectName.join('+'),
					Quantity: this.buyNum
				}
				if (uni.getStorageSync("auth").token) {
					if (this.parentId) {
						sendData.ParentID = this.parentId
					}
					// 此时创建普通订单预览
					this.$u.post('/api/v1/order_preview/create', sendData).then(res => {
						console.log(res);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						let preViewMsg = res.data.data
						preViewMsg.isImport = this.goodsDetail.isImport
						this.$store.commit('updatePreOrderMsg', preViewMsg);
						console.log(res.data.data)
						// return
						uni.navigateTo({
							url: "/pages/confirmOrder/confirmOrder"
						})
						this.specModel(false)
					});
				} else {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
					   currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' +currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					console.log(url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
					return false;
				}
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.spec-box {
	padding: 30rpx;

	.spec-top {
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f1f1f1;

		.goods-pic {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}

	.spec-con {
		.spec-title {
			line-height: 80rpx;
		}

		.spec-item {
			border: 2rpx solid transparent;
			background-color: #f1f1f1;
			color: #000;
			border-radius: 8rpx;
			margin: 10rpx 0;
			margin-right: 20rpx;
			padding: 0 25rpx;
			font-size: 26rpx;
			line-height: 50rpx;
		}

		.spec-checked {
			background-color: rgba(201, 34, 25, 0.05);
			color: red;
			border: 2rpx solid red;
		}

		.noneActive {
			background-color: #f9f9f9;
			color: #ddd;
			border: 2rpx solid transparent;
			pointer-events: none;
		}
	}

	.goods-num-box {
		height: 100rpx;
		margin-top: 50rpx;
	}
}

.spec-btn-box {
	padding: 20rpx 30rpx;
	font-size: 32rpx;

	view {
		height: 80rpx;
		line-height: 80rpx;

		&:first-child {
			border-top-left-radius: 40rpx;
			border-bottom-left-radius: 40rpx;
			background-image: linear-gradient(to right, #787978, #5d5e5d);
		}

		&:last-child {
			border-top-right-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
			background-image: linear-gradient(to right, #c6193d, #ff3456);
		}
	}
}

</style>
