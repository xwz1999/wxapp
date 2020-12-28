<template>
	<view>
		<u-navbar title="自购收益" :background="{backgroundColor: '#16182B'}" back-icon-color="#fff" title-color="#fff"
		 :border-bottom="false"></u-navbar>
		<view class="total-box">
			<view class="total-box-con bg-img" :style="'background-image: url('+STATIC_URL+'bg.png);'">
				<view class="con-box flex flex-direction justify-between">
					<view>
						<view class="text">预估收益(瑞币)</view>
						<view style="font-size: 48rpx;color: #000;">{{data.historyIncome}}</view>
					</view>
					<view class="flex justify-between">
						<view>
							<view class="text">销售额(元)</view>
							<view class="num">{{data.amount}}</view>
						</view>
						<view>
							<view class="text">订单数(笔)</view>
							<view class="num">{{data.orderNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="time-box flex justify-between">
			<picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
				<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text></view>
			</picker>
			<view>当月收益:{{money}}</view>
		</view>
		<view class="list-box bg-white">
			<view class="list-top flex">
				<view class="">日期</view>
				<view class="">销售额</view>
				<view class="text-center">订单数</view>
				<view class="text-right">结算收益</view>
			</view>
			<view class="item-box">
				<view class="item flex justify-between" v-for="(item,index) in list" :key="index">
					<view class="">{{handleTime(item.time)}}</view>
					<view class="">{{item.amount}}</view>
					<view class="text-center">{{item.orderNum}}</view>
					<view class="text-right text-red">{{item.historyIncome}}</view>
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
				data: {
					amount: 0,
					historyIncome: 0,
					orderNum: 0
				},
				money:0,
				list: []
			}
		},
		onLoad(options) {
			this.end_time = this.time = this.getToday()
			this.getUserInfo()
		},
		methods: {
			handleTime(time){
				let date = new Date(time)
				let month = date.getMonth()+1
				let day = date.getDate()
				return `${month}月${day}日`
			},
			chooseTime(e) {
				// console.log(e.detail.value)
				this.time = e.detail.value
				this.getUserInfo()
			},
			getToday() {
				let today = new Date()
				let Y = today.getFullYear()
				let M = today.getMonth() + 1
				let D = today.getDate()
				let newDate = Y + "-" + M
				// console.log(newDate)
				return newDate
			},
			//获取我的全部信息
			getUserInfo() {
				let sendData = {
					userId: uni.getStorageSync("userInfo").id,
					orderBy: "desc",
				}
				if (this.time) {
					sendData.date = this.time
				}
				this.$u.post("/api/v1/users/profile/my_info/share", sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.data = res.data.data.myShopping
					this.list = res.data.data.list
					this.money = res.data.data.coinNum
				});
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
		padding: 20rpx 30rpx;
		color: #AAAAAA;

		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
		}

	}

	.list-box .list-top{
		font-weight: 700;
		line-height: 80rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #F1F1F1;
		view{
			flex: 1;
		}
	}
	.list-box .item {
		line-height: 80rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #F1F1F1;
		font-size: 28rpx;
		view{
			flex:1;
		}
		&:last-child {
			border: 0;
			margin-bottom: 60rpx;
		}
	}


	.screening-box {
		line-height: 64rpx;
		margin: 60rpx 30rpx 0;

		.year {
			border-radius: 32rpx;
			padding: 0 30rpx;
			padding-right: 20rpx;
		}
	}
	
	.goods-box {
		margin-bottom: 200rpx;
	
		.goods-item {
			margin-bottom: 20rpx;
			padding: 30rpx;
	
			.goods-pic {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				margin-right: 30rpx;
			}
	
			.span {
				background-color: #E9F5EE;
				color: #31A462;
				font-size: 20rpx;
				padding: 0 10rpx;
			}
		}
		.money-box {
			width: 600rpx;
			line-height: 45rpx;
			padding-top: 40rpx;
		
			.txt {
				color: #aaa;
				font-size: 24rpx;
			}
		
			.num {
				font-size: 28rpx;
				color: black;
			}
		}
	}
</style>
