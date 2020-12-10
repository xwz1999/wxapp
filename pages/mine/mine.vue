<template>
	<view>
		<view class="top-container bg-img" :style="'background-image: url('+bgImage+');'">
			<view class="user-msg-box flex justify-between">
				<!-- 已登录 -->
				<view class="flex msg-left" v-if="isLogin" @tap="toMyInfo">
					<image class="avatar" v-if="userInfo.headImgUrl" :src="IMAGE_URL+userInfo.headImgUrl" mode="aspectFill"></image>
					<image class="avatar" v-else :src="IMAGE_URL+'/photo/FiPCCUW-cwtLPTeZo-0puME0sKEd.png'" mode="aspectFill"></image>
					<view class="user-msg">
						<view class="nickname text-white">{{userInfo.nickname}}</view>
						<view class="flex">
							<view class="level-box flex justify-center align-center">
								<image :src="iconPic" mode="widthFix" style="width: 24rpx;"></image>
								<view style="margin-left: 3rpx;">{{role}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 未登录 -->
				<view class="flex align-center" v-else @tap="toLogin">
					<image class="avatar" :src="IMAGE_URL+'/photo/FiPCCUW-cwtLPTeZo-0puME0sKEd.png'" mode="aspectFill"></image>
					<view class="text-white" style="font-size: 36rpx;">登录</view>
				</view>
				<view class="flex text-white msg-right text-center align-center" style="font-size: 20rpx;">
					<navigator url="../myCollect/myCollect" style="margin-right: 30rpx;">
						<u-icon name="heart" size="48"></u-icon>
						<view>收藏</view>
					</navigator>
					<view>
						<u-icon name="server-fill" size="48"></u-icon>
						<view>客服</view>
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
		<view class="box bg-white">
			<view class="subtitle">我的资产</view>
			<view class="flex justify-around text-center card-con">
				<view @tap="toCoupons">
					<view class="num">{{info.myAssets.couponNum?info.balance:0}}</view>
					<view>优惠券(张)</view>
				</view>
				<view @tap="toMyMoney">
					<view class="num">{{info.myAssets.coinNum?info.myAssets.coinNum:0}}</view>
					<view>瑞币(个)<text class="cuIcon-question" @tap.stop="tipModel(true)"></text></view>
				</view>
				<view>
					<view class="num">{{info.myAssets.cards?info.myAssets.cards:0}}</view>
					<view>卡包(个)</view>
				</view>
			</view>
		</view>
		<view class="box bg-white">
			<navigator url="../myEarnings/myEarnings" class="subtitle flex justify-between" style="border: 0;padding: 10rpx 20rpx;">
				<view>累计收益<text style="font-size: 20rpx;font-weight: normal;padding-left: 5rpx;">(瑞币)</text></view>
				<view class="flex more"><text style="font-size: 34rpx;color: #333333;">{{totalEarning}}</text><text class="cuIcon-right"></text></view>
			</navigator>
		</view>
		<view class="box bg-white" v-if="roleLevel!=500">
			<navigator url="../selfBuy/selfBuy?type=self" class="subtitle flex justify-between">
				<view class="flex align-center">
					<image src="../../static/mine/t01.png" style="width: 64rpx;" mode="widthFix"></image>
					<view>自购省钱</view>
				</view>
				<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
			</navigator>
			<view class="money-box flex justify-between">
				<view>
					<view class="txt">订单(笔)</view>
					<view class="num">{{info.myShopping.orderNum}}</view>
				</view>
				<view>
					<view class="txt">销售额(元)</view>
					<view class="num">{{info.myShopping.amount}}</view>
				</view>
				<view>
					<view class="txt">累计收益(瑞币)</view>
					<view class="num">{{info.myShopping.historyIncome}}</view>
				</view>
			</view>
		</view>

		<view class="box bg-white" v-if="roleLevel!=500">
			<navigator url="../selfBuy/selfBuy?type=share" class="subtitle flex justify-between">
				<view class="flex align-center">
					<image src="../../static/mine/t02.png" style="width: 64rpx;" mode="widthFix"></image>
					<view>分享赚钱</view>
				</view>
				<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
			</navigator>
			<view class="money-box flex justify-between">
				<view>
					<view class="txt">订单(笔)</view>
					<view class="num">{{info.shareIncome.orderNum}}</view>
				</view>
				<view>
					<view class="txt">销售额(元)</view>
					<view class="num">{{info.shareIncome.amount}}</view>
				</view>
				<view>
					<view class="txt">累计收益(瑞币)</view>
					<view class="num">{{info.shareIncome.historyIncome}}</view>
				</view>
			</view>
		</view>

		<view class="box bg-white" v-if="roleLevel==300||roleLevel==200||roleLevel==100">
			<navigator url="../teamEarnings/teamEarnings" class="subtitle flex justify-between">
				<view class="flex align-center">
					<image src="../../static/mine/t03.png" style="width: 64rpx;" mode="widthFix"></image>
					<view>团队收益</view>
				</view>
				<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
			</navigator>
			<view class="money-box flex justify-between">
				<view>
					<view class="txt">团队销售额(元)</view>
					<view class="num">{{info.teamIncome.amount}}</view>
				</view>
				<view>
					<view class="txt">累计收益(瑞币)</view>
					<view class="num">{{info.teamIncome.historyIncome}}</view>
				</view>
				<view>
					<view class="txt">团队成员(人)</view>
					<view class="num">{{info.teamIncome.orderNum}}</view>
				</view>
			</view>
		</view>

		<view class="box bg-white">
			<navigator url="../orders/orders" class="subtitle flex justify-between">
				<view>订单中心</view>
				<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
			</navigator>
			<view class="order-con flex justify-around">
				<view class="order-item flex flex-direction align-center" v-for="(item,index) in orderStatus" :key="index" @tap="toOrders(index)">
					<image :src="item.icon" style="height: 56rpx;margin-bottom: 10rpx;" mode="heightFix"></image>
					<view style="font-size: 24rpx;color: #666;">{{item.text}}</view>
					<view class="order-count" v-if="item.count">{{item.count}}</view>
				</view>
			</view>
		</view>
		<view class="box flex justify-around bg-white">
			<view class="other-item text-center" v-for="(item,index) in otherOptions" :key="index" @tap="toPage(item.page)">
				<text :class="item.iconClass"></text>
				<view>{{item.text}}</view>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
		<u-modal v-model="showTipModel" content="瑞币可随时转到余额,可提现" :confirm-style="{color:'#D5101A'}"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				bgImage: "",
				iconPic: "",
				role: "",
				orderStatus: [{
						icon: "../../static/mine/p1.png",
						text: "待付款"
					},
					{
						icon: "../../static/mine/p1.png",
						text: "待发货"
					},
					{
						icon: "../../static/mine/p1.png",
						text: "待收货"
					},
					{
						icon: "../../static/mine/p1.png",
						text: "待评价"
					},
					{
						icon: "../../static/mine/p1.png",
						text: "售后/退货"
					}
				],
				otherOptions: [{
						iconClass: "cuIcon-location",
						text: "地址",
						page: "/pages/address/index"
					},
					{
						iconClass: "cuIcon-question",
						text: "帮助"
					},
					{
						iconClass: "cuIcon-community",
						text: "商务合作"
					},
					{
						iconClass: "cuIcon-settings",
						text: "设置",
						page: "/pages/settings/settings"
					}
				],
				roleLevel: 500,
				showTipModel: false,
				info: {},
				IMAGE_URL: this.IMAGE_URL,
				userInfo: {
					nickname: "",
					headImgUrl: ""
				},
				totalEarning: 0
			};
		},
		onLoad() {
			this.getUserInfo()
			this.getTotalEarning()
		},
		onShow() {
			if (uni.getStorageSync("auth")) {
				this.isLogin = true
				this.userInfo.nickname = uni.getStorageSync("userInfo").nickname
				this.userInfo.headImgUrl = uni.getStorageSync("userInfo").headImgUrl
			} else {
				this.bgImage = this.IMAGE_URL + '/photo/FkVaW7as8_l6xAcmeSw4n4KmVb2Q.png'
			}
		},
		methods: {
			toMyInfo() {
				uni.navigateTo({
					url: "../myInfo/myInfo"
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
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
					if (!this.info) {
						return
					}
					this.roleLevel = this.info.roleLevel
					switch (this.roleLevel) {
						case 500:
							this.role = "会员"
							this.bgImage = this.IMAGE_URL + '/photo/FkVaW7as8_l6xAcmeSw4n4KmVb2Q.png',
								this.iconPic = '../../static/mine/level00.png'
							break;
						case 400:
							this.role = "店主"
							this.bgImage = this.IMAGE_URL + '/photo/FgJac_NuNya9h0tJqjS8G9CNfsen.png.png'
							this.iconPic = '../../static/mine/level01.png'
							break;
						case 300:
							this.role = "白银店铺"
							this.bgImage = this.IMAGE_URL + '/photo/FkJEa70fTF2ORF2yVjbSz_nm9cEQ.png'
							this.iconPic = '../../static/mine/level02.png'
							break;
						case 200:
							this.role = "黄金店铺"
							this.bgImage = this.IMAGE_URL + '/photo/FiBFr9yCnFfhPa7swVNzVNLTIvSG.png'
							this.iconPic = '../../static/mine/level03.png'
							break;
						case 100:
							this.role = "钻石店铺"
							this.bgImage = this.IMAGE_URL + '/photo/FqRIkwI9XRrdOb-ojQLzmaB0v0PX.png'
							this.iconPic = '../../static/mine/level04.png'
							break;
						default:
							break;
					}
					// this.roleLevel = 200
					// 订单数量提醒
					this.orderStatus[0].count = this.info.orderCenter.waitPay
					this.orderStatus[1].count = this.info.orderCenter.waitSend
					this.orderStatus[2].count = this.info.orderCenter.waitRecv
					this.orderStatus[4].count = this.info.orderCenter.afterSales
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
			toLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			tipModel(flag) {
				this.showTipModel = flag
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
						type = 4
						break;
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

	// .login-box {
	// 	position: fixed;
	// 	width: 100vw;
	// 	height: 100vh;

	// 	image {
	// 		width: 160rpx;
	// 		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	// 		margin-bottom: 200rpx;
	// 	}

	// 	button {
	// 		width: 400rpx;
	// 		height: 60rpx;
	// 		line-height: 60rpx;
	// 		border-radius: 15rpx;
	// 	}
	// }

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
		margin: 20rpx 20rpx 0;

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

		&:last-child {
			margin-bottom: 200rpx;
		}

		.order-item {
			width: 130rpx;
			padding: 30rpx 0;
			position: relative;

			.order-count {
				position: absolute;
				right: 15rpx;
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
		width: 150rpx;
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
