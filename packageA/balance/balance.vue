<template>
	<view class="flex flex-direction" style="height: 100%;">
		<view class="flex text-center bg-white text-black" style="padding: 80rpx 0;">
			<view class="flex-sub">
				<view class="">可使用(元)</view>
				<view class="text-red num">{{totalBalance}}</view>
			</view>
			<view class="flex-sub">
				<view class="">累计提现(元)</view>
				<view class="text-black num">{{totalWithdraw}}</view>
			</view>
		</view>
		<view class="screening-box flex justify-between" style="padding: 30rpx 40rpx;">
			<view class="bg-white text-black pick" @tap="showType">{{types[currentType]}}<text class="cuIcon-triangledownfill"></text></view>
			<picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
				<view class="time bg-white text-black pick" @tap="hideMask">{{time}}<text class="cuIcon-triangledownfill"></text></view>
			</picker>
		</view>
		<view class="flex-sub bg-white clear" style="position: relative;">
			<view class="mask" v-if="isShow" @tap="hideMask"></view>
			<view class="type-box bg-white flex justify-between flex-wrap" :class="isShow?'move':''">
				<view class="type-item" :class="currentType==index?'active':''" v-for="(item,index) in types" :key="index" @tap="chooseType(index)">{{item}}</view>
			</view>
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="detail-box" v-if="data.list&&data.list.length!=0">
					<view class="detal-item text-black flex justify-between align-center" v-for="(item,index) in data.list" :key="index">
						<view class="" style="line-height: 40rpx;">
							<view class="">{{item.comment}}</view>
							<view style="font-size: 26rpx;color: #666666;">{{item.createdAt}}</view>
						</view>
						<view class="">{{item.amount>0?'+':''}}{{item.amount}}</view>
					</view>
				</view>
				<view class="null flex justify-center flex-direction align-center" style="height: 100%;" v-else>
					<image :src="STATIC_URL+'null01.png'" style="width: 300rpx;" mode="widthFix"></image>
					<view style="font-size: 24rpx;color: #DDDDDD;">暂无数据</view>
				</view>
			</scroll-view>
		</view>
		<view class="" style="height: 96rpx;">

		</view>
		<view class="btn-box" @click="toBalance">
			<view class="btn">
				<text>转到余额</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				end_time: "",
				time: "",
				totalBalance: 0, //可使用
				totalWithdraw: 0, //累计提现
				data: {
					total: 0,
					list: []
				},
				types: ["全部", "订单支付", "订单退款", "提现", "提现失败", "瑞币转入"],
				isShow: false,
				currentType: 0
			};
		},
		onLoad() {
			let today = new Date()
			let Y = today.getFullYear()
			let M = today.getMonth() + 1
			let D = today.getDate()
			if (M < 10) {
				M = "0" + M
			}
			let newDate = Y + "-" + M
			this.end_time = this.time = newDate
			this.getBalance()
			this.getTotal()
		},
		methods: {
			showType() {
				this.isShow = !this.isShow
			},
			// 转到余额页面
			toBalance() {
				// pages/withdraw/withdraw
				uni.navigateTo({
					url: "/pages/withdraw/withdraw"
				})
			},
			getTotal() {
				let resData = {

				}
				this.$u.post('/api/v2/app/user/balance/info', resData).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.totalBalance = res.data.data.balance
					this.totalWithdraw = res.data.data.totalWithdraw
				})
				// 	totalBalance
				// total
			},

			hideMask() {
				this.isShow = false
			},
			chooseType(i) {
				this.currentType = i
				this.isShow = false
				this.getBalance()
			},
			chooseTime(e) {
				console.log(e.detail.value)

				if (e.detail.value === this.time) {
					this.isShow = false
					return
				}
				this.time = e.detail.value
				this.isShow = false
				this.getBalance()
			},
			getBalance() {
				let resData = {
					date: this.time,
					status: this.currentType
				}
				console.log(resData)
				this.$u.post('/api/v2/app/user/balance/month_history', resData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.data = res.data.data
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
		width: 100vw;
		height: 100vh;
	}

	.btn-box {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #C92219;
	}

	.num {
		font-size: 60rpx;
		margin-top: 10rpx;
	}

	.screening-box {
		position: relative;

		.pick {
			padding: 0 30rpx;
			padding-right: 20rpx;
			line-height: 64rpx;
			border-radius: 32rpx;

			text {
				font-size: 34rpx;
			}
		}
	}

	.mask {
		background-color: rgba(0, 0, 0, 0.6);
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	.type-box {
		padding: 20rpx 30rpx;
		position: absolute;
		top: 0;
		width: 100%;
		left: 0;
		transform: translateY(-100%);
		transition: 0.3s;
		z-index: 20;

		.type-item {
			width: 220rpx;
			line-height: 70rpx;
			margin: 10rpx 0;
			text-align: center;
			background-color: #F1F1F1;
		}

		.active {
			background-color: #FFDDDD;
			color: #FF5B5B;
		}
	}

	.move {
		transform: translateY(0)
	}


	.detal-item {
		padding: 0 30rpx;
		height: 120rpx;
		border-bottom: 1rpx solid #f7f7f7;

		&:last-child {
			margin-bottom: 200rpx;
		}
	}
</style>
