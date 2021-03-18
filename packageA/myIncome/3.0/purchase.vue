<!-- 自购 -->
<template>
	<view class="" style="width: 750rpx; overflow: hidden;">
		<view class="myNav">
		</view>
		<view class="content">
			<view class="tab-box">
				<view class="tabs flex justify-between align-center">
					<view class="tab" v-for="(tab,index) in tabList" :key='index' :class="current===index?'tab-active':''" @click="tabChange(index)">
						<text>{{tab.name}}</text>
					</view>
				</view>
			</view>
			<view class="" style="margin-top: 18rpx;">
				<swiper class="flex-sub" :current="current" :indicator-dots="false" :autoplay="false" @change="changeCurrent">
					<swiper-item v-for="(item,index) in tabList" :key='index'>
						<scroll-view scroll-y="true">
							<view>
								<view class="card-box">
									<image :src="otherBg" mode="widthFix" style="border-radius:16rpx; "></image>
									<view class="card flex  flex-wrap" style=" align-content: space-between;">
										<view class="flex  justify-between align-end" style="width: 100%;">
											<view class="">
												<text style="font-size:36rpx;color:#6A6A6A;">预估收益(瑞币)</text>
												<view class="">
													<text style="font-size:56rpx;color:#333333;">{{tabsListData[current].purchase.amount}}</text>
												</view>
											</view>
											<view class="">
												<image :src="iconPic" mode="widthFix" style="width: 96rpx; height: 110rpx;"></image>
											</view>
										</view>
										<view class="flex  justify-between" style="width: 100%;">
											<view>
												<text style="font-size:36rpx;color:#6A6A6A;">销售额(元)</text>
												<view class="">
													<text style="font-size:56rpx;color:#333333;">{{tabsListData[current].purchase.amount}}</text>
												</view>
											</view>
											<view class="">
												<text style="font-size:36rpx;color:#6A6A6A;">提成比例(%)</text>
												<view class="">
													<text style="font-size:56rpx;color:#333333;">{{tabsListData[current].purchase.amount}}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- <view class="flex justify-center align-center text-center" style="width: 100%; height: 100%;">
								<view>
									<view class="">
										<text style="font-size:36rpx;color:#999999;">预估收益</text>
									</view>
									<view class="">
										<text style="font-size:56rpx;color:#333333;">{{tabsListData[current].purchase.amount}}</text>
									</view>
								</view>
							</view> -->
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<view class="table-list" v-if="current>1">
				<view class="table-head flex  align-center">
					<view class="table-title">
						<text>日期</text>
					</view>
					<view class="table-title">
						<text>销售额</text>
					</view>
					<view class="table-title">
						<text>订单数</text>
					</view>
					<view class="table-title">
						<text>预估收益</text>
					</view>
				</view>
				<view class="table-body">
					<view>
						<view class="table-column flex align-center " v-for="(td,index) in tabsListData[current].purchaseList" :key='index'>
							<view class="table-td">
								<text>{{td.day|formatDayDate}}</text>
							</view>
							<view class="table-td">
								<text>{{td.salesVolume}}</text>
							</view>
							<view class="table-td">
								<text>{{td.count}}</text>
							</view>
							<view class="table-td">
								<text>{{td.amount}}</text>
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
				IMAGE_URL: this.IMAGE_URL,
				otherBg: null,
				iconPic:null,
				roleLevel: 0,
				tabList: [{
					name: '今日'
				}, {
					name: '昨日'
				}, {
					name: '本月',
				}, {
					name: '上月',
				}],
				tabsListData: [],
				current: 0,

			}
		},
		mounted() {

			this.roleLevel = this.$store.state.roleLevel
			this.otherBg = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')
			this.iconPic =  this.IMAGE_URL +this.$options.filters['roleFilter'](this.roleLevel, 'badge')
			let today = new Date()
			let nowYear = today.getFullYear()
			let nowMonth = today.getMonth()
			let nowDay = today.getDate()
			// 当天
			const newDay = () => {
				let todayDate = new Date(nowYear, nowMonth, nowDay);
				return this.formatDayDate(todayDate);
			};
			// 昨天
			const lastDay = () => {
				let todayDate = new Date(nowYear, nowMonth, nowDay - 1);
				return this.formatDayDate(todayDate);
			};
			// 当月
			const newMonth = () => {
				let todayDate = new Date(nowYear, nowMonth, nowDay);
				return this.formatMonthDate(todayDate);
			};
			// 上月
			const lastMonth = () => {
				let todayDate = new Date(nowYear, nowMonth - 1, nowDay);
				return this.formatMonthDate(todayDate);
			};
			this.getDay(newDay(), 0)
			this.getDay(lastDay(), 1)
			this.getMonth(newMonth(), 2)
			this.getMonth(lastMonth(), 3)
			console.log(this.tabsListData)
		},
		filters: {
			formatDayDate(mmdd) {
				let date = new Date(mmdd);
				let myyear = date.getFullYear();
				let mymonth = date.getMonth() + 1;
				let myDay = date.getDate()
				if (myDay < 10) {
					myDay = '0' + myDay
				}
				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				return (mymonth + '月' + myDay + '日');
			},
		},
		methods: {
			changeCurrent(e) {
				this.current = e.detail.current
				// this.totalAmount()
			},
			tabChange(index) {
				this.current = index
			},
			getMonth(month, index) {
				this.$u.post('/api/v2/app/user/income/month_expect', {
					month: month
				}).then(res => {

					this.$set(this.tabsListData, index, res.data.data)

				})
				// const res = await this.$u.post('/api/v2/app/user/income/month_expect', {
				// 	month: month
				// })

			},
			getDay(day, index) {
				this.$u.post('/api/v2/app/user/income/day_expect', {
					day: day
				}).then(res => {

					this.$set(this.tabsListData, index, res.data.data)

				})
				// const res = await this.$u.post('/api/v2/app/user/income/day_expect', {
				// 	day: day
				// })

				// this.$set(this.tabsListData, index, res.data.data)

			},
			//天数格式化
			formatDayDate(date) {
				let myyear = date.getFullYear();
				let mymonth = date.getMonth() + 1;
				let myDay = date.getDate()
				if (myDay < 10) {
					myDay = '0' + myDay
				}
				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				return (myyear + "-" + mymonth + '-' + myDay);
			},
			// 月格式化
			formatMonthDate(date) {
				let myyear = date.getFullYear();
				let mymonth = date.getMonth() + 1;
				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				return (myyear + "-" + mymonth);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.myNav {
		position: absolute;
		top: 0;
		left: -100rpx;
		width: 950rpx;
		height: 386rpx;
		border-radius: 0 0 350rpx 350rpx;
		background: #16182B;
		z-index: -1;
	}

	.card-box {
		width: 690rpx;
		margin: 0rpx auto;
		position: relative;
		.card {
			position: absolute;
			padding: 30rpx 40rpx 40rpx 40rpx;
			top: 0;
			width: 100%;
			height: 100%;
			left: 0;
		}

	}

	.content {
		.tab-box {
			margin: 0 30rpx;
			.tabs {
				.tab {
					width: 120rpx;
					height: 44rpx;
					line-height: 44rpx;
					text-align: center;
					border-radius: 20rpx;
					border: 2rpx solid #FFFFFF;

					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					&.tab-active {
						background: #FFFFFF;
						color: #000000;
					}
				}
			}
		}
		.table-list {
			background-color: #FFFFFF;
			margin-top: 20rpx;
			padding: 0 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			.table-head {
				font-size: 32rpx;
				.table-title {
					height: 90rpx;
					line-height: 90rpx;
					width: 25%;
					text-align: center;
				}
			}
			.table-body {
				font-size: 28rpx;
				.table-column {
					border-top: 2rpx solid #EEEEEE;
					.table-td {
						width: 25%;
						height: 90rpx;
						line-height: 90rpx;
						text-align: center;
					}
				}
			}

		}
	}
</style>
