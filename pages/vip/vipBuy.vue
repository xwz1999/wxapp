<template>
	<view>
		<view class="back" @tap="back">
			<text class="cuIcon-home" v-if="type=='share'"></text>
			<text class="cuIcon-back" v-else></text>
		</view>
		<view class="top" :style="'background-image:url('+IMAGE_URL+'/wxapp/vip/3.png);'">
			<view class="box" :style="'background-image:url('+IMAGE_URL+'/wxapp/vip/2.png);'">
				<image class="l" :src="IMAGE_URL+'/wxapp/vip/1.png'" mode="widthFix" />
				<view class="r">
					<view class="t1">VIP店铺权益卡</view>
					<view class="t2">开通即享8大特权，惊喜福利等你解锁</view>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="title">权益介绍</view>
			<view class="box" v-for="i in list">
				<image class="l" :src="i.icon" />
				<view class="r">
					<view class="t1"> {{i.title}} </view>
					<view class="t2">{{i.text}} </view>
				</view>
			</view>
			<view class="purchase" :class="vipIsUsed?'grid3':'grid4'">
				<view class="card" :class="vipSel===-1?'cardSel':''" v-if="!vipIsUsed" @click="vipSel=-1">
					<view class="card1">
						<view class="name_">
							7日卡
						</view>
						<view class="price">
							<span class="unit">¥</span>0
						</view>
						<view class="discount" style="visibility: hidden;">
							原价¥0
						</view>
						<view class="calculate">
							仅限一次
						</view>
					</view>
				</view>
				<view class="card" :class="vipSel===I?'cardSel':''" v-for="(i,I) in vipList" @click="vipSel=I">
					<view class="card1">
						<view class="name_">
							{{i.sku_name.slice(-2)}}
						</view>
						<view class="price">
							<span class="unit">¥</span>{{i.discount_price}}<span class="unit">/{{['月','季','年'][I]}}</span>
						</view>
						<view class="discount" :style="i.coupon?'':'visibility: hidden;'">
							原价¥{{i.discount_price+i.coupon}}
						</view>
						<view class="calculate">
							折合¥{{(i.discount_price/(i.effect_time*30)).toFixed(1)}}/天
						</view>
					</view>
				</view>
			</view>
			<button class="confirm" @click="confirm">{{vipSel === -1 ? '立即领取':'立即购买'}}</button>
			<view class="notify">
				<image class="icon" :src="IMAGE_URL+'/wxapp/vip/12.png'" mode="widthFix" />
				<view class="n1">安心保障｜</view>
				<view class="n2">不自动续费 无任何附带扣费项目 无广告无插件</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				type: null,
				list: [{
						title: '底价批发',
						text: 'VIP店铺可享受平台数字化底价批发进货的权益。线上进货，各大品牌随你挑选，想进多少货你说了算。最低一件起批，避免囤货压资金；打破线下五公里生活圈的地域壁垒；不再受品牌授权期限制约；没有年采购 销售指标考核',
						icon: this.IMAGE_URL + "/wxapp/vip/4.png"
					},
					{
						title: '0元创业平台',
						text: '零成本、零库存、零风险、零门槛创业',
						icon: this.IMAGE_URL + "/wxapp/vip/5.png"
					},
					{
						title: '在线选品商城',
						text: '让销售场景无处不在，助力用户一键打造私属商城',
						icon: this.IMAGE_URL + "/wxapp/vip/6.png"
					},
					{
						title: 'VIP店铺专属折扣',
						text: '享受VIP店铺专属折扣价，下单直降',
						icon: this.IMAGE_URL + "/wxapp/vip/7.png"
					},
					{
						title: '智能导购系统',
						text: '全面提高客户卖货积极性，促进零售线上线下融合',
						icon: this.IMAGE_URL + "/wxapp/vip/8.png"
					},
					{
						title: 'SCRM客户资源管理',
						text: '会员精准化营销，提升客户忠诚度',
						icon: this.IMAGE_URL + "/wxapp/vip/9.png"
					},
					{
						title: '全面领先的数据分析',
						text: '多角度、多方位分析店铺经营状况，助力提高销量',
						icon: this.IMAGE_URL + "/wxapp/vip/10.png"
					},
					{
						title: '正品保障',
						text: '共享京东优选好货，品质过硬，正品有保障',
						icon: this.IMAGE_URL + "/wxapp/vip/11.png"
					}
				],
				vipIsUsed: false,
				vipList: [],
				vipSel: -1,
			};
		},

		onLoad(options) {
			console.log('页面参数options：', options);
			if (undefined != options.invite && options.invite) {
				this.invite = options.invite
				this.$store.commit('setinvite', options.invite);
				uni.setStorageSync("invite", options.invite)
			}
			if (options.type) {
				this.type = options.type
			}
			this.initData()
		},
		methods: {
			async initData() {
				this.vipList = (await this.$u.post("/api/v2/app/vip/goods")).data.data
				this.vipIsUsed = (await this.$u.post("/api/v2/app/vip/is_used")).data.data.is_used
				if (this.vipIsUsed) {
					this.vipSel = 0
				}
			},
			back() {
				if (this.type == "share") {
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					uni.navigateBack()
				}
			},
			confirm() {
				if (this.vipSel === -1) {
					uni.showModal({
						title: '7日卡领取提醒',
						content: 'VIP7日体验卡将在领取后开始使用，每个账号仅限一次，是否领取',
						success: (res) => {
							if (res.confirm) {
								this.$u.post('/api/v2/app/vip/active').then(res => {
									if (res.data.code == "FAIL") {
										this.$u.toast(res.data.msg, 2000);
										return
									}
									this.$u.toast('领取成功！', 2000);
									this.vipIsUsed = false
								})
							}
						}
					});
					return
				}
				let SkuID = this.vipList[this.vipSel].sku_id
				let SkuName = this.vipList[this.vipSel].sku_name
				this.createOrder(SkuID, SkuName)
			},
			createOrder(SkuID, SkuName) {
				let sendData = {
					UserID: uni.getStorageSync("userInfo").id,
					SkuID,
					SkuName,
					Quantity: 1
				}
				if (uni.getStorageSync("auth").token) {
					if (uni.getStorageSync("invite")) {
						sendData.invite = uni.getStorageSync("invite")
					}

					// 此时创建普通订单预览
					console.log('/order_preview/create:', sendData);
					this.$u.post('/api/v1/order_preview/create', sendData).then(res => {
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.$u.post('/api/v1/order/submit', {
							userId: uni.getStorageSync("userInfo").id,
							previewOrderId: res.data.data.id
						}).then(res1 => {
							console.log(res1.data);
							if (res1.data.code == "FAIL") {
								this.$u.toast(res1.data.msg, 2000);
								return
							}
							this.$u.post('/api/v1/pay/wxminipay/order/create', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: res1.data.data.id,
								// wxType:"recook-weapp"
							}).then(res2 => {
								console.log(res2);
								if (res2.data.code == "FAIL") {
									this.$u.toast(res2.data.msg);
									return
								}
								let result = res2.data.data
								wx.requestPayment({
									timeStamp: result.timestamp,
									nonceStr: result.noncestr,
									package: result.package,
									signType: 'MD5',
									paySign: result.sign,
									success: (res3) => {
										console.log(res3)
										this.$u.toast('支付完成！', 2000);
									},
									fail: (err) => {
										console.log(err)
										this.$u.toast('支付失败！', 2000);
										// this.$u.toast(err);
									}
								})

							});


						});
					})
					// 此时创建普通订单预览
					// 			console.log('/order_preview/create:',sendData);
					// 			this.$u.post('/api/v1/order_preview/create', sendData).then(res => {
					// 				if (res.data.code == "FAIL") {
					// 					this.$u.toast(res.data.msg);
					// 					return
					// 				}
					// 			this.$u.post('/api/v1/order/submit', {
					// 				userId: uni.getStorageSync("userInfo").id,
					// 				previewOrderId: res.data.data.id
					// 			}).then(res1 => {
					// 				console.log(res1.data);
					// 				if (res1.data.code == "FAIL") {
					// 					this.$u.toast(res1.data.msg, 2000);
					// 					return
					// 				}
					// 				let orderDetail = res1.data.data
					// 				let msg = res1.data.msg
					// 				// this.$store.commit('setOrderDetail',orderDetail);
					// 				//提交成功
					// 				uni.redirectTo({
					// 					url: "../orderPay/orderPay?orderId=" + orderDetail.id,
					// 					// url: "../orderDetail/orderDetail?orderId=" + orderDetail.id,
					// 					success: (res2) => {
					// 						this.$u.toast(msg);
					// 					}
					// 				})
					// 			});
					// })
				} else {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
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

<style lang="scss">
	.back {
		position: absolute;
		top: 80rpx;
		left: 30rpx;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50%;
		font-size: 40rpx;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}
	.top {
		height: 300px;
		padding-top: 92px;

		.box {
			height: 120px;
			width: 320px;
			margin: auto;
			background-size: 320px 120px;
			background-repeat: no-repeat;
			display: flex;
			padding: 36px 30px;
			align-items: center;

			.l {
				width: 44px;

			}

			.r {
				margin-left: 16px;

				.t1 {
					font-size: 20px;
					line-height: 20px;
					font-weight: 500;
					color: #6A4A1D;
				}

				.t2 {
					margin-top: 12px;
					font-size: 12px;
					line-height: 12px;
					font-weight: 400;
					color: #967A54;
					margin-top: 12px;
				}
			}
		}
	}

	.info {
		background: #191919 linear-gradient(27deg, #1C1C1C 0%, #393939 100%, #454545 200%);
		border-radius: 16px 16px 0px 0px;
		margin-top: -80px;

		.name {
			font-size: 20px;
			padding: 36px;
			padding-bottom: 16px;
			text-align: center;
			font-weight: 500;
			color: #FFFFFF;
		}

		.box {
			margin: 12px 20px;
			padding: 16px;
			display: flex;
			background: #fff;
			border-radius: 8px;

			.l {
				flex-shrink: 0;
				width: 24px;
				height: 24px;
			}

			.r {
				margin-left: 16px;

				.t1 {
					font-size: 16px;
					font-weight: 500;
					color: #333333;
				}

				.t2 {
					font-size: 14px;
					font-weight: 400;
					color: #666666;
					margin-top: 12px;
				}
			}
		}

		.grid4 {
			grid-template-columns: repeat(4, 1fr);
		}

		.grid3 {
			grid-template-columns: repeat(3, 1fr);
		}

		.purchase {
			margin: 20px;
			display: grid;
			grid-gap: 8px;

			.card {
				background: #FFFFFF;
				border-radius: 4px;

				.card1 {
					border-radius: 4px;
					border: 1px solid #B18A4F;
					text-align: center;
					margin: 2px;

					.name_ {
						margin: 12px 0;
						white-space: nowrap;
						font-size: 14px;
						font-weight: 500;
						color: #C2955B;
					}

					.price {
						margin: 12px 6px 6px;
						font-size: 24px;
						font-family: MiSans-Semibold, MiSans;
						font-weight: 600;
						color: #C29761;
						white-space: nowrap;
						.unit {
							font-size: 12px;
						}
					}

					.discount {
						margin: 8px;
						font-size: 10px;
						font-weight: 400;
						color: #999999;
						text-decoration:line-through;
					}

					.calculate {
						margin: 12px 0;
						font-size: 10px;
						font-weight: 500;
						color: #FFFFFF;
						background: #858585;
					}
				}
			}

			.cardSel {
				background: linear-gradient(56deg, #F1DCAF 0%, #F9EFD7 100%);

				.name_ {
					color: #C2955B !important;
					transition: all .2s ease;
				}

				.price {
					color: #67421F !important;
					transition: all .2s ease;
				}

				.calculate {
					background: #9A7640 !important;
					color: #FFEFCC !important;
					transition: all .2s ease;
				}
			}
		}

		.confirm {
			background: #FFFFFF linear-gradient(360deg, #FFDFA5 0%, #D1B272 100%, #FBF0DB 200%);
			border-radius: 18px;
			margin: 36px 36px 24px;
			height: 36px;
			line-height: 36px;
			font-size: 14px;
			font-weight: 500;
			color: #8F4A18;
		}

		.notify {
			display: flex;
			align-items: center;
			margin: 16px;
			font-size: 12px;
			color: #FFFFFF;
			line-height: 20px;
			padding-bottom: 50px;

			.icon {
				width: 16px;
			}

			.n1 {
				margin-left: 8px;
				font-size: 14px;
				font-weight: 500;
				color: #278022;
				white-space: nowrap;
			}
			.n2{
				white-space: nowrap;
			}
		}

	}
</style>
