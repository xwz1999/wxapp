<template>
	<view class="flex flex-direction" style="height: 100vh;width:100vw;">
		<view class="top-container bg-img" :style="'background-image: url('+bgImage+');'">
			<view class="user-msg-box flex justify-between">
				<!-- 已登录 -->
				<view class="flex msg-left" v-if="isLogin" @tap="toMyInfo">
					<view class="avatar">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+userInfo.headImgUrl" :index="index" height="140" border-radius="70"
						 :loading-img="IMAGE_URL + '/null05.png'" :error-img="IMAGE_URL + '/null05.png'" img-mode="aspectFill"></u-lazy-load>
					</view>
					<view class="user-msg">
						<view class="nickname text-white">{{userInfo.nickname}}</view>
						<view class="flex" v-if="iconPic">
							<view class="level-box flex justify-center align-center">
								<image :src="iconPic" mode="widthFix" style="width: 24rpx;"></image>
								<view style="margin-left: 3rpx;">{{role}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 未登录 -->
				<view class="flex align-center" v-else @tap="toLogin">
					<image class="avatar" :src="STATIC_URL+'avatar.png'" mode="aspectFill"></image>
					<view class="text-white" style="font-size: 36rpx;">登录</view>
				</view>
				<view class="flex text-white msg-right text-center align-center" style="font-size: 20rpx;">
					<navigator url="../myCollect/myCollect" hover-class="none" style="margin-right: 30rpx;">
						<u-icon name="heart" size="48"></u-icon>
						<view>收藏</view>
					</navigator>
					<view>
						<button open-type='contact' class='customer-service'>
							<u-icon name="server-fill" size="48"></u-icon>
						</button>

						<view>客服</view>
						<!-- 			<contact-button 
						  type="default-light" 
						  size="20"
						  session-from="weapp"
						>
						</contact-button> -->
					</view>
				</view>
			</view>
			<view class="balance-box">
				<view style="position: relative;">
					<image src="../../static/mine/yue.png" style="width: 100%;" mode="widthFix"></image>
					<view class="balance-con flex justify-between align-center">
						<view class="flex flex-direction justify-center align-center" style="border-right: 2rpx solid rgba(255,255,255,0.5);width: 120rpx;">
							<image :src="iconPic" mode="heightFix" style="height: 36rpx;margin-bottom: 10rpx;"></image>
							<view class="">{{role}}</view>
						</view>
						<view class="flex-sub flex justify-between align-center" style="padding: 0 30rpx;">
							<view class="flex-sub" style="margin-right: 15rpx;">
								<view><text style="font-size: 28rpx;">余额</text>(元)：<text style="font-size: 44rpx;">{{info.balance?info.balance:0}}</text></view>
								<view>每月10日，25日审核提现申请</view>
							</view>
							<button class="cu-btn round widthdraw-btn" @tap="toWithdraw">提现</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="flex-sub" scroll-y="true" style="height: 0;">
			<view class="info-container" style="padding: 20rpx;">
				<view class="box bg-white">
					<view class="subtitle">我的资产</view>
					<view class="flex justify-around text-center card-con">
						<!-- 		<view @tap="toCoupons">
							<view class="num">{{info.myAssets.couponNum?info.balance:0}}</view>
							<view>优惠券(张)</view>
						</view> -->
						<view @tap="toBalance">
							<view class="num">{{info.balance?info.balance:0}}</view>
							<view>余额（元）</view>
						</view>
						<view @tap="toMyMoney">
							<view class="num">{{info.myAssets.coinNum?info.myAssets.coinNum:0}}</view>
							<view>瑞币(个)<text class="cuIcon-question" @tap.stop="tipModel(true)"></text></view>
						</view>
						<view @tap="toCardPackage">
							<view class="num">{{info.myAssets.cards?info.myAssets.cards:0}}</view>
							<view>卡包(个)</view>
						</view>
					</view>
				</view>
		
				<view class="box bg-white">
					<navigator url="../totalEarnings/totalEarnings" class="subtitle flex justify-between" style="border: 0;padding: 10rpx 20rpx;">
						<view>累计收益<text style="font-size: 20rpx;font-weight: normal;padding-left: 5rpx;">(瑞币)</text></view>
						<view class="flex more"><text style="font-size: 34rpx;color: #333333;">{{totalEarning}}</text><text class="cuIcon-right"></text></view>
					</navigator>
				</view>
				
				
						<!-- 我的收益 -->
				<view class="box bg-white" @click="toMyIncome">
					<view class="subtitle flex align-center justify-between"><text>我的收益</text> <text class="cuIcon-right"></text></view>
					<view class="flex justify-around text-center align-center subtitle" style="line-height: 50rpx;font-size: 36rpx;color: #333333;padding: 16rpx 0 20rpx 0;font-weight: 400;">
						<view>
							<view class="">
								<text>{{myIncomeData.monthExpect?myIncomeData.monthExpect:0}}</text>
							</view>
							<view class="" style="font-size: 24rpx;">
								<text>本月预估</text>
							</view>
						</view>
						<view class="line" style="width: 4rpx; height: 76rpx; background: #E6E6E6; border-radius: 1rpx;">
						</view>
						<view class="">
							<view class="">
								<text>{{myIncomeData.dayExpect?myIncomeData.dayExpect:0}}</text>
							</view>
							<view class="" style="font-size: 24rpx;">
								<text>今日预估</text>
							</view>
						</view>
					</view>
					<view class="flex justify-around align-center" style="font-size: 24rpx;color: #666666;padding: 14rpx 0;">
						<view class="">
							<text>上月结算</text><text style="color: #D7BE8E;">￥{{myIncomeData.lastMonthIncome?myIncomeData.lastMonthIncome:0}}</text>
						</view>
						<view class="">
						</view>
						<view class="">
							<text>上月预估</text><text style="color: #D7BE8E;">￥{{myIncomeData.lastMonthExpect?myIncomeData.lastMonthExpect:0}}</text>
						</view>
					</view>
				</view>
				<view class="box bg-white">
					<view class=" subtitle flex justify-between" style="border: none;">
						<view>店铺管理</view>
					</view>
				
					<view class="shop-box flex justify-between flex-wrap">
						<view class="card" @click="teamShare" >
							<image :src="`${IMAGE_URL}/mineShop/shop1.jpg`" mode="widthFix"></image>
							<view class="">
								<text>团队扩招</text>
							</view>
							<view class="" style="font-size: 20rpx;">
								<text>0元创业·轻松赚</text>
							</view>
						</view>
						<view class="card" @click="toMineShopPage" >
							<image :src="`${IMAGE_URL}/mineShop/shop2.jpg`" mode="widthFix"></image>
							<view class="">
								<text>我的团队</text>
							</view>
							<view class="" style="font-size: 20rpx;">
								<text>有福同享·真壕友</text>
							</view>
						</view>
						<view class="card" >
							<image :src="`${IMAGE_URL}/mineShop/shop3.jpg`" mode="widthFix"></image>
							<view class="">
								<text>推荐钻石店铺</text>
							</view>
							<view class="" style="font-size: 20rpx;">
								<text>推荐好友·福利双赢</text>
							</view>
						</view>
						<view class="card" >
							<image :src="`${IMAGE_URL}/mineShop/shop4.jpg`" mode="widthFix"></image>
							<view class="">
								<text>我的推荐</text>
							</view>
							<view class="" style="font-size: 20rpx;">
								<text>呼朋唤友·享收益
</text>
							</view>
						</view>
						<view class="card" >
							<image :src="`${IMAGE_URL}/mineShop/shop5.jpg`" mode="widthFix"></image>
							<view class="">
								<text>获取平台奖励</text>
							</view>
							<view class="" style="font-size: 20rpx;">
								<text>平台可靠·奖励多</text>
							</view>
						</view>
						<view class="card">
							<image :src="`${IMAGE_URL}/mineShop/shop6.jpg`" mode="widthFix"></image>
							<view class="">
								<text>我的奖励</text>
							</view>
							<view class="" style="font-size: 20rpx;">
								<text>积少成多·奖励丰厚</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box bg-white">
					<navigator url="../orders/orders" hover-class="none" class="subtitle flex justify-between">
						<view>订单中心<text style="font-weight: normal;font-size: 26rpx;">(自购)</text></view>
						<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
					</navigator>
					<view class="order-con flex justify-around">
						<view class="order-item flex flex-direction align-center" v-for="(item,index) in orderStatus" :key="index" @tap="toOrders(index)">
							<image :src="item.icon" style="height: 56rpx;margin-bottom: 10rpx;width: auto;" mode="heightFix"></image>
							<view style="font-size: 24rpx;color: #666;">{{item.text}}</view>
							<view class="order-count" v-if="item.count">{{item.count}}</view>
						</view>
					</view>
				</view>
				<view class="box flex justify-around bg-white">
				<!-- 	<view class="other-item flex-sub flex flex-direction justify-between align-center" v-for="(item,index) in otherOptions"
					 :key="index" @tap="toPage(item.page)">
						<image :src="item.icon" style="height: 50rpx;width: auto;margin-bottom: 10rpx;" mode="heightFix"></image>
						<view>{{item.text}}</view>
					</view> -->
					<view class="other-item flex-sub flex flex-direction justify-between align-center" 
					 @tap="toPage(otherOptions[0].page)">
						<image :src="otherOptions[0].icon" style="height: 50rpx;width: auto;margin-bottom: 10rpx;" mode="heightFix"></image>
						<view>{{otherOptions[0].text}}</view>
					</view>
					<view class="other-item flex-sub flex flex-direction justify-between align-center">
						<button open-type='contact' class='customer-service'>
								<image :src="otherOptions[1].icon" style="height: 50rpx;width: auto;margin-bottom: 10rpx;" mode="heightFix"></image>
						</button>
						
						<view>{{otherOptions[1].text}}</view>
					</view>
					<view class="other-item flex-sub flex flex-direction justify-between align-center"
					 @tap="toPage(otherOptions[2].page)">
						<image :src="otherOptions[2].icon" style="height: 50rpx;width: auto;margin-bottom: 10rpx;" mode="heightFix"></image>
						<view>{{otherOptions[2].text}}</view>
					</view>
					<view class="other-item flex-sub flex flex-direction justify-between align-center"
					 @tap="toPage(otherOptions[3].page)">
						<image :src="otherOptions[3].icon" style="height: 50rpx;width: auto;margin-bottom: 10rpx;" mode="heightFix"></image>
						<view>{{otherOptions[3].text}}</view>
					</view>
					<!-- 	<button open-type='contact' class='customer-service'>
							<u-icon name="server-fill" size="48"></u-icon>
						</button>
 -->
				</view>
			</view>
		</scroll-view>
		<u-modal v-model="showTipModel" content="瑞币可随时转到余额,可提现" :confirm-style="{color:'#D5101A'}"></u-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myIncomeData:null,//
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				isLogin: false,
				bgImage: this.STATIC_URL + 'bg01.png',
				iconPic: "",
				role: "",
				orderStatus: [{
						icon: "../../static/mine/p1.png",
						text: "待付款"
					},
					{
						icon: "../../static/mine/p2.png",
						text: "待发货"
					},
					{
						icon: "../../static/mine/p3.png",
						text: "待收货"
					},
					{
						icon: "../../static/mine/p4.png",
						text: "待评价"
					},
					{
						icon: "../../static/mine/p5.png",
						text: "售后/退货"
					}
				],
				otherOptions: [{
						icon: "../../static/mine/b01.png",
						text: "地址",
						page: "/pages/address/index"
					},
					{
						icon: "../../static/mine/b02.png",
						text: "帮助"
					},
					{
						icon: "../../static/mine/b03.png",
						text: "商务合作",
						page: "/pages/cooperation/cooperation"
					},
					{
						icon: "../../static/mine/b04.png",
						text: "设置",
						page: "/pages/settings/settings"
					}
				],
				roleLevel: 500,
				showTipModel: false,
				info: {},
				userInfo: {
					nickname: "",
					headImgUrl: ""
				},
				totalEarning: 0,
				teamIncome: {
					amount: 0,
					historyIncome: 0,
					orderNum: 0
				}
			};
		},
		onLoad() {
			if (uni.getStorageSync("auth").token) {
				this.getUserInfo()
				this.getTotalEarning()
			} else {
				this.$u.toast("游客无法使用该功能，请登录");
				setTimeout(() => {
					uni.navigateTo({
						url: "../login/login"
					})
				}, 1500)
				return false;
			}
		},
		onShow() {
			console.log(uni.getStorageSync("auth"))
			if (uni.getStorageSync("auth").token) {
				this.isLogin = true
				this.userInfo.nickname = uni.getStorageSync("userInfo").nickname
				this.userInfo.headImgUrl = uni.getStorageSync("userInfo").headImgUrl
			}
			this.myIncome()
		},
		methods: {
			toMineShopPage(){
				uni.navigateTo({
					url: "/packageA/mineShop/mineShop"
				})
			},
			teamShare(){
				console.log(11)
				uni.navigateTo({
				
					url: "/packageA/myShop/teamAdd"
				})
			},
			toMyInfo() {
				uni.navigateTo({
					url: "../myInfo/myInfo"
				})
			},
			toBalance() {
				//我的余额	
				uni.navigateTo({
					url: "/packageA/balance/balance"
				})
			},
			// 我的收益
			myIncome(){
				this.$u.post('/api/v2/app/user/income', {
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.myIncomeData = res.data.data
				});
			},
			// 到我的收益页面
			toMyIncome(){
				uni.navigateTo({
					url: "/packageA/myIncome/myIncome"
				})
			},
			getTotalEarning() {
				this.$u.post('/api/v1/shop/shop_index', {
					userID: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let info = res.data.data
					this.totalEarning = info.accumulateIncome.all
				});
			},
			//获取我的全部信息
			getUserInfo() {
				this.$u.post('/api/v1/users/profile/my_info', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
					if (!this.info) {
						return
					}
					console.log(res.data.data)
					uni.setStorageSync("userId", res.data.data.identifier)
					console.log(uni.getStorageSync("userId"))
					this.roleLevel = this.info.roleLevel
					switch (this.roleLevel) {
						case 500:
							this.role = "会员"
							// this.bgImage = this.STATIC_URL + 'bg01.png'
							this.iconPic = '../../static/mine/level00.png'
							this.bgImage = this.STATIC_URL + "role00.png"
							break;
						case 400:
							this.role = "店主"
							// this.bgImage = this.STATIC_URL + 'bg02.png'
							this.iconPic = '../../static/mine/level01.png'
							this.bgImage = this.STATIC_URL + "role01.png"
							break;
						case 300:
							this.role = "白银店铺"
							// this.bgImage = this.STATIC_URL + 'bg03.png'
							this.iconPic = '../../static/mine/level02.png'
							this.bgImage = this.STATIC_URL + "role02.png"
							break;
						case 200:
							this.role = "黄金店铺"
							// this.bgImage = this.STATIC_URL + 'bg04.png'
							this.iconPic = '../../static/mine/level03.png'
							this.bgImage = this.STATIC_URL + "role03.png"
							break;
						case 100:
							this.role = "钻石店铺"
							// this.bgImage = this.STATIC_URL + 'bg05.png'
							this.iconPic = '../../static/mine/level04.png'
							this.bgImage = this.STATIC_URL + "role04.png"
							break;
						default:
							break;
					}

					// this.roleLevel = 200
					// 订单数量提醒
					this.orderStatus[0].count = this.info.orderCenter.waitPay
					this.orderStatus[1].count = this.info.orderCenter.waitSend
					this.orderStatus[2].count = this.info.orderCenter.waitRecv
					// this.orderStatus[4].count = this.info.orderCenter.afterSales
				});
			},
			toWithdraw() {
				uni.navigateTo({
					url: "../withdraw/withdraw"
				})
			},
			toCoupons() {
				uni.navigateTo({
					url: "../coupons/coupons"
				})
			},
			toMyMoney() {
				uni.navigateTo({
					url: "../myMoney/myMoney"
				})
			},
			toCardPackage() {
				uni.navigateTo({
					url: "../cardPackage/cardPackage"
				})
			},
			toLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			tipModel(flag) {
				this.showTipModel = flag
			},
			toTeamEarnings() {
				uni.navigateTo({
					url: "../teamEarnings/teamEarnings"
				})
			},
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			toOrders(index) {
				let type
				switch (index) {
					case 0:
						type = 1
						break;
					case 1:
						type = 2
						break;
					case 2:
						type = 3
						break;
					case 3:
						uni.navigateTo({
							url: "../orders/remark"
						})
						return;
					case 4:
						uni.navigateTo({
							url: "../afterSaleGoods/afterSaleGoods"
						})
						return;
					default:
						break;
				}
				uni.navigateTo({
					url: "../orders/orders?type=" + type
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F4F6;
	}
	//客服
	.customer-service {
		margin: 0;
		padding: 0;
		line-height: 0;
		border: none;
		background-color: rgba(0, 0, 0, 0);
		border-radius: 0;
		border: none;
		color: #FFFFFF;
		&::after {
			border: none;
		}
	}

	.shop-box{
		padding: 0 10rpx;
		.card{
			position: relative;
		
			width: 340rpx;
			height: 180rpx;
			margin: 10rpx 0;
			padding: 24rpx;
			border-radius: 8rpx;
			overflow: hidden;
			z-index: 10;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			image{
				z-index: -1;
				position: absolute;
				top: 0;
				left: 0;
			}
		}
	
	}
	.top-container {
		position: relative;
		border-radius: 80rpx/30rpx;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		overflow: hidden;
		height: 450rpx;

		.user-msg-box {
			position: absolute;
			width: 100%;
			bottom: 150rpx;
			left: 0;
			padding: 0 30rpx;

			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.nickname {
				font-size: 42rpx;
				margin: 10rpx 0;
			}

			.level-box {
				color: #B25E34;
				background-color: #F5CA88;
				height: 36rpx;
				line-height: 36rpx;
				border-radius: 20rpx;
				padding: 0 20rpx;
				font-size: 20rpx;
			}
		}

		.balance-box {
			position: absolute;
			bottom: 0;
			width: 690rpx;
			left: 30rpx;

			.balance-con {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				color: #FFDEAA;
				font-size: 20rpx;

				.widthdraw-btn {
					height: 50rpx;
					background-image: linear-gradient(#FECCAB, #FEB273);
					font-size: 28rpx;
					color: #6F4019;
				}
			}
		}
	}

	.box {
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;

		.subtitle {
			padding: 0 20rpx;
			line-height: 84rpx;
			font-size: 32rpx;
			color: #000;
			border-bottom: 2rpx solid #E6E6E6;
			font-weight: 700;
			.more {
				font-size: 26rpx;
				color: #AAAAAA;
				font-weight: normal;
			}
		}

		.order-item {
			width: 130rpx;
			padding: 30rpx 0;
			position: relative;

			.order-count {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				// border: 1rpx solid red;
				// color: red;
				color: #FFFFFF;
				background-color: red;
				border-radius: 50%;
				height: 30rpx;
				width: 30rpx;
				font-size: 20rpx;
				line-height: 30rpx;
				text-align: center;
			}
		}
	}

	.card-con>view {
		width: 200rpx;
		height: 134rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 45rpx;
		font-size: 24rpx;
		color: #999999;

		.num {
			color: #000;
			font-size: 36rpx;
		}
	}

	.other-item {
		color: #999;
		font-size: 24rpx;
		padding: 30rpx 0;

		text {
			font-size: 66rpx;
		}
	}

	.money-box {
		padding: 0 20rpx;
		color: #999;

		&>view {
			padding: 20rpx 0;
			line-height: 45rpx;

			// flex: 1;	

		}
	}

	.txt {
		font-size: 24rpx;
	}

	.num {
		font-size: 32rpx;
		color: #333;

	}
</style>
