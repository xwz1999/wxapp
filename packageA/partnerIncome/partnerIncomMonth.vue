<template>
	<view class="flex flex-direction" style="height: 100vh;width:100vw;">
		<!-- <picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
			<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text></view>
		</picker> -->
		<view class="time-box flex justify-between">
			<picker mode="selector" :range="month" :value="defaultStatus" @change="chooseTime"
				style="margin-top: 20rpx;">

				<view class="time bg-white text-black">
					{{end_time}}
					<text class="cuIcon-triangledownfill">
					</text>
				</view>

			</picker>
		</view>
		<view class="topImage bg-img" :style="'background-image: url('+IMAGE_URL+'/wxapp/mine/partner_bg.png)'">
			<text style="font-size: 32rpx;color: #333333;">本月{{name}}</text>
			<text v-if="income"
				style="font-size: 56rpx;color: #D5101A;margin-top: 20rpx;">{{income.all.toFixed(2)}}</text>
		</view>

		<view
			style="display: flex;flex-direction: row;margin-top: 50rpx;justify-content: space-between;padding: 0 40rpx;">
			<text style="font-size:28rpx ;color: #999999;">累计未到帐：
				<text v-if="income" style="font-size:28rpx ;color: #D5101A;">{{income.wei_dao_z.toFixed(2)}}</text>
			</text>
			<text style="font-size:28rpx ;color: #999999;">累计已到帐：
				<text v-if="income" style="font-size:28rpx ;color: #D5101A;">{{income.yi_dao_z.toFixed(2)}}</text>
			</text>
		</view>
		<scroll-view scroll-y="true" style="height: 0;" class="flex-sub" refresher-enabled="true" enable-flex="true"
			@refresherrestore="onRestore" @refresherrefresh="onRefresh" :refresher-triggered="triggered">
			<view v-if="entry.length==0">
				<view class="flex flex-direction  align-center" style="width: 100vw;height:80vh;">
					<image :src="IMAGE_URL+'/wxapp/null01.png'" style="width: 300rpx;margin-top: 350rpx;"
						mode="widthFix"></image>
					<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">没有数据哦~
					</view>
				</view>
			</view>
			<view>
				<view class="flex align-center text-center"
					style="background: #FFFFFF;height: 88rpx; margin-top: 20rpx;line-height: 88rpx; font-size: 32rpx;">
					<view class='' style="flex: 1;"><text>日期</text></view>
					<view class='' style="flex: 1;"><text>订单数</text></view>
					<view class='' style="width: 230rpx;"><text>未到帐收益</text></view>
					<view class='' style="width: 230rpx;"><text>已到账收益</text></view>
				</view>
				<view class="" style="margin-bottom: 40rpx;">
					<view class="flex align-center text-center" v-for="item in entry"
						style="background: #FFFFFF;height: 88rpx; line-height: 88rpx; border-top: 1rpx solid  #F5F5F5; font-size: 32rpx; ">
						<view class='' style="flex: 1;"><text>{{item.name}}</text></view>
						<view class='' style="flex: 1;"><text>{{item.count}}</text></view>
						<view class='' style="width: 230rpx;"><text>{{item.not_income}}</text></view>
						<view class='' style="width: 230rpx; color: #D5101A;"><text>{{item.income}}
							</text></view>
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
				IMAGE_URL: this.IMAGE_URL,
				triggered: false,
				kind: 5,
				income: null,
				entry: [],
				year: "",
				name: '',
				end_time: "",
				time: '',
				month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ],
				end_month: '',
				defaultStatus: 0,
			}
		},
		onLoad(options) {
			console.log(options)
			this._freshing = false;
			uni.setNavigationBarTitle({
				title: options.name
			})
			this.name = options.name
			this.kind = options.kind;
			this.year = options.year;
			this.end_time = this.time = this.getToday()
			this.getDetail()
		},
		methods: {
			chooseTime(e) {
				let index = e.detail.value

				this.defaultStatus = index

				let realIndex = parseInt(index) + 1

				this.end_month = '0' + realIndex
				this.end_time = this.year + this.end_month
				console.log(this.end_month)
				this.onRefresh()
			},

			getToday() {
				let today = new Date()
				let Y = this.year
				let D = today.getDate()
				let M = today.getMonth() + 1
				if (M === 1) {
					M = 12
					Y = Y - 1
				}
				if (M < 10) {
					M = '0' + M
				}
				let newDate = Y + M
				// console.log(newDate)
				return newDate
			},
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.getDetail()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			getDetail() {
				console.log(this.end_time)
				this.$u.post('/api/v2/app/profit/shop', {
					user_id: uni.getStorageSync("userInfo").id,
					kind: parseInt(this.kind),
					date: this.end_time
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.income = res.data.data
					if (res.data.data.entry != null) {
						this.entry = res.data.data.entry
					} else {
						this.entry = []
					}
					console.log(this.income);
				});
			},
		}
	}
</script>

<style lang="scss">
	.topImage {
		background-size: 100% 220rpx;
		background-repeat: no-repeat;
		height: 220rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		margin: 10rpx 50rpx;
		padding-left: 50rpx;
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
</style>
