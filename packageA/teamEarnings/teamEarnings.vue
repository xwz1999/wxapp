<template>
	<view>
		<u-navbar :title="title" :background="{backgroundColor: '#16182B'}" back-icon-color="#fff" title-color="#fff"
		 :border-bottom="false"></u-navbar>
		 
		<view class="total-box">
			<view class="flex align-center justify-center team-nav" >
				<text>每月22号结算上月团队收益</text>
			</view>
			<view class="total-box-con bg-img" :style="'background-image: url('+STATIC_URL+'bg.png);'">
				<view class="con-box flex flex-direction justify-between">
					<view>
						<view class="text">预估收益(瑞币)</view>
						<view style="font-size: 48rpx;color: #000;">{{data.historyIncome?data.historyIncome:0}}</view>
					</view>
					<view class="flex justify-between">
						<view class="text-center">
							<view class="text">销售额(元)</view>
							<view class="num">{{data.teamAmount?data.teamAmount:0}}</view>
						</view>
						<view class="text-center">
							<view class="text">团队成员(人)</view>
							<view class="num">{{data.memberNum?data.memberNum:0}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="time-box flex justify-between">
			<picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
				<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text></view>
			</picker>
		</view>
		<view class="data-box">
			
			<view >
				<view class="team-box bg-white">
					<view style="padding:30rpx;border-bottom: 2rpx dashed #F1F1F1;">
						<view class="text-black subtitle">收益明细</view>
						<view class="flex justify-between" style="line-height: 50rpx;">
							<view class="text-center">
								<view class="txt">结算收益(瑞币)</view>
								<view class="num">{{incomeDetail.income|toFixed(2)}}</view>
							</view>
							<view class="text-center">
								<view class="txt">销售额(元)</view>
								<view class="num">{{incomeDetail.amount|toFixed(2)}}</view>
							</view>
							<view class="text-right">
								<view class="txt">提成比例(%)</view>
								<view class="num">{{incomeDetail.percent|toFixed(2)}}</view>
							</view>
						</view>
					</view>
					<view style="padding:10rpx 30rpx 30rpx;"v-if="list.length">
						<view class="text-black subtitle">团队贡献榜</view>
						<view class="team-peoples">
							<view class="people flex" v-for="(item,index) in list" :key="index">
								<view class="people-pic">
									<u-lazy-load threshold="-100" :image="item.headImgUrl" :index="index" height="80" border-radius="40" :error-img="IMAGE_URL + '/null05.png'"  img-mode="aspectFill"></u-lazy-load>
								</view>
								<view class="flex-sub flex flex-direction justify-around">
									<view class="flex justify-between">
										<view class="people-name">{{item.username}}</view>
										<view>{{item.amount}}</view>
									</view>
									<view class="flex" style="font-size: 26rpx;color: #888888;">
										<view style="margin-right: 100rpx;"><text class="cuIcon-dianhua"></text>{{item.mobile}}</view>
										<view v-if="item.roleLevel==500"><text class="cuIcon-choiceness"></text>会员</view>
										<view v-if="item.roleLevel==400"><text class="cuIcon-choiceness"></text>店主</view>
										<view v-if="item.roleLevel==300"><text class="cuIcon-choiceness"></text>白银</view>
										<view v-if="item.roleLevel==200"><text class="cuIcon-choiceness"></text>黄金</view>
										<view v-if="item.roleLevel==100"><text class="cuIcon-choiceness"></text>钻石</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="null flex justify-center flex-direction align-center" style="padding: 30rpx 0;" v-else>
						<image :src="IMAGE_URL + '/null05.png'"  style="width: 300rpx;" mode="widthFix"></image>
						<view style="font-size: 24rpx;color: #DDDDDD;">暂无业绩，请耐心等待</view>
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
				title: "团队收益",
				end_time: "",
				time: "",
				data: {
					amount: 0,
					historyIncome: 0,
					orderNum: 0
				},
				money: 0,
				list: [],
				incomeDetail:{
					income:0,
					amount:0,
					percent:0
				}
			}
		},
		onLoad(options) {
			console.log(options)
			this.end_time = this.time = this.getToday()
			this.getInfo()
		},
		methods: {
			chooseTime(e) {
				this.time = e.detail.value
				this.getInfo()
			},
			getToday() {
				let today = new Date()
				let Y = today.getFullYear()
				let D = today.getDate()
				let M = today.getMonth() + 1
				if(M === 1){
					M = 12
					Y = Y-1
				}
				if(M < 10){
					M = '0' + M
				}
				let newDate = Y + "-" + M
				// console.log(newDate)
				return newDate
			},
			//获取我的全部信息
			getInfo() {
				let sendData = {
					userId: uni.getStorageSync("userInfo").id,
					orderBy: "desc",
				}
				if (this.time) {
					sendData.date = this.time
				}
				console.log(sendData)
				this.$u.post('/api/v1/users/profile/my_info/team', sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						// this.$u.toast(res.data.msg);
						return
					}
					this.data = res.data.data.teamIncome
					this.list = res.data.data.billboard?res.data.data.billboard:[]
					this.incomeDetail = res.data.data.incomeDetail
				});
			}
		}
	}
</script>

<style lang="scss">
	.team-nav{
		background: #FFFFFF;
		width: 99%;
		margin: 0 auto;
		margin-bottom: 20rpx;
		padding: 16rpx 0;
	}
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
		padding: 20rpx 30rpx;
		color: #AAAAAA;
		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
		}
	
	}
	.data-box{
		background-color: #FFFFFF;
		box-shadow: 0 1rpx 10rpx 1rpx rgba(0, 0, 0, 0.05);
		margin:0 30rpx 30rpx;
		width: 690rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.team-box {
		.subtitle{
			line-height: 70rpx;
			font-weight: 900;
		}
		.txt{
			font-size: 24rpx;
			color: #999999;
		}
		.num{
			color: #333333;
		}
		.team-peoples {
			.people {
				padding: 20rpx 0;
				line-height: 40rpx;
				border-bottom: 1rpx solid #F3F3F3;

				.people-pic {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 30rpx;
				}
			}

		}
	}
</style>
