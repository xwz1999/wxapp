<template>
	<view class="">
		<view class="myNav">

		</view>
		<view class="tab-box">
			<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="change" active-color='#FF7473'></u-tabs>
			<swiper class="flex-sub" :current="current" :indicator-dots="false" :autoplay="false" @change="changeCurrent">
				<swiper-item v-for="(item,index) in tabList" :key='index'>
					<scroll-view scroll-y="true" style="height: 200rpx;">
						<view class="flex justify-center align-center text-center" style="width: 100%; height: 100%;">
							<view>
								<view class="">
									<text style="font-size:36rpx;color:#999999;">预估收益</text>
								</view>
								<view class="">
									<text style="font-size:56rpx;color:#333333;">{{amountTotal}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<view class="box bg-white">
				<navigator url="../selfBuyEarnings/selfBuyEarnings" hover-class="none" class="subtitle flex justify-between">
					<view class="flex align-center">
						<image src="../../static/mine/t01.png" style="width: 64rpx;" mode="widthFix"></image>
						<view>自购收益</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view>
						<view class="txt">订单(笔)</view>
						<view class="num">{{tabsListData[current].purchase.count}}</view>
					</view>
					<view>
						<view class="txt">销售额(元)</view>
						<view class="num">{{tabsListData[current].purchase.salesVolume}}</view>
					</view>
					<view>
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{tabsListData[current].purchase.amount}}</view>
					</view>
				</view>
			</view>

			<view class="box bg-white">
				<navigator url="../shareEarnings/shareEarnings" hover-class="none" class="subtitle flex justify-between">
					<view class="flex align-center">
						<image src="../../static/mine/t02.png" style="width: 64rpx;" mode="widthFix"></image>
						<view>导购收益</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view>
						<view class="txt">订单(笔)</view>
						<view class="num">{{tabsListData[current].guide.count}}</view>
					</view>
					<view>
						<view class="txt">销售额(元)</view>
						<view class="num">{{tabsListData[current].guide.salesVolume}}</view>
					</view>
					<view>
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{tabsListData[current].guide.amount}}</view>
					</view>
				</view>
			</view>

			<view class="box bg-white">
				<view class="subtitle flex justify-between" @tap="toTeamEarnings">
					<view class="flex align-center">
						<image src="../../static/mine/t03.png" style="width: 64rpx;" mode="widthFix"></image>
						<view>团队收益</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</view>
				<view class="money-box flex justify-between">
					<view>
						<view class="txt">团队销售额(元)</view>
						<view class="num">{{tabsListData[current].team.salesVolume}}</view>
					</view>
					<view>
						<view class="txt">提出比例(%)</view>
						<view class="num">{{tabsListData[current].team.ratio}}</view>
					</view>
					<view>
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{tabsListData[current].team.amount}}</view>
					</view>
				</view>
			</view>
			<view class="box bg-white">
				<navigator url="../shareEarnings/shareEarnings" hover-class="none" class="subtitle flex justify-between">
					<view class="flex align-center">
						<image src="../../static/mine/t02.png" style="width: 64rpx;" mode="widthFix"></image>
						<view>推荐收益</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view>
						<view class="txt">团队销售额(元)</view>
						<view class="num">{{tabsListData[current].recommend.salesVolume}}</view>
					</view>
					<view>
						<view class="txt">提出比例(%)</view>
						<view class="num">{{tabsListData[current].recommend.ratio}}</view>
					</view>
					<view>
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{tabsListData[current].recommend.amount}}</view>
					</view>
				</view>
			</view>
			<view class="box bg-white">
				<navigator url="../shareEarnings/shareEarnings" hover-class="none" class="subtitle flex justify-between">
					<view class="flex align-center">
						<image src="../../static/mine/t02.png" style="width: 64rpx;" mode="widthFix"></image>
						<view>平台奖励</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view>
						<view class="txt">团队销售额(元)</view>
						<view class="num">{{tabsListData[current].reward.salesVolume}}</view>
					</view>
					<view>
						<view class="txt">提出比例(%)</view>
						<view class="num">{{tabsListData[current].reward.ratio}}</view>
					</view>
					<view>
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{tabsListData[current].reward.amount}}</view>
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
				roleLevel: null,
				info: null,
				tabList: [{
					name: '今日'
				}, {
					name: '昨日'
				}, {
					name: '本月',
				}, {
					name: '上月',
				}],
				current: null,
				tabsListData: [],
				amountTotal:0
			}
		},
		mounted() {

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
			this.getDay(newDay())
			this.getDay(lastDay())
			this.getMonth(newMonth())
			this.getMonth(lastMonth())
			this.current = 0
		},
		methods: {
			totalAmount() {
				let obj = this.tabsListData[this.current]
				let numTotal = 0
				Object.keys(obj).forEach(function(key) {

					numTotal += obj[key].amount
				})
				this.amountTotal = numTotal
				
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
			changeCurrent(e) {
				console.log(e)
				this.current = e.detail.current
			},
			change(index) {
				this.current = index
				this.totalAmount()
			},
			getMonth(month) {
				this.$u.post('/api/v2/app/user/income/month_incomes', {
					month: month
				}).then(res => {
					// console.log(res)
					this.tabsListData.push(res.data.data)
				})
			},
			getDay(day) {
				this.$u.post('/api/v2/app/user/income/day_incomes', {
					day: day
				}).then(res => {
					this.tabsListData.push(res.data.data)
				})
			}
		},
		watch:{
			current: {
				handler(newValue) {
					this.totalAmount()
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myNav {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 386rpx;
		border-radius: 0 0 150rpx 150rpx;
		background: #16182B;
		z-index: -1;
	}

	.tab-box {
		width: 710rpx;
		height: 268rpx;
		overflow: hidden;
		margin: 24rpx auto;
		border-radius: 16rpx;
		background: #FFFFFF;
	}

	.box {
		overflow: hidden;
		padding: 0 20rpx;
		margin-bottom: 20rpx;

		.subtitle {
			padding: 0 20rpx;
			line-height: 84rpx;
			font-size: 32rpx;
			color: #000;
			border-bottom: 2rpx solid #E6E6E6;
			font-weight: 700;

			.more {
				font-size: 26rpx;
				color: #AAAAAA;
				font-weight: normal;
			}
		}

		.money-box {
			padding: 0 20rpx;
			color: #999;

			&>view {
				padding: 20rpx 0;
				line-height: 45rpx;

				// flex: 1;	

			}
		}

		.txt {
			font-size: 24rpx;
		}

		.num {
			font-size: 32rpx;
			color: #333;

		}
	}
</style>
