<template>
	<view>
		<view class="top-box">
			<view class="bg-box bg-img" :style="'background-image: url('+bgImage+');'" v-if="myInfo">
				<view class="top-con flex justify-between align-center text-white">
					<view class="">
						<view class="">{{myInfo.nickname}}的店铺({{role}})</view>
						<view style="font-size: 22rpx;line-height: 40rpx;">注册时间：{{createTime}}</view>
					</view>
					<view class="flex align-center">
						<image :src="iconImage" style="width: 104rpx;" mode="widthFix"></image>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="line-box" v-if="card.stand.IncreaseNum&&card.stand.IncreaseNum.length!=0">
					<view class="line-con">
						<view class="animal-con">
							<!-- 骆驼图标 -->
							<image class="animal" src="../../static/logo.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="dots-con flex justify-around align-center">
						<view class="dot-item flex justify-center align-center" v-for="(item,index) in card.stand.IncreaseNum" :key="index" @tap="chooseDot(index)">					
							<view class="dot"></view>
							<view class="dot-msg-con" v-if="dotIndex==index">
								<view class="" style="width: 100%;height: 100%;position: relative;">
									<view class="dot-msg" :style="index<card.stand.IncreaseNum.length/2?'left:-50rpx;':'right:-50rpx'">
										<view class="">团队销售额:{{item.Quantity}}</view>
										<view class="">提成比例:{{item.Percent}}%</view>
									</view>
								</view>
								
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shop-msg-box">
			<!-- <view class="box bg-white">
				<navigator url="../myEarnings/myEarnings" class="subtitle flex justify-between">
					<view class="">累计收益(瑞币)</view>
					<view class="flex more">
						<view class="num">{{info.accumulateIncome.all}}</view>
						<text class="cuIcon-right"></text>
					</view>
				</navigator>
				<view class="money-box flex justify-between">
					<view class="money-box-item">
						<view class="num">{{info.accumulateIncome.selfShopping}}</view>
						<view class="">自购省钱(瑞币)</view>
					</view>
					<view class="money-box-item">
						<view class="num">{{info.accumulateIncome.share}}</view>
						<view class="">分享赚钱(瑞币)</view>
					</view>
					<view class="money-box-item" v-if="roleLevel==300||roleLevel==200||roleLevel==100">
						<view class="num">{{info.accumulateIncome.team}}</view>
						<view class="">团队收益(瑞币)</view>
					</view>
				</view>
			</view> -->
			<view class="box bg-white">
				<navigator url="../selfBuy/selfBuy?type=self" class="subtitle flex justify-between">
					<view class="flex">
						<view class="flex align-center" style="width: 220rpx;">
							<image src="../../static/mine/t01.png" style="width: 64rpx;" mode="widthFix"></image>
							<view class="">自购省钱</view>
						</view>
						<view class="time-box flex align-center" hover-stop-propagation>
							<view class="time-item" :class="current1==index?'avtive-time':''" v-for="(item,index) in times" :key="index"
							 @tap.stop="chooseTime('self',index)">{{item}}</view>
						</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view class="">
						<view class="txt">订单(笔)</view>
						<view class="num">{{myShopping.orderNum}}</view>
					</view>
					<view class="">
						<view class="txt">销售额(元)</view>
						<view class="num">{{myShopping.amount}}</view>
					</view>
					<view class="">
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{myShopping.historyIncome}}</view>
					</view>
				</view>
			</view>

			<view class="box bg-white">
				<navigator url="../selfBuy/selfBuy?type=share" class="subtitle flex justify-between">
					<view class="flex">
						<view class="flex align-center" style="width: 220rpx;">
							<image src="../../static/mine/t02.png" style="width: 64rpx;" mode="widthFix"></image>
							<view class="">分享赚钱</view>
						</view>
						<view class="time-box flex align-center" hover-stop-propagation>
							<view class="time-item" :class="current2==index?'avtive-time':''" v-for="(item,index) in times" :key="index"
							 @tap.stop="chooseTime('share',index)">{{item}}</view>
						</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view class="">
						<view class="txt">订单(笔)</view>
						<view class="num">{{shareIncome.orderNum}}</view>
					</view>
					<view class="">
						<view class="txt">销售额(元)</view>
						<view class="num">{{shareIncome.amount}}</view>
					</view>
					<view class="">
						<view class="txt">预估收益(瑞币)</view>
						<view class="num">{{shareIncome.historyIncome}}</view>
					</view>
				</view>
			</view>

			<view class="box bg-white" v-if="roleLevel==300||roleLevel==200||roleLevel==100">
				<navigator url="../teamEarnings/teamEarnings" class="subtitle flex justify-between">
					<view class="flex">
						<view class="flex align-center" style="width: 220rpx;">
							<image src="../../static/mine/t03.png" style="width: 64rpx;" mode="widthFix"></image>
							<view class="">团队收益</view>
						</view>
						<view class="time-box flex align-center" hover-stop-propagation>
							<view class="time-item" :class=" current3==index?'avtive-time':''" v-for="(item,index) in times" :key="index"
							 @tap.stop="chooseTime('team',index)">{{item}}</view>
						</view>
					</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="money-box flex justify-between">
					<view class="">
						<view class="txt">团队销售额(元)<text class="cuIcon-question"></text></view>
						<view class="num">{{teamIncome.amount}}</view>
					</view>
					<view class="">
						<view class="txt">预估提成比例(%)</view>
						<view class="num">{{teamIncome.percent}}</view>
					</view>
					<view class="">
						<view class="txt">预估收益(瑞币)<text class="cuIcon-question"></text></view>
						<view class="num">{{teamIncome.historyIncome}}</view>
					</view>
				</view>
			</view>

			<!-- 店铺升级 -->
			<!-- <view class="box bg-white">
				<view class="flex justify-between subtitle" style="border-bottom: 0;line-height: 60rpx;">
					<view><text class="cuIcon-titles text-red"></text>升至白银店铺</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</view>
				<view style="color: #aaa;font-size: 24rpx;">本考核期截止至2020-05-31，将于2020-06-22进行考核<text class="cuIcon-question"></text></view>
				<view class="upgrade-con flex justify-around">
					<view class="upgrade-item text-center">
						<view class="round-border flex justify-center align-center">
							<image src="../../static/shop/001.png" style="height: 32rpx;" mode="heightFix"></image>
						</view>
						<view class="">剩余销售额</view>
						<view class="">550000元</view>
					</view>
					<view class="">或</view>
					<view class="upgrade-item text-center">
						<view class="round-border flex justify-center align-center">
							<image src="../../static/shop/002.png" style="height: 32rpx;" mode="heightFix"></image>
						</view>

						<view class="">还需推广</view>
						<view class="">19人</view>
					</view>
				</view>
			</view> -->


			<!-- 邀请升级 -->
			<view class="box bg-white">
				<view class="subtitle" style="line-height: 60rpx;border: 0;">邀请升级</view>
				<view class="invite-box flex justify-between text-white" v-if="roleLevel==100">
					<navigator class="bg-img" :style="'width: 260rpx;height: 300rpx;background-image: url('+IMAGE_URL+'/photo/FiSo7Uj2xuW2qmeVp3mMdxgDXcmt.png);'">
						<view class="">升级财富团</view>
						<view class="">邀请好友·福利双赢</view>
					</navigator>
					<view class="flex flex-direction justify-between">
						<view class="flex justify-between">
							<navigator class="bg-img" style="width: 204rpx;height: 150rpx;background-image: url(../../static/mine/pic02.png);">
								<view class="">我的推荐</view>
								<view class="">呼朋唤友·享收益</view>
							</navigator>
							<navigator url="../myInvite/myInvite" class="bg-img" style="width: 204rpx;height: 150rpx;background-image: url(../../static/mine/pic03.png);">
								<view class="">我的邀请</view>
								<view class="">有福同享·真壕友</view>
							</navigator>
						</view>
						<navigator :url="'../inviteMakeShop/inviteMakeShop?roleLevel='+roleLevel" class="bg-img" :style="'width: 420rpx;height: 140rpx;background-image: url('+IMAGE_URL+'/photo/FpVg0h_MLlRCDKt_ig3nKP4kkuXU.png);'">
							<view class="">邀请开店</view>
							<view class="">0元创业·轻松赚</view>
						</navigator>
					</view>
				</view>
				<view class="invite-box flex justify-between text-white" v-else>
					<navigator :url="'../inviteMakeShop/inviteMakeShop?roleLevel='+roleLevel" class="bg-img" :style="'width: 340rpx;height: 150rpx;background-image: url('+IMAGE_URL+'/photo/FuIbH1pm8UsP94fk1b7KQl_6GA4n.png);'">
						<view class="">邀请开店</view>
						<view class="">0元创业·轻松赚</view>
					</navigator>
					<navigator url="../myInvite/myInvite" class="bg-img" :style="'width: 340rpx;height: 150rpx;background-image: url('+IMAGE_URL+'/photo/Fp3Y8ZUI7kJx0uj4JlNJzmpY7vSx.png);'">
						<view class="">我的邀请</view>
						<view style="">有福同享·真壕友</view>
					</navigator>
				</view>
			</view>


			<!-- 订单中心 -->
			<view class="box bg-white">
				<navigator url="../orders/orders" class="subtitle flex justify-between">
					<view style="font-size: 32rpx;color: #000;">订单中心</view>
					<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
				</navigator>
				<view class="order-box flex text-center">
					<view class="flex-sub" v-for="(item,index) in orders" :key="index" @tap="toOrders(index)">
						<text class="text-red" :class="item.icon"></text>
						<view class="">{{item.text}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <button type="default" @tap="showtipModel(true)">弹框</button> -->
		<view class="cu-modal" :class="tipModel?'show':''">
			<view class="cu-dialog" style="width: 600rpx;background-color: transparent;">
				<image :src="IMAGE_URL+'/photo/Fl2ZrJfLt81KLzRQzYclukJ7Y60d.png'" style="width: 100%;" mode="widthFix" @tap="showtipModel(false)"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				roleLevel: 500,
				card: {},
				dotIndex: -1,
				myInfo:null,
				info: {
					"roleLevel": 500,
					"upNotify": {
						"isNotify": false,
						"notifyType": "",
						"notifyContent": ""
					},
					"card": {
						"teamIn": 0,
						"percent": 0,
						"balance": 0,
						"stand": {
							"Level": 0,
							"BasePercent": 0,
							"IncreaseNum": null
						},
						"Target": 0
					},
					"accumulateIncome": {
						"all": 0,
						"selfShopping": 0,
						"share": 0,
						"team": 0
					},
					"myShoppingWithTime": {
						"today": {
							"orderNum": 0,
							"amount": 0,
							"historyIncome": 0
						},
						"thisMonth": {
							"orderNum": 0,
							"amount": 0,
							"historyIncome": 0
						},
						"prevMonth": {
							"orderNum": 0,
							"amount": 0,
							"historyIncome": 0
						}
					},
					"shareIncomeWithTime": {
						"today": {
							"orderNum": 0,
							"amount": 0,
							"historyIncome": 0
						},
						"thisMonth": {
							"orderNum": 0,
							"amount": 0,
							"historyIncome": 0
						},
						"prevMonth": {
							"orderNum": 0,
							"amount": 0,
							"historyIncome": 0
						}
					},
					"teamIncomeWithTime": {
						"today": {
							"amount": 0,
							"percent": 0,
							"historyIncome": 0
						},
						"thisMonth": {
							"amount": 0,
							"percent": 0,
							"historyIncome": 0
						},
						"prevMonth": {
							"amount": 0,
							"percent": 0,
							"historyIncome": 0,
							"msg": "",
							"alertMsg": ""
						}
					},
					"orderCenter": {
						"waitPay": 0,
						"waitSend": 0,
						"waitRecv": 0,
						"afterSales": 0
					},
					"assessment": {
						"aTime": null,
						"UpStandard": null,
						"KeepStandard": null,
						"upper": {
							"sale": "",
							"developNew": "",
							"switchOnoff": false
						},
						"keeper": {
							"sale": "",
							"developNew": "",
							"switchOnoff": false
						},
						"content": ""
					}
				},
				tipModel: false,
				current1: 0,
				current2: 0,
				current3: 0,
				myShopping: { //页面显示的自购省钱数据
					"orderNum": 0,
					"amount": 0,
					"historyIncome": 0
				},
				shareIncome: { //页面显示的分享赚钱数据
					"orderNum": 0,
					"amount": 0,
					"historyIncome": 0
				},
				teamIncome: { //页面显示的团队收益数据
					"amount": 0,
					"percent": 0,
					"historyIncome": 0
				},
				times: ["今日", "本月", "上月"],
				bgImage: "",
				iconImage: "",
				role:"",
				createTime:"",
				orders:[
					{
						icon:"cuIcon-send",
						text:"待发货",
						url:""
					},
					{
						icon:"cuIcon-deliver",
						text:"已发货",
						url:""
					},
					{
						icon:"cuIcon-send",
						text:"已收货",
						url:""
					},
					{
						icon:"cuIcon-refund",
						text:"退款/售后",
						url:""
					}
				]
			};
		},
		onLoad() {
			this.getInfo()
			this.myInfo = uni.getStorageSync("userInfo")
			if(this.myInfo){
				this.createTime = this.myInfo.createdAt.split(" ")[0]
			}
		},
		methods: {
			chooseDot(i) {
				this.dotIndex = i
			},
			//获取店铺全部信息
			getInfo() {
				this.$u.post('/api/v1/shop/shop_index', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
					console.log(this.info)
					this.card = this.info.card
					this.myShopping = this.info.myShoppingWithTime.today
					this.shareIncome = this.info.shareIncomeWithTime.today
					this.teamIncome = this.info.teamIncomeWithTime.today
					this.roleLevel = this.info.roleLevel
					// this.roleLevel = 100
					switch (this.roleLevel) {
						case 400:
							this.bgImage = this.IMAGE_URL + '/photo/FgJac_NuNya9h0tJqjS8G9CNfsen.png'
							this.iconImage = this.IMAGE_URL + '/photo/Fg4sqRkwZzfUA4SvukcZoNgv-VdZ.png'
							this.role = "店主"
							break;
						case 300:
							this.bgImage = this.IMAGE_URL + '/photo/FkJEa70fTF2ORF2yVjbSz_nm9cEQ.png'
							this.iconImage = this.IMAGE_URL + '/photo/FikbSTqU-B3WrxFOduk5IHnYW9vB.png'
							this.role = "白银店铺"
							break;
						case 200:
							this.bgImage = this.IMAGE_URL + '/photo/FiBFr9yCnFfhPa7swVNzVNLTIvSG.png'
							this.iconImage = this.IMAGE_URL + '/photo/FihgZffxfXB3ydHUUCBik_WUe1Id.png'
							this.role = "黄金店铺"
							break;
						case 100:
							this.bgImage = this.IMAGE_URL + '/photo/FqRIkwI9XRrdOb-ojQLzmaB0v0PX.png'
							this.iconImage = this.IMAGE_URL + '/photo/FhHpUWsdbUm3o1YMHKjvjy0BwyBC.png'
							this.role = "钻石店铺"
							break;
						default:
							break;
					}
					/*
					100 钻石
					200 黄金
					300 白银
					400 店主
					500 会员
					*/
				});
			},
			showtipModel(flag) {
				this.tipModel = flag
			},
			toOrders(index) {
				let type
				switch (index) {
					case 0:
						type = 2
						break;
					case 1:
						type = 3
						break;
					case 2:
						type = 4
						break;
					case 3:
						uni.navigateTo({
							url: "../afterSaleGoods/afterSaleGoods"
						})
						return;
				}
				uni.navigateTo({
					url: "../orders/orders?type=" + type
				})
			},
			chooseTime(type, index) {
				//自购
				if (type == "self") {
					this.current1 = index
					switch (this.current1) {
						case 0: //今日
							this.myShopping = this.info.myShoppingWithTime.today
							break;
						case 1: //本月
							this.myShopping = this.info.myShoppingWithTime.thisMonth
							break;
						case 2: //上月
							this.myShopping = this.info.myShoppingWithTime.prevMonth
							break;
					}
				}
				//分享
				if (type == "share") {
					this.current2 = index
					switch (this.current2) {
						case 0: //今日
							this.shareIncome = this.info.shareIncomeWithTime.today
							break;
						case 1: //本月
							this.shareIncome = this.info.shareIncomeWithTime.thisMonth
							break;
						case 2: //上月
							this.shareIncome = this.info.shareIncomeWithTime.prevMonth
							break;
					}
				}
				//团队
				if (type == "team") {
					this.current3 = index
					switch (this.current3) {
						case 0: //今日
							this.teamIncome = this.info.teamIncomeWithTime.today
							break;
						case 1: //本月
							this.teamIncome = this.info.teamIncomeWithTime.thisMonth
							break;
						case 2: //上月
							this.teamIncome = this.info.teamIncomeWithTime.prevMonth
							break;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.top-box {
		padding: 180rpx 30rpx 50rpx;
		background-color: #3A3943;

		.bg-box {
			width: 690rpx;
			height: 386rpx;
			border-radius: 15rpx;
			overflow: hidden;

			.top-con {
				padding: 0 20rpx;
				height: 156rpx;
			}

			.line-box {
				position: relative;
				width: 590rpx;
				height: 8rpx;
				border-radius: 5rpx;
				background-color: rgba(0, 0, 0, 0.3);
				left: 50rpx;
				top: 150rpx;

				.line-con {
					position: absolute;
					top: 0;
					width: 30%;
					border-radius: 5rpx;
					background-color: rgba(255, 255, 255, 0.8);
					height: 100%;

					.animal-con {
						width: 100%;
						height: 100%;
						position: relative;
					}
					.animal {
						width: 60rpx;
						position: absolute;
						bottom: 30rpx;
						right: 0;
						transform: translateX(50%);
					}

				}

				.dots-con {
					position: absolute;
					top: 50%;
					width: 100%;
					height: 50rpx;
					transform: translateY(-50%);
					.dot-item{
						width: 20rpx;
						height: 40rpx;
						position: relative;
					}
					.dot {
						width: 12rpx;
						height: 12rpx;
						border: 1rpx solid #fff;
						background-color: rgba(0, 0, 0, 0.4);
						border-radius: 50%;
							
					}
					.dot-msg-con {
						position: absolute;
						width: 20rpx;
						height: 40rpx;
						left: 0;
						top: 10rpx;
						border-left: 10rpx solid transparent;
						border-right: 10rpx solid transparent;
						border-bottom: 20rpx solid rgba(0, 0, 0, 0.5);
						border-top: 20rpx solid transparent;
					}

					
					.dot-msg {
						position: absolute;
						top: 20rpx;
						background-color: rgba(0, 0, 0, 0.5);
						border-radius: 10rpx;
						padding: 10rpx 15rpx;
						color: rgba(255, 255, 255, 0.8);
						font-size: 22rpx;
						white-space: nowrap;
					}
				}
			}
		}

	}

	.shop-msg-box {
		margin-bottom: 200rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		overflow: hidden;
		margin-top: -20rpx;
	}

	.box {
		overflow: hidden;
		margin-bottom: 20rpx;
		padding: 20rpx 30rpx;

		.subtitle {
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
			padding-top: 20rpx;
			line-height: 45rpx;
		}

		.num {
			color: #000;
			font-size: 32rpx;
		}

		,
		.txt {
			font-size: 24rpx;
			color: #999999;
		}
	}

	.upgrade-con {
		padding: 20rpx 30rpx 0;

		.round-border {
			width: 120rpx;
			height: 120rpx;
			border: 6rpx solid red;
			border-radius: 50%;
		}
	}

	.invite-box {
		padding: 10rpx 0;

		.bg-img {
			border-radius: 10rpx;
			overflow: hidden;
			padding: 30rpx 15rpx;

			view:first-child {
				font-size: 28rpx;
			}

			view:last-child {
				font-size: 22rpx;
				margin-top: 5rpx;
			}
		}

		.invite-item {
			position: relative;

			image {
				width: 340rpx;
			}

			.invite-item-con {
				position: absolute;
				width: 100%;
				top: 50%;
				transform: translateY(-50%);
				color: #fff;
				padding: 0 20rpx;
				line-height: 40rpx;
			}
		}
	}

	.order-box {
		padding: 20rpx 0;
		font-size: 26rpx;
		line-height: 40rpx;

		&>view {
			padding: 20rpx 0;

			text {
				font-size: 54rpx;
			}
		}

	}

	.time-box .time-item {
		padding: 0 15rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #666666;
	}

	.avtive-time {
		color: red !important;
	}
</style>
