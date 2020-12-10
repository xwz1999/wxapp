<template>
	<view class="flex flex-direction" style="height: 100%;">
		<u-navbar :title="title" :background="{backgroundColor: '#16182B'}" back-icon-color="#fff" title-color="#fff"
		 :border-bottom="false"></u-navbar>
		<view class="total-box">
			<view class="total-box-con bg-img" :style="'background-image: url('+IMAGE_URL+'/photo/FqgMOAhPeB9Xg7__8fZFYI-8Oerl.png);'">
				<view class="con-box flex flex-direction justify-between">
					<view>
						<view class="text">预估收益(瑞币)</view>
						<view style="font-size: 48rpx;color: #000;">{{data.historyIncome}}</view>
					</view>
					<view class="flex justify-between">
						<view>
							<view class="text">销售额(元)</view>
							<view class="num">{{data.teamAmount}}</view>
						</view>
						<view>
							<view class="text">团队成员(人)</view>
							<view class="num">{{data.memberNum}}</view>
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
		<scroll-view class="flex-sub scroll" scroll-y="true">
			<view class="null flex justify-center flex-direction align-center" v-if="list.length==0">
				<image :src="IMAGE_URL+'/photo/FkdR-m8xwYqKqxa9i547PHEmtK7r.png'" style="width: 300rpx;" mode="widthFix"></image>
				<view style="font-size: 24rpx;color: #DDDDDD;">暂无业绩，请耐心等待</view>
			</view>
			<view v-else>
				<view class="team-box bg-white">
					<view style="padding:30rpx;border-bottom: 2rpx dashed #F1F1F1;">
						<view class="text-black subtitle">收益明细</view>
						<view class="flex justify-between text-center" style="line-height: 50rpx;">
							<view>
								<view class="txt">结算收益(瑞币)</view>
								<view class="num">{{incomeDetail.income}}</view>
							</view>
							<view>
								<view class="txt">销售额(元)</view>
								<view class="num">{{incomeDetail.amount}}</view>
							</view>
							<view>
								<view class="txt">提成比例(5)</view>
								<view class="num">{{incomeDetail.percent}}%</view>
							</view>
						</view>
					</view>
					<view style="padding:10rpx 30rpx 30rpx;">
						<view class="text-black subtitle">团队贡献榜</view>
						<view class="team-peoples">
							<view class="people flex align-center" v-for="(item,index) in 20" :key="index">
								<view class="people-pic bg-img" :style="'background-image: url('+'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1163880681,1457601312&fm=26&gp=0.jpg'+');'"></view>
								<view class="flex-sub">
									<view class="people-name">张三</view>
									<view class="flex">
										<view style="margin-right: 100rpx;">13376888888</view>
										<view>会员</view>
									</view>
								</view>
								<view>300.34</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL,
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
		onLoad() {
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
				let M = today.getMonth() + 1
				let D = today.getDate()
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
				this.$u.post('/api/v1/users/profile/my_info/team', sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.data = res.data.data.teamIncome
					this.incomeDetail = res.data.data.incomeDetail
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
	.scroll{
		background-color: #FFFFFF;
		box-shadow: 0 3rpx 10rpx 3rpx rgba(0, 0, 0, 0.1);
		height: 0;margin:0 30rpx 30rpx;
		width: 690rpx;
		border-radius: 10rpx;
		overflow: hidden;
		.null{
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}
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
