<template>
	<view>
		<view class="isLoading bg-white flex flex-direction justify-center align-center"
			style="height: 100vh;width: 100vw;" v-if="showLoading">
		</view>
		<view v-if="!isPifa">
			<view class="" v-if="!showLoading">
				<template v-if="cartGoods.length==0">
					<view class="flex flex-direction justify-center align-center" style="width: 100vw;height:80vh;">
						<image :src="IMAGE_URL+'/wxapp/null02.png'" style="width: 300rpx;" mode="widthFix"></image>
						<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">
							购物车空了,快去逛逛吧~
						</view>
					</view>
				</template>
				<template v-else>
					<view class="cart-top flex justify-between bg-white">
						<view style="font-size: 35rpx;color: #000;">购物车({{goodsLength}})</view>
						<view class="" @tap="editCart">{{isEdit?'取消编辑':'编辑商品'}}</view>
					</view>
					<view class="" style="height: 80rpx;"></view>
					<view class="cart-shop-box">
						<view class="cart-shop-item bg-white" v-for="(shop,shopIndex) in cartGoods" :key="shopIndex">
							<view class="shop-name-box flex align-center">
								<text
									:class="shop.shopChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"
									@tap="checkShop(shopIndex)"></text>
								<!-- <image class="shop-logo" :src="IMAGE_URL+shop.brandLogo" mode="widthFix"></image> -->
								<view class="shop-name">{{shop.brandName}}</view>
							</view>
							<view class="cart-goods-box">
								<view class="cart-goods-item flex justify-between align-start"
									v-for="(goods,goodsIndex) in shop.children" :key="goodsIndex">
									<view class="flex align-center" style="height: 200rpx;">
										<text
											:class="goods.goodsChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"
											@tap="checkGoods(shopIndex,goodsIndex)"></text>
									</view>
									<navigator :url="'/pages/goodsDetail/goodsDetail?id='+goods.goodsId"
										class="cart-goods-pic">
										<!-- 		<u-lazy-load threshold="-100" :image="((goods.mainPhotoUrl.split('/'))[0] === 'http:'||(goods.mainPhotoUrl.split('/'))[0] === 'https:')?goods.mainPhotoUrl:(IMAGE_URL+goods.mainPhotoUrl)" 
										:index="index"
											:loading-img="IMAGE_URL + '/wxapp/null05.png'" height="200" border-radius="10"
											:error-img="IMAGE_URL + '/wxapp/null05.png'" img-mode="aspectFill">
										</u-lazy-load> -->
										<u-lazy-load threshold="-100" :image="goods.img" :index="index"
											:loading-img="IMAGE_URL + '/wxapp/null05.png'" height="200"
											border-radius="10" :error-img="IMAGE_URL + '/wxapp/null05.png'"
											img-mode="aspectFill">
										</u-lazy-load>
									</navigator>
									<view class="cart-goods-msg flex-sub">
										<view class="msg-top flex flex-direction justify-between clear align-start">
											<view class="">
												<view class="cart-goods-name">{{goods.goodsName}}</view>
												<text class="cart-goods-spec">{{goods.skuName}}</text>
											</view>
											<!-- <view class="text-red tip">省{{goods.commission}}</view> -->
										</view>
										<view class="msg-bottom flex justify-between"
											style="line-height: 50rpx;padding-top: 15rpx;">
											<view class="flex">
												<text class="text-red"
													style="font-size: 30rpx;">¥{{(goods.price - goods.commission).toFixed(2)}}</text>
												<!-- 										<text
													style="text-decoration: line-through;font-size: 20rpx;margin-left: 5rpx;color: #898989;">¥{{goods.originalPrice}}</text> -->
											</view>
											<!-- 用change事件初次加载会请求多次 -->
											<u-number-box v-model="goods.quantity" :min="1" :max="50" :input-width="72"
												:size="24" @change="changeNum(goods.shoppingTrolleyId,goods.quantity)">
											</u-number-box>

										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="" style="height: 100rpx;"></view>
					</view>

					<view class="cart-bottom bg-white flex justify-between align-center">
						<view class="all-select-box flex align-center" @tap="selectAll">
							<text :class="allChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"></text>
							<view style="font-size: 28rpx;margin-left: 10rpx;">全选</view>
						</view>
						<view class="flex align-center">

							<view class="" style="margin-right: 30rpx;">
								<template v-if="isEdit">
									<view class="">已选择{{totalNum}}件商品</view>
								</template>
								<template v-else>
									<view style="font-size: 28rpx;">合计：￥{{totalPrice}}</view>
									<!-- <view class="text-red" style="font-size: 18rpx;">省{{totalCommission}}</view> -->
								</template>
							</view>
							<button v-if="isEdit" class="cu-btn text-white round bg-red" @tap="delGoods">删除</button>
							<button v-else class="cu-btn text-white round bg-red"
								@tap="creatCartOrder">结算({{totalNum}})</button>
						</view>
					</view>
				</template>
				<!-- 	<view class="split_text">
					猜你喜欢
				</view>
						<large-image-list situation=3 :goodsList="like_goodsList"></large-image-list>	 -->
			</view>
		</view>
		<view v-else>
			<view class="" v-if="!showLoading">
				<template v-if="pifaGoods.length==0">
					<view class="flex flex-direction justify-center align-center" style="width: 100vw;height:80vh;">
						<image :src="IMAGE_URL+'/wxapp/null02.png'" style="width: 300rpx;" mode="widthFix"></image>
						<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">
							购物车空了,快去逛逛吧~
						</view>
					</view>
				</template>
				<template v-else>
					<view class="cart-top flex justify-between bg-white">
						<view style="font-size: 35rpx;color: #000;">进货单({{pifaGoods.length}})</view>
						<view class="" @tap="pifaEditCart">{{isPifaEdit?'完成':'管理'}}</view>
					</view>
					<view class="" style="height: 80rpx;"></view>
					<view class="">
						<view class="cart-shop-item bg-white" style="padding: 20rpx 20rpx;"
							v-for="(goods,goodsIndex) in pifaGoods" :key="goodsIndex">

							<view style="display: flex;">
								<view class="shop-name-box flex align-center">
									<text
										:class="goods.pifaChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"
										@tap="!isPifaEdit?selectedPifa(goodsIndex):editSelectedPifa(goodsIndex)"></text>
								</view>
								<view style="display: flex;flex-direction: column;">
									<view style="display: flex;">
										<view
											style="min-height: 150rpx;min-width: 150rpx;border-radius: 10rpx;margin: 0 20rpx;">

											<u-lazy-load threshold="-100" :image="judgeCover(goods.pic_url)"
												:index="index" :loading-img="IMAGE_URL + '/wxapp/null05.png'"
												height="150" border-radius="10"
												:error-img="IMAGE_URL + '/wxapp/null05.png'" img-mode="aspectFill">
											</u-lazy-load>
										</view>
										<view class=" flex flex-direction justify-between clear align-start" >
											<view class="cart-goods-name">{{goods.goods_name}}</view>
											<text class="cart-goods-spec" >{{goods.min}}件起批 本品按箱批发 一箱={{goods.limit}}件</text>
										</view>
									</view>
									<view style="height: 20rpx;"></view>
									<view
										style=" width: 620rpx; display: flex;align-items: center;flex-direction: row;background-color: #f6f6f6;padding: 20rpx;border-radius: 5rpx;justify-content: space-between;">
										<view style="display: flex;flex-direction: column;">
											<text style="color: #666666;font-size: 24rpx;">规格：{{goods.sku_name}}</text>

											<text
												style="color: #D5101A;font-size: 28rpx;font-weight: bold;margin-top: 10rpx;">批发价:¥{{goods.sale_price}}
												<text
													style="color: #999999;font-size: 20rpx;text-decoration: line-through;font-weight: normal;padding-left: 20rpx;">
													零售价: ¥{{goods.discount_price}}
												</text>
											</text>
										</view>
										<view>
											<u-number-box v-model="goods.quantity" disabled-input=true :min="goods.min"
												:step="goods.limit" :input-width="72" :size="24" bg-color=#fff
												@change="changePifaNum(goods.sku_id,goods.quantity)">
											</u-number-box>
										</view>

									</view>
								</view>


							</view>
						</view>
						<view class="" style="height: 100rpx;"></view>
					</view>

					<view class="cart-bottom bg-white flex justify-between align-center">
						<view v-if="isPifaEdit" class="all-select-box flex align-center" @tap="pifaSelectAll()">
							<text :class="pifaAllChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"></text>
							<view style="font-size: 28rpx;margin-left: 10rpx;">全选</view>
						</view>
						<view v-else>
							
						</view>
						<view class="flex align-center">

							<view class="" style="margin-right: 30rpx;">
								<view v-if="isPifaEdit">
									
								</view>
								<template v-else>
									<view style="font-size: 28rpx;">合计：￥{{pifaTotalPrice}}</view>
									<!-- <view class="text-red" style="font-size: 18rpx;">省{{totalCommission}}</view> -->
								</template>
							</view>
							<button v-if="isPifaEdit" class="cu-btn text-white round bg-red" @tap="delPifaGoods()">删除({{pifaTotalNum}})</button>
							<button v-else class="cu-btn text-white round bg-red"
								@tap="creatCartOrder">结算({{pifaTotalNum}})</button>
						</view>
					</view>
				</template>
				<!-- 	<view class="split_text">
					猜你喜欢
				</view>
						<large-image-list situation=3 :goodsList="like_goodsList"></large-image-list>	 -->
			</view>
		</view>
	</view>
