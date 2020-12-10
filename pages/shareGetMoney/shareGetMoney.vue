<template>
	<view>
		<view class="bg-box" style="position: relative;">
			<image src="../../static/shop/bg-03.png" style="width: 100%;" mode="widthFix"></image>
			<view class="total-box">
				<view class="text-white flex justify-start" style="line-height: 80rpx;">
					<picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
						<view style="font-size: 34rpx;">{{time}}<text class="cuIcon-triangledownfill"></text></view>
					</picker>
				</view>
				<view class="total-box-con">
					<image :src="IMAGE_URL+'/photo/FqgMOAhPeB9Xg7__8fZFYI-8Oerl.png'" style="width: 690rpx;" mode="widthFix"></image>
					<view class="con-box flex flex-direction justify-between">
						<view class="">
							<view class="text">预估收益(瑞币)</view>
							<view style="font-size: 48rpx;color: #000;">137183.00</view>
						</view>
						<view class="flex justify-between">
							<view class="">
								<view class="text">销售额(元)</view>
								<view class="num">2132.03</view>
							</view>
							<view class="">
								<view class="text">订单数(笔)</view>
								<view class="num">5</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="screening-box">3月13日</view>
		<view class="goods-box">
			<view class="goods-item bg-white" v-for="(item,index) in 5" :key="index">
				<view class="goods-item-con flex">
					<view class="goods-pic bg-img" :style="'background-image: url('+'https://gw.alicdn.com/tps/i4/33283/O1CN01G030as1a7ev6CEzR3_!!0-item_pic.jpg_Q75.jpg_.webp'+');'"></view>
					<view class="goods-name-con flex-sub flex flex-direction justify-between clear align-start">
						<view class="goods-name text-hidden">这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称！！！！</view>
						<view style="color: #aaa;font-size: 24rpx;">共计3件</view>
						<view class="span">已结算</view>
					</view>
				</view>
				<view class="money-box flex justify-between">
					<view class="">
						<view class="txt">付款金额</view>
						<view class="num">200.00</view>
					</view>
					<view class="">
						<view class="txt">佣金比例(%)</view>
						<view class="num">200.00</view>
					</view>
					<view class="">
						<view class="txt">结算收益</view>
						<view class="num">200.00</view>
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
				IMAGE_URL:this.IMAGE_URL,
				end_time:"",
				time:""
			}
		},
		onLoad() {
			this.end_time = this.time = this.getToday()
		},
		methods: {
			chooseTime(e){
				this.time = e.detail.value
			},
			getToday(){
				let today = new Date()
				let Y = today.getFullYear()
				let M = today.getMonth()+1
				let D = today.getDate()
				let newDate = Y+"-"+M
				// console.log(newDate)
				return newDate
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.total-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0 30rpx;

		.total-box-con {
			position: relative;

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
</style>
