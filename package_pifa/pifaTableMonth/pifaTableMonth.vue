<template>
	<view>
		<u-navbar back-icon-size="48" title="批发报表" titleColor="#ffffff" back-icon-color="#ffffff" immersive :border-bottom="false"
			:background="{background:'transparent'}"></u-navbar>
		<view class="flex flex-direction" style="height: 100vh;width:100vw;">
			<view class="top-nav" style="justify-content: space-between;display: flex;flex-direction: column;">
	
				<image :src="IMAGE_URL+'/wxapp/withdraw/pifa_table_bg.png'" style="position: relative;width: 100%;height:420rpx" mode="widthFix"></image>
					
					<view class="time-box flex justify-between">
									
						<picker :value="year" mode="date" start="2000-01-01" fields="year" :end="end_time" @change="chooseTime">
							<view class="time  text-black">{{year}}<text class="cuIcon-triangledownfill"></text>
							</view>
						</picker>
						<view></view>
					</view>
									
					<view class="top-nav-box" >
						<view style="display: flex;flex-direction: row;justify-content: space-between;">
							<view>
								<text style="color: #333333;font-size: 28rpx;">批发总额</text>
							</view>
							<view style="width: 0;"></view>
							
						</view>
						
						<view style="display: flex;flex-direction: row;margin-left: 32rpx;margin-top: 20rpx;justify-content: space-between;">
						
							<view style="width: 0;"></view>
							<view style="">
								<text style="color: #8D1D22;font-size: 64rpx;font-weight: bold;">¥{{amount|toFixed(2)}}</text>
							</view>
						</view>
					</view>
						
			

			</view>
			
			<view style="display: flex;flex-direction: column;background-color: #f6f6f6;border-radius: 20rpx;width: 100%;height: 100%;margin-top: 100rpx;"> 
				
					
				<scroll-view scroll-y="true" style="height: 0;width: 100%;padding: 0 24rpx;" class="flex-sub" refresher-enabled="true" enable-flex="true"
					@refresherrestore="onRestore" @refresherrefresh="onRefresh" :refresher-triggered="triggered">
					<view v-if="profitList==null">
						<view class="flex flex-direction  align-center" style="width: 100vw;height:80vh;">
							<image :src="IMAGE_URL+'/wxapp/null01.png'" style="width: 300rpx;margin-top: 200rpx;"
								mode="widthFix"></image>
							<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">没有数据哦~
							</view>
						</view>
					</view>
					
					<view style="display: flex;flex-direction: column;background-color: white;margin: 0 15rpx;border-radius: 16rpx;">
						<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding:24rpx;">
							<view style="width: 200rpx;">
								<text style="color: #333;font-size: 28rpx;">日期</text>
							</view>
							<view style="width: 260rpx;">
								<text style="color: #333;font-size: 28rpx;">订单数</text>
							</view>
					
							<view style="width: 190rpx;">
								<text style="color: #333;font-size: 28rpx;">批发金额</text>
							</view>
						
						</view>
						<view @tap="nextPage(item.name)" class="item"
							style="display: flex;flex-direction: column;padding-top: 32rpx;padding-left: 24rpx;padding-right: 24rpx;"
							v-for="item in profitList">
								<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
									<view style="width: 220rpx;">
										<text style="color: #666;font-size: 24rpx;">{{item.name}}</text>
									</view>
									<view style="width: 260rpx;">
										<text style="color: #666;font-size: 24rpx;">{{item.count}}</text>
									</view>
								
									<view style="width: 190rpx;">
										<text style="color: #D5101A;font-size: 24rpx;">¥{{item.amount|toFixed(2)}}</text>
									</view>
								<text class="cuIcon-right"></text>
								</view>
							<view
								style="background-color: #eee;height: 1rpx;margin-top: 32rpx;">
							</view>
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
				end_time: "",
				profitList: [],
				start:'',
				end:'',
				loadStatus:'loadmore',
				stopLoad: false,
				year:'',
				amount:0,
			}
		},
		onLoad(option) {
			if (option.year != null) {
				this.year = option.year
			}
			this._freshing = false;
			this.end_time =  this.getToday()
			console.log(this.year)
		
			this.initDate()
			this.getDetail()
		},
		methods: {
			nextPage(month){
				uni.navigateTo({
					url: "/package_pifa/pifaTableDay/pifaTableDay?month=" + month
				})
			},
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
		
				this.stopLoad = false
				this.profitList = []
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
				let Y = this.year
				
				this.start = Y+'-01-01T00:00:00.000'
				this.end = (parseInt(Y)+1)+'-01-01T00:00:00.000'
				console.log(this.start)
				console.log(this.end)
				
			},
			chooseTime(e) {
				let time = e.detail.value
				console.log(time)
				let day = new Date(time)
				console.log(day)
				
				this.year = day.getFullYear()
				let Y = this.year
				
				this.start = Y+'-01-01T00:00:00.000'
				this.end =(parseInt(Y)+1) +'-01-01T00:00:00.000'
				
				console.log(this.start)
				console.log(this.end)
		
				this.onRefresh()
			},
			getDetail() {
	
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"

				this.$u.post('/api/v2/app/profit/sale/count', {
					user_id: uni.getStorageSync("userInfo").id,
					kind:2,
					start:this.start,
					end:this.end
					
				}).then(res => {
					console.log(res.data)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					if(res.data.data!=null){
						this.profitList = res.data.data.data
						this.amount = res.data.data.total
					}
					// this.profitList = [
					// 	{
					// 		name:"2020-12",
					// 		count:'10',
					// 		amount:890
					// 	},
					// 	{
					// 		name:"2020-10",
					// 		count:'10',
					// 		amount:89012
					// 	},
					// 	{
					// 		name:"2020-09",
					// 		count:'10',
					// 		amount:89012
					// 	},
					// 	{
					// 		name:"2020-08",
					// 		count:'10',
					// 		amount:89012
					// 	},
					// 	{
					// 		name:"2020-01",
					// 		count:'10',
					// 		amount:89022
					// 	}
					// ]
					
					// this.amount = 100
					

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
			//margin-top: 230rpx;
			position: absolute;
			top: 300rpx;
			width: 90%;
			left: 40rpx;
			margin-right: 24rpx;
			height: 230rpx;
			z-index: 10;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 48rpx;
			background-color: white;

			.nav-box {
				height: 320rpx;
				margin: 20rpx 12rpx;
				background-size: 100% auto;
				padding: 24rpx 24rpx;

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
		position: absolute;
		top: 170rpx;
		left: 0rpx;
		line-height: 60rpx;
		padding: 20rpx 30rpx;
		color: #fff;
		font-size: 48rpx;

		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
			color: #fff;
			//background-color: white;
		}

	}

	.item {
		//background-color: white;
		width: 100%;
	}
</style>