</template>

<script>
	import largeImageList from '@/components/largeImageList.vue'
	export default {
		data() {
			return {
				allChecked: false,
				cartGoods: [],
				IMAGE_URL: this.IMAGE_URL,
				STATIC_URL: this.STATIC_URL,
				isEdit: false,
				totalPrice: 0,
				totalNum: 0,
				selectGoodsIds: [],
				totalCommission: 0,
				showLoading: true,
				like_goodsList: [],
				isPifa: false,
				pifaGoods: [],
				isPifaEdit: false,
				pifaTotalPrice: 0,
				pifaTotalNum: 0,
				selectPifaGoods: [],
				pifaAllChecked:false,
				goodsLength:0
			};
		},
		components: {
			largeImageList
		},
		onShow() {
			this.isPifa = this.$store.state.isPifa
			this.getCartGoods()
			console.log('this.isPifa')
			console.log(this.isPifa)
		},
		onLoad() {
			//this.getGoodsList()
			this.isPifa = this.$store.state.isPifa
		},
		methods: {

			// 判断图片
			judgeCover(val) {
				if (!val) {
					return
				}
				let arr = val.split('/')
				if (arr[0] === 'http:' || arr[0] === 'https:') {
					return val
				}
				return this.IMAGE_URL + val
			},
			// getGoodsList() {
			// 	this.$u.post('/api/v2/app/shopping_cart/view_like_maybe', {
			// 		user_id: uni.getStorageSync("userInfo").id
			// 	}).then(res => {
			// 		if (res.data.code == "FAIL") {
			// 			this.$u.toast(res.data.msg);
			// 			return
			// 		}
			// 		this.like_goodsList = res.data.data
			// 	})
			// },
			editCart() {
				this.isEdit = !this.isEdit
			},
			
			pifaEditCart(){
				if(this.pifaGoods!=[]){
					for (let i = 0; i < this.pifaGoods.length; i++) {
						this.pifaGoods[i].pifaChecked = false
					}
				}
				
				this.isPifaEdit = !this.isPifaEdit
				this.getPifaSelectedGoods()
				this.$forceUpdate()
			},
			changeNum(id, num) {
				this.$u.post('/api/v1/goods/shopping_trolley/quantity/update', {
					UserID: uni.getStorageSync("userInfo").id,
					ShoppingTrolleyId: id,
					Quantity: num
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.getSelectedGoods()
				});
			},
			changePifaNum(id, num) {
				var skuList = [{
					"sku_id": id,
					"quantity": num
				}]
				this.$u.post('/api/v2/app/shop_cart/update', {
					user_id: uni.getStorageSync("userInfo").id,
					sku_list: skuList
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					//this.getSelectedGoods()
					this.getPifaSelectedGoods()
				});
			},

			getCartGoods() {
				if (!this.isPifa) {
					this.$u.post('/api/v1/goods/shopping_trolley/list', {
						UserID: uni.getStorageSync("userInfo").id
					}).then(res => {
						this.showLoading = false
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.cartGoods = res.data.data
						if (this.cartGoods.length != 0) {
							this.allChecked = false
							for (let i = 0; i < this.cartGoods.length; i++) {
								this.cartGoods[i].shopChecked = false
								this.goodsLength+= this.cartGoods[i].children.length
								for (let j = 0; j < this.cartGoods[i].children.length; j++) {
								
									this.cartGoods[i].children[j].goodsChecked = false;
									this.cartGoods[i].children[j].img = this.judgeCover(this.cartGoods[i].children[
											j]
										.mainPhotoUrl);
								}
							}
						}
						this.getSelectedGoods()
						this.$forceUpdate()
						console.log('列表', this.cartGoods)
					});
				} else {
					this.$u.post('/api/v2/app/shop_cart/list', {
						user_id: uni.getStorageSync("userInfo").id
					}).then(res => {
						this.showLoading = false
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.pifaGoods = res.data.data
						if(this.pifaGoods==null){
							this.pifaGoods = []
						}
						console.log('111列表', res.data.data)
						if(this.pifaGoods!=[]){
							if (this.pifaGoods.length != 0) {
								for (let i = 0; i < this.pifaGoods.length; i++) {
									this.pifaGoods[i].pifaChecked = false
								}
							}
						}
						
						this.getSelectedGoods()
						this.$forceUpdate()
						console.log('列表', this.pifaGoods)
					});
				}

			},

			selectedPifa(index) {
				this.selectPifaGoods = []
				for (let i = 0; i < this.pifaGoods.length; i++) {
					if (index != i) {
						this.pifaGoods[i].pifaChecked = false
					} else {
						this.pifaGoods[index].pifaChecked = !this.pifaGoods[index].pifaChecked;
					}
				}
				this.getPifaSelectedGoods()
				this.$forceUpdate()
			},

			editSelectedPifa(index) {
				this.pifaGoods[index].pifaChecked = !this.pifaGoods[index].pifaChecked;
				let checkedCount = 0
				for (let i = 0; i < this.pifaGoods.length; i++) {
					if (this.pifaGoods[i].pifaChecked) {
						checkedCount++
					} else {
						this.pifaAllChecked = false
						break
					}
				}
				if (checkedCount == this.pifaGoods.length) {
					this.pifaAllChecked = true
				}
				console.log('列表', this.selectPifaGoods)
				this.getPifaSelectedGoods()
				this.$forceUpdate()
			},

			// 勾选店铺
			checkShop(s_index) {
				this.cartGoods[s_index].shopChecked = !this.cartGoods[s_index].shopChecked
				for (let i = 0; i < this.cartGoods[s_index].children.length; i++) {
					this.cartGoods[s_index].children[i].goodsChecked = this.cartGoods[s_index].shopChecked
				}

				let checkedCount = 0
				for (let i = 0; i < this.cartGoods.length; i++) {
					if (this.cartGoods[i].shopChecked) {
						checkedCount++
					} else {
						this.allChecked = false
						break
					}
				}
				if (checkedCount == this.cartGoods.length) {
					this.allChecked = true
				}
				this.getSelectedGoods()
				this.$forceUpdate()
			},
			//勾选商品
			checkGoods(s_index, g_index) {
				this.cartGoods[s_index].children[g_index].goodsChecked = !this.cartGoods[s_index].children[g_index]
					.goodsChecked
				let checkedCount = 0
				for (let i = 0; i < this.cartGoods[s_index].children.length; i++) {
					if (!this.cartGoods[s_index].children[i].goodsChecked) {
						this.cartGoods[s_index].shopChecked = this.allChecked = false
						break
					} else {
						checkedCount++
					}
				}
				if (checkedCount == this.cartGoods[s_index].children.length) {
					this.cartGoods[s_index].shopChecked = true
					let checkedCount = 0
					for (let i = 0; i < this.cartGoods.length; i++) {
						if (!this.cartGoods[i].shopChecked) {
							this.allChecked = false
							break
						} else {
							checkedCount++
						}
					}
					if (checkedCount == this.cartGoods.length) {
						this.allChecked = true
					}
				}
				this.getSelectedGoods()
				this.$forceUpdate()
			},
			// 勾选全部
			selectAll() {
				this.allChecked = !this.allChecked
				for (let i = 0; i < this.cartGoods.length; i++) {
					this.cartGoods[i].shopChecked = this.allChecked
					for (let j = 0; j < this.cartGoods[i].children.length; j++) {
						this.cartGoods[i].children[j].goodsChecked = this.allChecked
					}
				}
				this.getSelectedGoods()
				// this.$forceUpdate()
			},
			
			pifaSelectAll(){
				this.pifaAllChecked = !this.pifaAllChecked
	
				for (let i = 0; i < this.pifaGoods.length; i++) {
					this.pifaGoods[i].pifaChecked = this.pifaAllChecked
				}
				this.getPifaSelectedGoods()
				this.$forceUpdate()
			},
			getSelectedGoods() {
				let selectGoodsIds = []
				let totalPrice = 0
				let totalNum = 0
				let totalCommission = 0
				for (let i = 0; i < this.cartGoods.length; i++) {
					for (let j = 0; j < this.cartGoods[i].children.length; j++) {
						if (this.cartGoods[i].children[j].goodsChecked) {
							selectGoodsIds.push(this.cartGoods[i].children[j].shoppingTrolleyId)
							totalNum += this.cartGoods[i].children[j].quantity
							totalPrice += (this.cartGoods[i].children[j].price - this.cartGoods[i].children[j]
								.commission) * (this.cartGoods[i].children[j].quantity)
							totalCommission += (this.cartGoods[i].children[j].commission) * (this.cartGoods[i]
								.children[j]
								.quantity)
						}
					}
				}
				this.totalNum = totalNum
				this.totalPrice = totalPrice.toFixed(2)
				this.selectGoodsIds = selectGoodsIds
				this.totalCommission = totalCommission.toFixed(2)
				// console.log(selectGoodsIds)
			},
			
			getPifaSelectedGoods() {
				let selectGoods = []
				let totalPrice = 0
				let totalNum = 0
				for (let i = 0; i < this.pifaGoods.length; i++) {
						if (this.pifaGoods[i].pifaChecked) {
							selectGoods.push(this.pifaGoods[i])
							totalNum += this.pifaGoods[i].quantity
							totalPrice += (this.pifaGoods[i].sale_price ) * (this.pifaGoods[i].quantity)
						}
				}
				this.selectPifaGoods = selectGoods
				this.pifaTotalNum = totalNum
				this.pifaTotalPrice = totalPrice.toFixed(2)
				console.log(this.selectPifaGoods)
			},
			delPifaGoods() {
				if (this.selectPifaGoods.length == 0) {
					this.$u.toast("至少选择一件商品");
					return
				}
				var skuList = [];
				for (let i = 0; i < this.selectPifaGoods.length; i++) {
					var model = {
						"sku_id":this.selectPifaGoods[i].sku_id,
						"quantity":this.selectPifaGoods[i].quantity,
					}
					skuList.push(model)
				}
				uni.showModal({
					title: '提示',
					content: '确认要删除选择的商品吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v2/app/shop_cart/delete', {
								user_id: uni.getStorageSync("userInfo").id,
								sku_list: skuList
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.showToast({
									title: "删除成功"
								})
								this.getCartGoods()
								// this.posts = res.data.data
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			delGoods() {
				if (this.selectGoodsIds.length == 0) {
					this.$u.toast("至少选择一件商品");
					return
				}
				uni.showModal({
					title: '提示',
					content: '确认要删除选择的商品吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/goods/shopping_trolley/remove', {
								UserID: uni.getStorageSync("userInfo").id,
								TrolleyGoodsIDs: this.selectGoodsIds
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.showToast({
									title: "删除成功"
								})
								this.getCartGoods()
								// this.posts = res.data.data
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			creatCartOrder() {
				if (this.selectGoodsIds.length == 0) {
					this.$u.toast("至少选择一件商品");
					return
				}
				let data = {
					userId: uni.getStorageSync("userInfo").id,
					ids: this.selectGoodsIds
				}
				if (uni.getStorageSync("invite")) {
					data.invite = uni.getStorageSync("invite")
				}
				this.$u.post('/api/v1/order_preview/shopping_trolley/create', data).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let preViewMsg = res.data.data
					this.$store.commit('updatePreOrderMsg', preViewMsg);
					uni.navigateTo({
						url: "../confirmOrder/confirmOrder"
					})
				});

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.split_text {
		text-align: center;
	}

	.cart-top {
		position: fixed;
		width: 100%;
		padding: 0 30rpx;
		line-height: 80rpx;
		top: 0;
		z-index: 1000;
	}

	.cart-shop-item {
		margin: 20rpx;
		padding: 0 20rpx;
		border-radius: 15rpx;

		&:last-child {
			margin-bottom: 200rpx;
		}

		.shop-name-box {
			height: 80rpx;
			font-size: 28rpx;
			color: #0A0001;

			.shop-logo {
				width: 44rpx;
				border-radius: 10rpx;
				margin: 0 10rpx;
			}

			.shop-name {
				margin-left: 10rpx;
				font-size: 32rpx;
			}
		}

		.cart-goods-item {
			padding-bottom: 20rpx;

			.cart-goods-pic {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
				margin: 0 20rpx;
			}

			.msg-top {
				height: 120rpx;
				
			}



			.tip {
				color: #CC1B4F;
				font-size: 18rpx;
				border-radius: 5rpx;
				border: 1rpx solid #CC1B4F;
				line-height: 28rpx;
				padding: 0 8rpx;
			}

			input {
				min-height: 36rpx;
			}
		}
	}

	.cart-goods-name {
		color: #0A0001;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 40rpx;
	}

	.cart-goods-spec {
		padding: 0 10rpx;
		background-color: #EFF1F6;
		color: #666666;
		font-size: 20rpx;
		margin-top: 10rpx;
		display: inline-block;
		line-height: 40rpx;
		border-radius: 10rpx;
	}

	.cart-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);
		z-index: 100;

		button {
			height: 76rpx;
			width: 180rpx;
		}
	}

	.u-checkbox__label.data-v-54acf820 {
		word-wrap: break-word;
		margin: 0 !important;
		color: #606266;
		font-size: 30rpx;
	}

	.cuIcon-roundcheckfill,
	.cuIcon-round {
		font-size: 50rpx;
	}
</style>
