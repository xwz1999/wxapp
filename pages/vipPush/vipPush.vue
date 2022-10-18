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
								<text style="color: #D5101A;font-size: 40rpx;font-weight: bold;">6</text>
							</view>
							<view style="margin-left: 200rpx;">
								<view style="padding: 8rpx 16rpx;background-color: #E21830;color: #fff;min-width: 50rpx;border-radius:5rpx;">推广 ></view>
							</view>
						</view>
						<image :src="IMAGE_URL+'/wxapp/withdraw/vip_push_line.png'" style="width: 80%;margin-left:32rpx;margin-right: 50rpx;" mode="widthFix"></image>
						<view style="display: flex;flex-direction: row;margin-left: 32rpx;margin-top: 20rpx;align-items: center;">
							<view>
								<text style="color: #333333;font-size: 28rpx;">推广收益</text>
							</view>
							<view style="width: 32rpx;"></view>
							<view style="">
								<text style="color: #D5101A;font-size: 40rpx;font-weight: bold;">¥40000</text>
							</view>
						</view>
					</view>
						
				
				<image :src="IMAGE_URL+'/wxapp/withdraw/vip_shop_img.png'" style="width: 120rpx;margin-top: 260rpx;position: absolute;top: 0;right: 30rpx;" mode="widthFix"></image>

			</view>
			
			<view style="display: flex;flex-direction: column;background-color: #fff;border-radius: 20rpx;position: absolute;top: 400rpx;z-index: 10;"> 
				
					<view class="time-box flex justify-between">
				
						<picker mode="date" start="2000-01-01" fields="month" :end="end_time" @change="chooseTime">
							<view class="time  text-black">{{time}}<text class="cuIcon-triangledownfill"></text>
							</view>
						</picker>
						<view></view>
					</view>
				
				
				
				<scroll-view scroll-y="true" style="height: 0;" class="flex-sub" refresher-enabled="true" enable-flex="true"
					@refresherrestore="onRestore" @refresherrefresh="onRefresh" :refresher-triggered="triggered">
					<view v-if="balanceList.length==0">
						<view class="flex flex-direction  align-center" style="width: 100vw;height:80vh;">
							<image :src="IMAGE_URL+'/wxapp/null01.png'" style="width: 300rpx;margin-top: 200rpx;"
								mode="widthFix"></image>
							<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">没有数据哦~
							</view>
						</view>
					</view>
					<view class="item"
						style="display: flex;flex-direction: column;padding-top: 32rpx;padding-left: 24rpx;padding-right: 24rpx;"
						v-for="item in balanceList">
						<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
								<view style="display: flex;flex-direction: row;align-items: center;">
									<image :src="getImage(item.kind)" style="width: 88rpx;height: 88rpx;" mode="widthFix">
									</image>
									<view style="width: 24rpx;"></view>
									<view style="display: flex;flex-direction: column;">
										<view>
											<text>
												{{_getTitle(item.kind)}}
											</text>
											<text>{{item.orderId!=0?item.orderId:""}}</text>
										</view>
										<view style="height:20rpx;"></view>
										<text>{{item.createdAt}}</text>
									</view>
								</view>
								<text v-if="item.amount>0" style="color: #D5101A;font-size: 32rpx;margin-right: 24rpx;">{{item.amount>0?('+'+item.amount):item.amount}}</text>
								<text v-else style="color: #333333;font-size: 32rpx;margin-right: 24rpx;">{{item.amount>0?('+'+item.amount):item.amount}}</text>
							</view>
						<view
							style="background-color: #eee;height: 1rpx;width: 100%;margin-top: 32rpx;margin-left: 100rpx;">
						</view>
					</view>
					<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20"/>
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
				balanceDetail: null,
				end_time: "",
				time: '',
		
				balanceList: [],
				deposit:0,
				allDeposit:0,
				end:'',
				start:'',
				loadStatus:'loadmore',
				stopLoad: false,
				page: 0,
				limit:10,
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
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page  = 0
				this.stopLoad = false
				this.balanceList = []
				
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
				this.start = Y + "-" + M + "-"+D+"T00:00:00.000"
				
				let Y1 = today.getFullYear()
				let D1 = '01'
				let M1 = today.getMonth() + 2
				if (M1 === 1) {
					M1 = 12
					Y1 = Y1 - 1
				}
				if (M1 < 10) {
					M1 = '0' + M1
				}
				this.end = Y1 + "-" + M1 + "-"+D1+"T00:00:00.000"
				
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
				this.start = Y + "-" + M + "-"+D+"T00:00:00.000"
				console.log(this.start)
				
				let Y1 = day.getFullYear()
				let D1 = '01'
				let M1 = day.getMonth() + 2
				if (M1 === 1) {
					M1 = 12
					Y1 = Y1 - 1
				}
				if (M1 < 10) {
					M1 = '0' + M1
				}
				this.end = Y1 + "-" + M1 + "-"+D1+"T00:00:00.000"
				console.log(this.end)
				this.onRefresh()
			},
			toWithdraw() {
				uni.navigateTo({
					url: "/packageA/withdraw/withdraw"
				})
			},
			toWithdrawDetail() {
				uni.navigateTo({
					url: "/packageA/withdrawDetail/withdrawDetail"
				})
			},
			toWithdrawRecord() {
				uni.navigateTo({
					url: "/packageA/withdrawRecord/withdrawRecord"
				})
			},
			getDetail() {
	
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				this.page++
				this.$u.post('/api/v2/app/company/record/list', {
					page: this.page,
					limit: this.limit,
					start: this.start,
					end:this.end,
					kind:this.statusNum
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.list
					if (list.length < this.limit) {
						this.stopLoad = true
						this.loadStatus = "nomore"
							this.balanceList.push(...list)
							return
					}
					this.balanceList.push(...list)
					console.log(this.balanceList)
				});
			},

			_getTitle(type) {
				switch (type) {
					case 1:
						return '订单支付';
					case 2:
						return '订单取消';
					case 3:
						return '预存款充值';
					default:
						return '订单支付';

				}
			},

			getImage(type) {
				switch (type) {
					case 1:
						return this.IMAGE_URL + '/wxapp/mine/ic_recharge_order_pay.png';
					case 2:
						return this.IMAGE_URL + '/wxapp/mine/ic_recharge_order_cancle.png';
					case 3:
						return this.IMAGE_URL + '/wxapp/mine/ic_recharge_f.png';
					default:
						return this.IMAGE_URL + '/wxapp/mine/ic_recharge_order_pay.png';
				}
			}
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
		
	}
</style>
