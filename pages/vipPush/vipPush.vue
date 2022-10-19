<template>
	<view>
		<u-navbar back-icon-size="48" title="VIP店推广" titleColor="#ffffff" back-icon-color="#ffffff" immersive :border-bottom="false"
			:background="{background:'transparent'}"></u-navbar>
		<view class="flex flex-direction" style="height: 100vh;width:100vw;">
			<view class="top-nav" style="justify-content: space-between;display: flex;flex-direction: column;">
				<view class="" style="position: relative;width: 100%;background: linear-gradient(to right,#E8694E,#CE1B1B);height:420rpx">
						</view>
				
					<view class="top-nav-box" >
						<view style="display: flex;flex-direction: row;margin-left: 32rpx;margin-bottom: 15rpx;align-items: center;">
							<view>
								<text style="color: #333333;font-size: 28rpx;">推广次数</text>
							</view>
							<view style="width: 32rpx;"></view>
							<view>
								<text style="color: #D5101A;font-size: 40rpx;font-weight: bold;">{{count}}</text>
							</view>
							<view style="margin-left: 200rpx;">
								<view style="padding: 8rpx 16rpx;background-color: #E21830;color: #fff;min-width: 50rpx;border-radius:5rpx;">推广></view>
								<button plain="true" open-type="share" style="position: absolute;left: 300rpx;right: 0;top:0;background-color: transparent;color: transparent;border:0">11</button>
							</view>
						</view>
						<image :src="IMAGE_URL+'/wxapp/withdraw/vip_push_line.png'" style="width: 80%;margin-left:32rpx;margin-right: 50rpx;" mode="widthFix"></image>
						<view style="display: flex;flex-direction: row;margin-left: 32rpx;margin-top: 20rpx;align-items: center;">
							<view>
								<text style="color: #333333;font-size: 28rpx;">推广收益</text>
							</view>
							<view style="width: 32rpx;"></view>
							<view style="">
								<text style="color: #D5101A;font-size: 40rpx;font-weight: bold;">¥{{amount|toFixed(2)}}</text>
							</view>
						</view>
					</view>
						
				
				<image :src="IMAGE_URL+'/wxapp/withdraw/vip_shop_img.png'" style="width: 120rpx;margin-top: 260rpx;position: absolute;top: 0;right: 30rpx;" mode="widthFix"></image>

			</view>
			
			<view style="display: flex;flex-direction: column;background-color: #fff;border-radius: 20rpx;position: absolute;top: 400rpx;z-index: 10;width: 100%;height: 100%;"> 
				
					<view class="time-box flex justify-between">
				
						<picker mode="date" start="2000-01-01" fields="month" :end="end_time" @change="chooseTime">
							<view class="time  text-black">{{time}}<text class="cuIcon-triangledownfill"></text>
							</view>
						</picker>
						<view></view>
					</view>
				
				
				
				<scroll-view scroll-y="true" style="height: 0;width: 100%;padding: 0 24rpx;" class="flex-sub" refresher-enabled="true" enable-flex="true"
					@refresherrestore="onRestore" @refresherrefresh="onRefresh" :refresher-triggered="triggered">
					<view v-if="profitList.length==0">
						<view class="flex flex-direction  align-center" style="width: 100vw;height:80vh;">
							<image :src="IMAGE_URL+'/wxapp/null01.png'" style="width: 300rpx;margin-top: 200rpx;"
								mode="widthFix"></image>
							<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">没有数据哦~
							</view>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;background-color: #F6F6F6;padding:24rpx;">
						<view style="width: 200rpx;">
							<text style="color: #333;font-size: 28rpx;">用户昵称</text>
						</view>
						<view style="width: 260rpx;">
							<text style="color: #333;font-size: 28rpx;">手机号</text>
						</view>
						<view style="width: 200rpx;">
							<text style="color: #333;font-size: 28rpx;">权益卡</text>
						</view>
						<view style="width: 190rpx;">
							<text style="color: #333;font-size: 28rpx;">金额</text>
						</view>
					
					</view>
					<view class="item"
						style="display: flex;flex-direction: column;padding-top: 32rpx;padding-left: 24rpx;padding-right: 24rpx;"
						v-for="item in profitList">
							<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
								<view style="width: 200rpx;background-color: white;">
									<text style="color: #666;font-size: 24rpx;">{{item.name}}</text>
								</view>
								<view style="width: 260rpx;background-color: white;">
									<text style="color: #666;font-size: 24rpx;">{{item.mobile}}</text>
								</view>
								<view style="width: 200rpx;background-color: white;">
									<text style="color: #666;font-size: 24rpx;">{{item.int}}</text>
								</view>
								<view style="width: 190rpx;background-color: white">
									<text style="color: #666;font-size: 24rpx;">¥{{item.amount|toFixed(2)}}</text>
								</view>
							
							</view>
						<view
							style="background-color: #eee;height: 1rpx;margin-top: 32rpx;">
						</view>
					</view>
				
				</scroll-view>
				
			</view>
			


		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				triggered: false,
				isEnterprise: false,
				
				end_time: "",
				time: '',
		
				profitList: [],
				deposit:0,
				allDeposit:0,
				start:'',
				loadStatus:'loadmore',
				stopLoad: false,
				page: 0,
				limit:10,
				userIncomeDataModel:null,
				count:0,
				amount:0,
			}
		},
		onLoad(option) {
			if (option.isEnterprise != null) {
				isEnterprise = option.isEnterprise
			}
			this._freshing = false;
			this.end_time = this.time = this.getToday()
			
			this.deposit = this.$store.state.userBrief.deposit
			this.allDeposit = this.$store.state.userBrief.all_deposit
			
			console.log(this.deposit)
			console.log(this.allDeposit)
			this.initDate()
			this.getDetail()
		},
		methods: {
			onShareAppMessage(res) {
				let shareObj = {
					title: "瑞库客VIP店铺权益卡｜尊享底价批发，每天低至一块钱！",
					path: 'pages/vip/vipBuy?type=share&invite='+ this.$store.state.invitationNo,
					imageUrl: this.IMAGE_URL+'/wxapp/withdraw/share_bg.jpg',
				}
				console.log(shareObj)
				return shareObj
			},
			getBenefit() {
				this.$u.post('/api/v2/app/user/profit', {
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.userIncomeDataModel = res.data.data
					this.count = this.userIncomeDataModel.count10
					this.amount = this.userIncomeDataModel.amount10
					console.log(this.userIncomeDataModel)
				});
			},
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page  = 0
				this.stopLoad = false
				this.profitList = []
				this.getBenefit()
				this.getDetail()
				
			
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
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
			initDate(){
				let today = new Date()
				let Y = today.getFullYear()
				let D = '01'
				let M = today.getMonth() + 1
				if (M === 1) {
					M = 12
					Y = Y - 1
				}
				if (M < 10) {
					M = '0' + M
				}
				this.start = Y + "-" + M 
				console.log(this.start)
		
				
			},
			chooseTime(e) {
				this.time = e.detail.value
				console.log(this.time)
				let day = new Date(this.time)
				console.log(day)
				
				let Y = day.getFullYear()
				let D = '01'
				let M = day.getMonth() + 1
				if (M === 1) {
					M = 12
					Y = Y - 1
				}
				if (M < 10) {
					M = '0' + M
				}
				this.start = Y + "-" + M 
				console.log(this.start)
				
		
				this.onRefresh()
			},
			getDetail() {
	
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				this.page++
				this.$u.post('/api/v2/app/user/profit/card', {
					date:this.start
				}).then(res => {
					console.log(res.data)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					if(res.data.data!=null){
						this.profitList = res.data.data
					}
					// this.profitList = [
					// 	{
					// 		name:"cc",
					// 		mobile:"15938093845",
					// 		int:'月卡',
					// 		amount:890
					// 	},
					// 	{
					// 		name:"bb",
					// 		mobile:"15938093845",
					// 		int:'季卡',
					// 		amount:1890
					// 	},
					// 	{
					// 		name:"bb",
					// 		mobile:"15938093845",
					// 		int:'年卡',
					// 		amount:2890
					// 	}
					// ]
					

					console.log(this.profitList)
				});
			},


		}
	}
</script>

<style lang="scss">

	
	
	
	.top-nav {
		position: relative;
		z-index: 10;
		font-size: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.top-nav-box {
			//margin:0 24rpx;
			margin-top: 190rpx;
			position: absolute;
			top: 0;
			width: 70%;
			left: 40rpx;
			margin-right: 24rpx;
			height: 180rpx;
			z-index: 2;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			
			background-color: white;

			.nav-box {
				height: 320rpx;
				margin: 20rpx 12rpx;
				background-size: 100% auto;
				padding: 42rpx 52rpx;

			}
		}
	}

	.bottom-box {
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		width: 100%;
		height: 152rpx;
		border: 1rpx solid #EEEEEE;
	}

	.time-box {
		line-height: 60rpx;
		padding: 20rpx 30rpx;
		color: #AAAAAA;

		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
			background-color: white;
		}

	}

	.item {
		background-color: white;
		width: 100%;
	}
</style>
