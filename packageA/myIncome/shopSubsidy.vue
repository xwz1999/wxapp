<template>
	<view class="">
		<view class="card-box" :style="'background-image: url('+bgImage+');background-size: 100% auto;'">
			<view class="flex justify-between" style="height: 200rpx; padding: 40rpx;">
				<view class="card-title">
					<view class="txt" style="width: 100%;">
						累计未到账补贴(瑞币)
					</view>
					<view class="num">
						10000.00
					</view>
				</view>
				<view class="">
					<image :src="badgeImage" mode="widthFix" style="width: 96rpx;"></image>
				</view>
			</view>
			<view class="foot-box flex  align-center">
				<view class="item" @click="cardChange(0)" :class="cardIndex === 0?'active':''">
					<view class="">
						自营补贴
					</view>
				</view>
				<view class="foot-line">

				</view>
				<view class="item" @click="cardChange(1)" :class="cardIndex === 1?'active':''">
					<view class="">
						分销补贴
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="time-box flex justify-between">
				<!-- <picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
					<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text></view>
				</picker> -->
				<view class="" style="color: #333333;">
					{{time}}
				</view>
				<view class="">
					本月未到账收益：<text style="color: #D5101A;">60.00</text>
				</view>
			</view>
		</view>
		<view>
			<view class="flex align-center text-center" style="background: #FFFFFF;height: 88rpx; line-height: 88rpx; font-size: 32rpx;">
				<view class='' style="flex: 1;"><text>日期</text></view>
				<view class='' style="flex: 1;"><text>销售额</text></view>
				<view class='' style="flex: 1;"><text>订单数</text></view>
				<view class='' style="width: 246rpx;"><text>未到账补贴(瑞币)</text></view>
			</view>
				<view class="flex align-center text-center" v-for="index of 4" :key='index' style="background: #FFFFFF;height: 88rpx; line-height: 88rpx; border-top: 1rpx solid  #F5F5F5; font-size: 32rpx;">
					<view class='' style="flex: 1;"><text>2月28日</text></view>
					<view class='' style="flex: 1;"><text>100.00</text></view>
					<view class='' style="flex: 1;"><text>2</text></view>
					<view class='' style="width: 246rpx; color: #D5101A;" @click="toShopDetails"><text>20.00</text></view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImage: this.STATIC_URL + 'bg01.png',
				roleLevel: 0,
				badgeImage: '',
				end_time: "",
				time: '',
				cardIndex: 0
			}
		},
		created() {
			this.roleLevel = this.$store.state.roleLevel
			this.bgImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')
			this.badgeImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')
		},
		methods: {
			cardChange(index) {
				this.cardIndex = index
			},
			getToday() {
				let today = new Date()
				let Y = today.getFullYear()
				let D = today.getDate()
				let M = today.getMonth() + 1
				if (M === 1) {
					M = 12
					Y = Y - 1
				}
				if (M < 10) {
					M = '0' + M
				}
				let newDate = Y + "-" + M
				// console.log(newDate)
				return newDate
			},
			toShopDetails(){
				uni.navigateTo({
					url: "/packageA/myIncome/shopSubsidyDetails"
				})
			},
			//获取我的全部信息
			getInfo() {
				// let sendData = {
				// 	userId: uni.getStorageSync("userInfo").id,
				// 	orderBy: "desc",
				// } #F5F5F5
				// if (this.time) {
				// 	sendData.date = this.time
				// }
				// console.log(sendData)
				// this.$u.post('/api/v1/users/profile/my_info/team', sendData).then(res => {
				// 	console.log(res.data);
				// 	if (res.data.code == "FAIL") {
				// 		// this.$u.toast(res.data.msg);
				// 		return
				// 	}
				// 	this.data = res.data.data.teamIncome
				// 	this.list = res.data.data.billboard?res.data.data.billboard:[]
				// 	this.incomeDetail = res.data.data.incomeDetail
				// });
			}
		},
		onLoad(options) {
			console.log(options)
			this.time = this.getToday()
			this.getInfo()
		},
	}
</script>

<style lang="scss">
	.time-box {
		line-height: 60rpx;
		padding: 20rpx 30rpx;
		color: #AAAAAA;

		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
		}

	}

	.card-box {
		width: 608rpx;
		height: 304rpx;
		overflow: hidden;
		border-radius: 8rpx;
		margin: 40rpx auto;
		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	}

	.card-title {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;

		.txt {
			font-size: 32rpx;
			color: rgba(58, 57, 67, 0.5);
		}

		.num {
			font-size: 68rpx;
			color: rgba(58, 57, 67, 1);
		}
	}

	.foot-box {
		height: 124rpx;
		background: #FCFCFC;

		.item {
			text-align: center;
			flex: 1;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;

			&.active {
				color: #333333;
			}
		}

		.foot-line {
			width: 2rpx;
			height: 44rpx;
			background: #D8D8D8;
			border: 2rpx solid #979797;
		}
	}
</style>
