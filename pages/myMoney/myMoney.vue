<template>
	<view class="flex flex-direction" style="height: 100%;">
		<view class="flex text-center bg-white text-black" style="padding: 80rpx 0;">
			<view class="flex-sub">
				<view class="">可使用(个)</view>
				<view class="text-red num">{{data.total}}</view>
			</view>
			<view class="flex-sub">
				<view class="">累计收益(个)</view>
				<view class="text-black num">{{data.history}}</view>
			</view>
		</view>
		<view class="screening-box flex justify-between" style="padding: 30rpx 40rpx;">
			<view class="bg-white text-black pick" @tap="showType">{{types[currentType]}}<text class="cuIcon-triangledownfill"></text></view>
			<picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime" >
				<view class="time bg-white text-black pick" @tap="hideMask">{{time}}<text class="cuIcon-triangledownfill"></text></view>
			</picker>
		</view>
		<view class="flex-sub bg-white clear" style="position: relative;">
			<view class="mask" v-if="isShow" @tap="hideMask"></view>
			<view class="type-box bg-white flex justify-between flex-wrap" :class="isShow?'move':''">
				<view class="type-item" :class="currentType==index?'active':''" v-for="(item,index) in types" :key="index" @tap="chooseType(index)">{{item}}</view>
			</view>
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="detail-box" v-if="data.list&&data.list.length!=0">
					<view class="detal-item text-black flex justify-between align-center" v-for="(item,index) in data.list" :key="index">
						<view class="" style="line-height: 40rpx;">
							<view class="">{{item.typeName}}</view>
							<view style="font-size: 26rpx;color: #666666;">{{item.UserCoin.createdAt}}</view>
						</view>
						<view class="">{{item.UserCoin.coin_num>0?'+':''}}{{item.UserCoin.coin_num}}</view>
					</view>
				</view>
				<view class="null flex justify-center flex-direction align-center" style="height: 100%;" v-else>
					<image :src="STATIC_URL+'null01.png'" style="width: 300rpx;" mode="widthFix"></image>
					<view style="font-size: 24rpx;color: #DDDDDD;">暂无数据</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL:this.STATIC_URL,
				end_time: "",
				time: "",
				data: {
					history: 0,
					total: 0,
					list: []
				},
				types: ["全部", "消费", "转出", "分享收益", "自购收益", "团队收益"],
				isShow: false,
				currentType: 0
			};
		},
		onLoad() {
			let today = new Date()
			let Y = today.getFullYear()
			let M = today.getMonth() + 1
			let D = today.getDate()
			if(M < 10){
				M = "0"+M
			}
			let newDate = Y + "-" + M
			this.end_time = this.time = newDate
			this.getCoins()
		},
		methods: {
			showType() {
				this.isShow = !this.isShow
			},
			hideMask(){
				this.isShow = false
			},
			chooseType(i) {
				this.currentType = i
				this.isShow = false
				this.getCoins()
			},
			chooseTime(e) {
				if (e.detail.value === this.time) {
					this.isShow = false
					return
				}
				this.time = e.detail.value
				this.isShow = false
				this.getCoins()
			},
			// getToday() {
			// 	let today = new Date()
			// 	let Y = today.getFullYear()
			// 	let M = today.getMonth() + 1
			// 	let D = today.getDate()
			// 	let newDate = Y + "-" + M
			// 	// console.log(newDate)
			// 	return newDate
			// },
			getCoins() {
				let coinType = ""
				switch (this.currentType) {
					case 0:
						coinType = ""
						break;
					case 1:
						coinType = "purchase"
						break;
					case 2:
						coinType = "transfer"
						break;
					case 3:
						coinType = "share"
						break;
					case 4:
						coinType = "shopping"
						break;
					case 5:
						coinType = "team"
						break;
					default:
						break;
				}
				let resData = {
					userID: uni.getStorageSync("userInfo").id,
					date: this.time,
					coinType: coinType
				}
				console.log(resData)
				this.$u.post('/api/v1/wallet/coin/coin_list',resData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.data = res.data.data
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

	.num {
		font-size: 60rpx;
		margin-top: 10rpx;
	}

	.screening-box {
		position: relative;

		.pick {
			padding: 0 30rpx;
			padding-right: 20rpx;
			line-height: 64rpx;
			border-radius: 32rpx;

			text {
				font-size: 34rpx;
			}
		}
	}

	.mask {
		background-color: rgba(0, 0, 0, 0.6);
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	.type-box {
		padding: 20rpx 30rpx;
		position: absolute;
		top: 0;
		width: 100%;
		left: 0;
		transform: translateY(-100%);
		transition: 0.3s;
		z-index: 20;

		.type-item {
			width: 220rpx;
			line-height: 70rpx;
			margin: 10rpx 0;
			text-align: center;
			background-color: #F1F1F1;
		}

		.active {
			background-color: #FFDDDD;
			color: #FF5B5B;
		}
	}

	.move {
		transform: translateY(0)
	}


	.detal-item {
		padding: 0 30rpx;
		height: 120rpx;
		border-bottom: 1rpx solid #f7f7f7;

		&:last-child {
			margin-bottom: 200rpx;
		}
	}
</style>
