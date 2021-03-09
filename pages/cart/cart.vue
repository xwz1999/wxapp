<template>
	<view>
		<view class="isLoading bg-white flex flex-direction justify-center align-center" style="height: 100vh;width: 100vw;" v-if="showLoading">
			<!-- <image src="/static/loading-white.gif" mode="widthFix" style="width:500upx"></image> -->
		</view>
		<view class="" v-else>
			<template v-if="cartGoods.length==0">
				<view class="flex flex-direction justify-center align-center" style="width: 100vw;height:80vh;">
					<image :src="STATIC_URL+'null02.png'" style="width: 300rpx;" mode="widthFix"></image>
					<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">购物车空了,快去逛逛吧~</view>
				</view>
			</template>
			<template v-else>
				<view class="cart-top flex justify-between bg-white">
					<view class=""></view>
					<view class="" @tap="editCart">{{isEdit?'取消编辑':'编辑商品'}}</view>
				</view>
				<view class="" style="height: 80rpx;"></view>
				<view class="cart-shop-box">
					<view class="cart-shop-item bg-white" v-for="(shop,shopIndex) in cartGoods" :key="shopIndex">
						<view class="shop-name-box flex align-center">
							<text :class="shop.shopChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'" @tap="checkShop(shopIndex)"></text>
							<image class="shop-logo" :src="IMAGE_URL+shop.brandLogo" mode="widthFix"></image>
							<view class="shop-name">{{shop.brandName}}</view>
						</view>
						<view class="cart-goods-box">
							<view class="cart-goods-item flex justify-between align-start" v-for="(goods,goodsIndex) in shop.children" :key="goodsIndex">
								<view class="flex align-center" style="height: 200rpx;">
									<text :class="goods.goodsChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'" @tap="checkGoods(shopIndex,goodsIndex)"></text>
								</view>
								<navigator :url="'/pages/goodsDetail/goodsDetail?id='+goods.goodsId" class="cart-goods-pic">
									<u-lazy-load threshold="-100" :image="IMAGE_URL+goods.mainPhotoUrl" :index="index" :loading-img="IMAGE_URL + '/null05.png'"  height="200" border-radius="10" :error-img="IMAGE_URL + '/null05.png'"  img-mode="aspectFill"></u-lazy-load>
								</navigator>
								<view class="cart-goods-msg flex-sub">
									<view class="msg-top flex flex-direction justify-between clear align-start">
										<view class="">
											<view class="cart-goods-name">{{goods.goodsName}}</view>
											<text class="cart-goods-spec">{{goods.skuName}}</text>
										</view>
										<view class="text-red tip">赚{{goods.commission}}</view>
									</view>
									<view class="msg-bottom flex justify-between" style="line-height: 50rpx;padding-top: 15rpx;">
										<view class="flex">
											<text class="text-red" style="font-size: 30rpx;">¥{{goods.price}}</text>
											<text style="text-decoration: line-through;font-size: 20rpx;margin-left: 5rpx;color: #898989;">¥{{goods.originalPrice}}</text>
										</view>
										<!-- 用change事件初次加载会请求多次 -->
										<u-number-box v-model="goods.quantity" :min="1" :max="50" :input-width="72" :size="24"
										 @change="changeNum(goods.shoppingTrolleyId,goods.quantity)"></u-number-box>
			
									</view>
								</view>
							</view>
						</view>
					</view>
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
								<view class="text-red" style="font-size: 18rpx;">赚{{totalCommission}}</view>
							</template>
						</view>
						<button v-if="isEdit" class="cu-btn text-white round bg-red" @tap="delGoods">删除</button>
						<button v-else class="cu-btn text-white round bg-red" @tap="creatCartOrder">结算({{totalNum}})</button>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allChecked: false,
				cartGoods: [],
				IMAGE_URL: this.IMAGE_URL,
				STATIC_URL:this.STATIC_URL,
				isEdit: false,
				totalPrice: 0,
				totalNum: 0,
				selectGoodsIds: [],
				totalCommission: 0,
				showLoading:true
			};
		},
		onShow() {
			this.getCartGoods()
		},
		methods: {
			editCart() {
				this.isEdit = !this.isEdit
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
			getCartGoods() {
				this.$u.post('/api/v1/goods/shopping_trolley/list', {
					UserID: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
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
							for (let j = 0; j < this.cartGoods[i].children.length; j++) {
								this.cartGoods[i].children[j].goodsChecked = false
							}
						}
					}
					this.getSelectedGoods()
					this.$forceUpdate()
					console.log(this.cartGoods)
				});
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
				this.cartGoods[s_index].children[g_index].goodsChecked = !this.cartGoods[s_index].children[g_index].goodsChecked
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
							totalPrice += (this.cartGoods[i].children[j].price) * (this.cartGoods[i].children[j].quantity)
							totalCommission += (this.cartGoods[i].children[j].commission) * (this.cartGoods[i].children[j].quantity)
						}
					}
				}
				this.totalNum = totalNum
				this.totalPrice = totalPrice.toFixed(2)
				this.selectGoodsIds = selectGoodsIds
				this.totalCommission = totalCommission.toFixed(2)
				// console.log(selectGoodsIds)
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
				this.$u.post('/api/v1/order_preview/shopping_trolley/create', {
					userId: uni.getStorageSync("userInfo").id,
					ids: this.selectGoodsIds
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let preViewMsg = res.data.data
					this.$store.commit('updatePreOrderMsg',preViewMsg);
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
				height: 200rpx;
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
		font-size: 40rpx;
	}
</style>
