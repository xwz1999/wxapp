<template>
	<view class="flex flex-direction" style="height: 100%;">
		<u-navbar title="累计收益" :background="{backgroundColor: '#16182B'}" back-icon-color="#fff" title-color="#fff"
		 :border-bottom="false"></u-navbar>
		 <view class="total-box">
		 	<view class="total-box-con bg-img" :style="'background-image: url('+STATIC_URL+'bg.png);'">
		 		<view class="con-box flex flex-direction justify-between">
		 			<view>
		 				<view class="text">累计收益</view>
		 				<view style="font-size: 48rpx;color: #000;">{{accumulateIncome.all}}</view>
		 			</view>
		 			<view class="flex justify-between">
		 				<view>
		 					<view class="text">自购收益(元)</view>
		 					<view class="num">{{accumulateIncome.selfShopping}}</view>
		 				</view>
		 				<view>
		 					<view class="text">分享收益(元)</view>
		 					<view class="num">{{accumulateIncome.share}}</view>
		 				</view>
						<view>
							<view class="text">团队收益(元)</view>
							<view class="num">{{accumulateIncome.team}}</view>
						</view>
		 			</view>
		 		</view>
		 	</view>
		 </view>
		<view class="time-box flex justify-between">
			<picker mode="date" start="1990-01-01" fields="year" :end="end_time" @change="chooseTime">
				<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text></view>
			</picker>
			<view>年度收益:<text class="text-red">{{yearIncome}}</text></view>
		</view>
		<view class="month-earning-box bg-white">
			<view class="month-top bg-white flex justify-between">
				<view class="text-black" style="font-size: 36rpx;">月度收益</view>
				<view style="color: #aaa;">共{{incomes.length}}期收益</view>
			</view>
			<view class="month-con">
				<view class="item bg-white" v-for="(item,index) in incomes" :key="index">
					<view class="item-con">
						<view class="flex justify-between" style="line-height: 100rpx;">
							<view class="text-black"><text style="font-size: 36rpx;">{{item.month}}</text>月</view>
							<view>总收益：<text class="text-red">{{item.totalIncome}}</text></view>
						</view>
						<view class="flex justify-between">
							<view>
								<view class="text">自购收益</view>
								<view class="num">{{item.myIncome}}</view>
							</view>
							<view>
								<view class="text">分享收益</view>
								<view class="num">{{item.shareIncome}}</view>
							</view>
							<view>
								<view class="text">团队收益</view>
								<view class="text-red" style="font-size: 24rpx;" v-if="item.teamIncome==-1">未结算</view>
								<view class="num" v-else>{{item.teamIncome}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL:this.STATIC_URL,
				end_time: "",
				time: "",
				accumulateIncome:{
					all:0,
					selfShopping:0,
					share:0,
					team:0
				},
				incomes:[],
				yearIncome:0
			}
		},
		onLoad() {
			this.end_time = this.time = this.getToday()
			this.getData()
		},
		methods: {
			chooseTime(e) {
				// console.log(e.detail.value)
				this.time = e.detail.value
				this.getData()
			},
			getData(){
				this.$u.post('/api/v1/shop/shop_addup_income', {
					userId: uni.getStorageSync("userInfo").id,
					year:this.time
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.accumulateIncome = res.data.data.accumulateIncome
					this.incomes = res.data.data.incomes
					this.yearIncome = res.data.data.yearIncome
				});
			},
			getToday() {
				let today = new Date()
				let Y = today.getFullYear()
				let M = today.getMonth() + 1
				let D = today.getDate()
				let newDate = Y.toString()
				// console.log(newDate)
				return newDate
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
		width: 100vw;
		height: 100vh;
	}
	
	.total-box {
		padding: 30rpx;
		background-color: #16182B;
	
		.total-box-con {
			width: 690rpx;
			height: 340rpx;
			position: relative;
			border-radius: 15rpx;
			overflow: hidden;
	
			.con-box {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				padding: 30rpx;
				border-radius: 10rpx;
				overflow: hidden;
				box-shadow: 0 3rpx 10rpx 3rpx rgba(0, 0, 0, 0.1);
	
				.text {
					color: #aaa;
					font-size: 24rpx;
					margin-bottom: 15rpx;
				}
	
				.num {
					color: #000;
					font-size: 32rpx;
				}
			}
		}
	}

	.time-box {
		line-height: 60rpx;
		padding: 60rpx 30rpx 30rpx;
		color: #AAAAAA;
	
		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
		}
	
	}

	.month-earning-box {
		margin: 30rpx;
		box-shadow: 0 3rpx 10rpx 3rpx rgba(0,0,0,0.1);
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;

		.month-top {
			line-height: 125rpx;
			border-bottom: 4rpx dashed #ddd;
			padding: 0 30rpx;
		}

		.month-con {
			padding: 20rpx 0 100rpx;

			.item {
				padding: 20rpx 30rpx;
				position: relative;

				&::before {
					content: "";
					height: 60rpx;
					width: 6rpx;
					border-radius: 5rpx;
					background-color: #D5101A;
					position: absolute;
					left: 60rpx;
					bottom: 0;
					transform: translateY(50%);
					z-index: 100;
				}

				&::after {
					content: "";
					height: 60rpx;
					width: 6rpx;
					border-radius: 5rpx;
					background-color: #D5101A;
					position: absolute;
					right: 60rpx;
					bottom: 0;
					transform: translateY(50%);
					z-index: 100;
				}

				&:last-child::before {
					content: none;
				}

				&:last-child::after {
					content: none;
				}

				.item-con {
					background-color: #F7F8FA;
					padding: 30rpx;

					.text {
						color: #aaa;
						font-size: 24rpx;
						margin-bottom: 10rpx;
					}

					.num {
						color: #000;
						font-size: 32rpx;
						line-height: 40rpx;
					}
				}
			}
		}

	}
</style>
