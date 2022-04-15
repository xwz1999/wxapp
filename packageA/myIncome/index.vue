<template>
	<view class="flex flex-direction" style="height: 100vh;width:100vw;">
		<view class="">
			<view class="card-box" :style="'background-image: url('+bgImage+');background-size: 100% auto;'">
				<view class="flex justify-between" style="height: 200rpx; padding: 40rpx;">
					<view class="card-title">
						<view class="txt" style="width: 100%;">
							累计{{incometype>6?'已到帐':'未到账'}}收益(瑞币)
						</view>
						<view class="num">
							{{totalAmount}}
						</view>
					</view>
					<view class="">
						<image :src="badgeImage" mode="widthFix" style="width: 96rpx;"></image>
					</view>
				</view>
				<view class="foot-box flex  align-center">
					<view class="item" @click="getIncomeInfo((incometype%2==1?incometype:(parseInt(incometype)-1)))"
						:class="incometype%2 === 1?'active':''">
						<view class="">
							{{incometype>6?'已到帐':'未到账'}}明细(月)
						</view>
					</view>
					<view class="foot-line">

					</view>
					<view class="item" @click="getIncomeInfo((incometype%2==0?incometype:(parseInt(incometype)+1)))"
						:class="incometype%2 === 0?'active':''">
						<view class="">
							{{incometype>6?'已到帐':'未到账'}}明细(年)
						</view>
					</view>
				</view>
			</view>
			<view v-if="incometype%2 === 1">
				<view class="time-box flex justify-between">
					<picker mode="date" start="2012-01-01" fields="month" :end="end_time" @change="chooseTime">
						<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text>
						</view>
					</picker>
					<view class="">
						本月{{incometype>6?'已到帐':'未到账'}}收益：<text style="color: #D5101A;">{{currentAmount}}</text>
					</view>
				</view>
			</view>
			<view v-else-if="incometype%2 === 0">
				<view class="time-box flex justify-between">
					<picker mode="date" start="2012-01-01" fields="year" :end="end_time" @change="chooseTime">
						<view class="time bg-white text-black">{{time.substring(0,time.indexOf('-'))}}<text
								class="cuIcon-triangledownfill"></text>
						</view>
					</picker>
					<view class="">
						本年{{incometype>6?'已到帐':'未到账'}}收益：<text style="color: #D5101A;">{{currentAmount}}</text>
					</view>
				</view>
			</view>
			<view>
				<view class="flex align-center text-center"
					style="background: #FFFFFF;height: 88rpx; line-height: 88rpx; font-size: 32rpx;">
					<view class='' style="flex: 1;"><text>日期</text></view>
					<view class='' style="flex: 1;"><text>销售额</text></view>
					<view class='' style="flex: 1;"><text>订单数</text></view>
					<view class='' style="width: 246rpx;"><text>{{incometype>6?'已到帐':'未到账'}}收益(瑞币)</text></view>
				</view>
			</view>
		</view>
		<scroll-view class="flex-sub" scroll-y="true" style="height: 0;">
			<view class="" style="margin-bottom: 40rpx;">
				<block v-for="(item,index) of list" :key='index'>
					<view class="flex align-center text-center" :data-index='index' @click="showDetail"
						style="background: #FFFFFF;height: 88rpx; line-height: 88rpx; border-top: 1rpx solid  #F5F5F5; font-size: 32rpx; ">
						<view class='' style="flex: 1;"><text>{{incometype%2==1?item.monthDate:item.month}}</text>
						</view>
						<view class='' style="flex: 1;"><text>{{item.sale}}</text></view>
						<view class='' style="flex: 1;"><text>{{item.count}}</text></view>
						<view class='' style="width: 246rpx; color: #D5101A;"><text>{{item.coin}}</text>
						</view>
					</view>
					<view v-if="item.showDetail" class="flex align-center text-center"
						v-for="(item2,index2) of item.detail" :key='index2' @click="orderDetail(item2.order_id)"
						style="background: #f5f3f3;height: 88rpx; line-height: 88rpx; border-top: 1rpx solid  #F5F5F5; font-size: 26rpx; ">
						<view class='' style="flex: 1;"><text>{{incometype%2==1?item2.time:item2.monthDate}}</text>
						</view>
						<view class='' style="flex: 1;"><text>{{item2.sale}}</text></view>
						<view class='' style="flex: 1;"><text>{{item2.count}}</text></view>
						<view class='' style="width: 246rpx; color: #D5101A;"><text>{{item2.coin}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImage: this.IMAGE_URL + 'bg01.png',
				roleLevel: 0,
				badgeImage: '',
				end_time: "",
				time: '',
				incometype: 0,
				totalAmount: null,
				currentAmount: null,
				list: null
			}
		},
		created() {
			this.roleLevel = this.$store.state.roleLevel
			this.bgImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')
			this.badgeImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')
		},
		methods: {
			getIncomeInfo(incometype) {
				console.log(incometype)
				let data = {
					date_str: null,
					type: null
				}
				let url = null
				let time = this.time

				// date_str 例：2021 为年未到账，202104 为月未到账
				let date_str1 = time.replace('-', '')
				let date_str2 = time.substring(0, time.indexOf('-'))
				// type 1=自购 2=导购
				let type1 = 1
				let type2 = 2
				// url 1为未到账 2为已到帐
				let url1 = '/api/v2/app/user/income/nr/detail'
				let url2 = '/api/v2/app/user/income/detail'
				switch (parseInt(incometype)) {
					case 1:
						data = {
							date_str: date_str1,
							type: type1
						}
						url = url1
						break;
					case 2:
						data = {
							date_str: date_str2,
							type: 1
						}
						url = url1
						break;
					case 3:
						data = {
							date_str: date_str1,
							type: type2
						}
						url = url1
						break;
					case 4:
						data = {
							date_str: date_str2,
							type: type2
						}
						url = url1
						break;
					case 7:
						data = {
							date_str: date_str1,
							type: type1
						}
						url = url2
						break;
					case 8:
						data = {
							date_str: date_str2,
							type: 1
						}
						url = url2
						break;
					case 9:
						data = {
							date_str: date_str1,
							type: type2
						}
						url = url2
						break;
					case 10:
						data = {
							date_str: date_str2,
							type: type2
						}
						url = url2
						break;
				}
				console.log(data)
				this.$u.post(url, data).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.totalAmount = res.data.data.all
					this.currentAmount = res.data.data.amount
					let list = res.data.data.detail
					list.forEach((item1) => {
						let date = new Date(parseInt(item1.date) * 1000)
						item1.month = (date.getMonth() + 1) + "月"
						item1.monthDate = (date.getMonth() + 1) + "月" + date.getDate() + "日"
						item1.showDetail = false
						item1.detail.forEach((item2) => {
							let date = new Date(parseInt(item2.date) * 1000)
							item2.monthDate = (date.getMonth() + 1) + "月" + date.getDate() + "日"
							item2.time = date.getHours() + ':' + date.getMinutes() + ':' + date
								.getSeconds()
						})
					})
					this.list = list
					this.incometype = incometype
				})
			},
			showDetail(e) {
				let index = e.currentTarget.dataset.index
				this.$set(this.list[index], "showDetail", !this.list[index].showDetail)
			},
			orderDetail(e){
		if(e == 0){
			return
		}
			uni.navigateTo({
				url: "/pages/orderDetail/orderDetail?orderId=" + e
			})
			},
			chooseTime(e) {
				this.time = e.detail.value
				this.getIncomeInfo(this.incometype)
			},
			getLocalTime(nS) {
				return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
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
			//获取我的全部信息
			getInfo() {
				// let sendData = {
				// 	userId: uni.getStorageSync("userInfo").id,
				// 	orderBy: "desc",
				// }
				// if (this.time) {
				// 	sendData.date = this.time
				// }
				// console.log(sendData)
				// this.$u.post('/api/v1/users/profile/my_info/team', sendData).then(res => {
				// 	console.log(res.data);
				// 	if (res.data.code == "FAIL") {
				// 		// this.$u.toast(res.data.msg);
				// 		return
				// 	}
				// 	this.data = res.data.data.teamIncome
				// 	this.list = res.data.data.billboard?res.data.data.billboard:[]
				// 	this.incomeDetail = res.data.data.incomeDetail
				// });
			}
		},
		onLoad(options) {
			// getIncomeInfo()中switch case 描述各个场景值
			let incometype = parseInt(options.incometype)
			let a = incometype % 6
			uni.setNavigationBarTitle({
				title: (a == 1 || a == 2) ? '自购收益' : ((a == 3 || a == 4) ?'导购收益' : ((a == 5 || a == 0) ?'店铺收益' : '错误参数'))
			})
			this.end_time = this.time = this.getToday()
			this.getIncomeInfo(incometype)
		},
	}
</script>

<style lang="scss">
	.time-box {
		line-height: 60rpx;
		padding: 20rpx 30rpx;
		color: #AAAAAA;

		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
		}

	}

	.card-box {
		width: 608rpx;
		height: 304rpx;
		overflow: hidden;
		border-radius: 8rpx;
		margin: 40rpx auto;
		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	}

	.card-title {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;

		.txt {
			font-size: 32rpx;
			color: rgba(58, 57, 67, 0.5);
		}

		.num {
			font-size: 68rpx;
			color: rgba(58, 57, 67, 1);
		}
	}

	.foot-box {
		height: 124rpx;
		background: #FCFCFC;

		.item {
			text-align: center;
			flex: 1;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;

			&.active {
				color: #333333;
			}
		}

		.foot-line {
			width: 2rpx;
			height: 44rpx;
			background: #D8D8D8;
			border: 2rpx solid #979797;
		}
	}
</style>
