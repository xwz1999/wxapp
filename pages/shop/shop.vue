<template>
	<view>
		<!-- 用户角色为会员时显示邀请页面 -->
		<template class="container-A" v-if="roleLevel==500">
			<invite></invite>
		</template>

		<!-- 除了会员以外的角色显示数据展示页面 -->
		<template class="container-B" v-if="roleLevel==400||roleLevel==300||roleLevel==200||roleLevel==100">
			<view class="top-box">
				<image :src="STATIC_URL+'top_bg.png'" style="width: 100%;" mode="widthFix"></image>
				<view class="bg-box bg-img flex flex-direction justify-between" :style="'background-image: url('+bgImage+');'" v-if="myInfo">
					<view class="top-con text-right">
						<view style="font-size: 32rpx;font-weight: 700;color: #000;">{{myInfo.nickname}}的店铺</view>
						<view style="font-size: 24rpx;">({{role}})</view>
					</view>
					<view class="shop-line-box">
						<image class="luotuo" src="../../static/shop/luotuo.png" mode="heightFix"></image>
						<view class="text-bg text-up">
							<view class="">距下一节点还</view>
							<view class="">差{{card.need}}万元</view>
						</view>
						<image class="icon" :src="iconImage" mode="heightFix"></image>
						<image :src="lineImage" style="width: 100%;" mode="widthFix"></image>
						<view class="text-bg text-down">
							<view class="">团队销售额:{{card.teamIn}}</view>
							<view class="">提成比例:{{card.percent}}%</view>
						</view>
					</view>
					<view class="time text-right" style="font-size: 22rpx;">注册时间：{{createTime}}</view>
				</view>
			</view>
			<view class="shop-msg-box">
				<!-- 累计收益 -->
				<!-- <view class="box bg-white">
					<navigator url="../totalEarnings/totalEarnings" class="subtitle flex justify-between">
						<view class="">累计收益(瑞币)</view>
						<view class="flex more">
							<view class="num">{{info.accumulateIncome.all}}</view>
							<text class="cuIcon-right"></text>
						</view>
					</navigator>
					<view class="money-box flex justify-between">
						<view class="money-box-item">
							<view class="num">{{info.accumulateIncome.selfShopping}}</view>
							<view class="">自购收益(瑞币)</view>
						</view>
						<view class="money-box-item">
							<view class="num">{{info.accumulateIncome.share}}</view>
							<view class="">导购收益(瑞币)</view>
						</view>
						<view class="money-box-item" v-if="roleLevel==300||roleLevel==200||roleLevel==100">
							<view class="num">{{info.accumulateIncome.team}}</view>
							<view class="">团队收益(瑞币)</view>
						</view>
					</view>
				</view> -->
				<view class="box bg-white">
					<navigator url="../selfBuyEarnings/selfBuyEarnings" hover-class="none" class="subtitle flex justify-between">
						<view class="flex">
							<view class="flex align-center" style="width: 220rpx;">
								<image src="../../static/mine/t01.png" style="width: 64rpx;" mode="widthFix"></image>
								<view class="">自购收益</view>
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
					<navigator url="../shareEarnings/shareEarnings" hover-class="none" class="subtitle flex justify-between">
						<view class="flex">
							<view class="flex align-center" style="width: 220rpx;">
								<image src="../../static/mine/t02.png" style="width: 64rpx;" mode="widthFix"></image>
								<view class="">导购收益</view>
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
					<view class="subtitle flex justify-between" @tap="toTeamEarnings">
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
					</view>
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
						<navigator  url="../invite/invite" class="bg-img" :style="'width: 260rpx;height: 300rpx;background-image: url('+STATIC_URL+'t03.png'">
							<view class="">推荐砖石店铺</view>
							<view class="">邀请好友·福利双赢</view>
						</navigator>
						<view class="flex flex-direction justify-between">
							<view class="flex justify-between">
								<navigator url="../myRecommend/myRecommend" class="bg-img" :style="'width: 204rpx;height: 150rpx;background-image: url('+STATIC_URL+'t04.png);'">
									<view class="">我的邀请</view>
									<view class="">呼朋唤友·享收益</view>
								</navigator>
								<navigator url="../myInvite/myInvite" class="bg-img" :style="'width: 204rpx;height: 150rpx;background-image: url('+STATIC_URL+'t05.png);'">
									<view class="">我的团队</view>
									<view class="">有福同享·真壕友</view>
								</navigator>
							</view>
							<view class="bg-img" :style="'width: 420rpx;height: 140rpx;background-image: url('+STATIC_URL+'t06.png);'" @tap="isShow = true">
								<view class="">团队扩招</view>
								<view class="">0元创业·轻松赚</view>
							</view>
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
					<navigator url="../shopOrders/shopOrders" hover-class="none" class="subtitle flex justify-between">
						<view>订单中心<text style="font-weight: normal;font-size: 26rpx;">(导购)</text></view>
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

			<u-popup v-model="isShow" mode="bottom" border-radius="15">
				<view class="share-box flex justify-between">
					<view class="flex-sub flex justify-center">
						<button class="flex flex-direction justify-center align-center" open-type="share" @tap="hideModel">
							<image class="share-icon" src="/static/mine/wx.png" mode="widthFix"></image>
							<view class="txt">微信好友</view>
						</button>
					</view>
					<view class="flex-sub flex justify-center">
						<button class="flex flex-direction justify-center align-center" @tap="postShare">
							<image class="share-icon" src="/static/mine/post.png" mode="widthFix"></image>
							<view class="txt">二维码海报</view>
						</button>
					</view>
				</view>
				<view class="cancle" @tap="hideModel">取消</view>
			</u-popup>
		</template>
	</view>
</template>

<script>
	import invite from "../../components/invite.vue"
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				roleLevel: 0,
				showLoading: true,
				card: {},
				myInfo: null,
				tipModel: false,
				current1: 0,
				current2: 0,
				current3: 0,
				myShopping: { //页面显示的自购收益数据
					"orderNum": 0,
					"amount": 0,
					"historyIncome": 0
				},
				shareIncome: { //页面显示的导购收益数据
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
				lineImage: "",
				role: "",
				createTime: "",
				orders: [{
						icon: "cuIcon-send",
						text: "待发货",
						url: ""
					},
					{
						icon: "cuIcon-deliver",
						text: "已发货",
						url: ""
					},
					{
						icon: "cuIcon-goodsnew",
						text: "已收货",
						url: ""
					},
					{
						icon: "cuIcon-refund",
						text: "退款/售后",
						url: ""
					}
				],
				isShow: false
			};
		},
		watch: {
			isShow: function(val) {
				if (val) {
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}
			}
		},
		components: {
			invite
		},
		onLoad() {
			this.getInfo()
			this.myInfo = uni.getStorageSync("userInfo")
			if (this.myInfo) {
				this.createTime = this.myInfo.createdAt.split(" ")[0]
			}
		},
		methods: {
			postShare() {
				this.$u.toast("功能暂未开放，敬请期待~");
			},
			hideModel() {
				this.isShow = false
			},
			//获取店铺全部信息
			getInfo() {
				this.$u.post('/api/v1/shop/shop_index', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					this.showLoading = false
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
					console.log(this.info)
					this.card = this.info.card
					let dots = this.card.stand.IncreaseNum
					// 计算距离下一节点还差多少
					if(dots&&dots.length!=0){
						for (let i = 0; i < dots.length; i++) {
							if(dots[i].Quantity>this.card.teamIn){
								this.card.need = (dots[i].Quantity - this.card.teamIn)/10000
								break
							}
						}
					}
					this.myShopping = this.info.myShoppingWithTime.today
					this.shareIncome = this.info.shareIncomeWithTime.today
					this.teamIncome = this.info.teamIncomeWithTime.today
					this.roleLevel = this.info.roleLevel
					// this.roleLevel = 300
					switch (this.roleLevel) {
						case 400:
							this.bgImage =  this.STATIC_URL + "role01.png"
							this.lineImage =  this.STATIC_URL + "line01.png"
							this.iconImage = this.STATIC_URL + "b_01.png"
							this.role = "店主"
							break;
						case 300:
							this.bgImage = this.STATIC_URL + "role02.png"
							this.iconImage = this.STATIC_URL + "b_02.png"
							this.lineImage = this.STATIC_URL + "line02.png"
							this.role = "白银店铺"
							break;
						case 200:
							this.bgImage = this.STATIC_URL + "role03.png"
							this.iconImage = this.STATIC_URL + "b_03.png"
							this.lineImage = this.STATIC_URL + "line03.png"
							this.role = "黄金店铺"
							break;
						case 100:
							this.bgImage = this.STATIC_URL + "role04.png"
							this.iconImage = this.STATIC_URL + "b_04.png"
							this.lineImage = this.STATIC_URL + "line04.png"
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
			toTeamEarnings() {
				uni.navigateTo({
					url: "../teamEarnings/teamEarnings"
				})
			},
			toOrders(index) {
				let type
				switch (index) {
					case 0:
						type = 1
						break;
					case 1:
						type = 2
						break;
					case 2:
						type = 3
						break;
					case 3:
						uni.navigateTo({
							url: "../afterSaleGoods/afterSaleGoods"
						})
						return;
				}
				uni.navigateTo({
					url: "../shopOrders/shopOrders?type=" + type
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
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '',
				path: '/pages/mobileLogin/mobileLogin?invitationNo=' + this.invitationNo
			}
		}
	}
</script>

<style lang="scss">
	.top-box {
		position: relative;

		.bg-box {
			position: absolute;
			bottom: 26rpx;
			left: 30rpx;
			width: 690rpx;
			height: 320rpx;
			border-top-left-radius: 15rpx;
			border-top-right-radius: 15rpx;
			padding: 20rpx 30rpx 15rpx;
			overflow: hidden;

			.shop-line-box {
				padding-top: 80rpx;
				padding-bottom: 80rpx;
				position: relative;
				.text-bg{
					background-color: rgba(0, 0, 0, 0.3);
					color: #fff;
					border-radius: 12rpx;
					padding: 8rpx 12rpx;
					font-size: 18rpx;	
				}
				.luotuo {
					position: absolute;
					left: 0;
					top: 25rpx;
					width: auto;
					height: 50rpx;
				}
				.text-up{
					position: absolute;
					top: 0;
					left: 70rpx;
				}
				.text-down{
					position: absolute;
					bottom: 0;
					left: 0;
				}
				.icon {
					position: absolute;
					right: 0;
					top: 0;
					width: auto;
					height: 70rpx;
				}
			}
		}

	}

	.shop-msg-box {
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

	.share-box {
		padding: 50rpx 0;

		.share-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-bottom: 10rpx;
		}

		.txt {
			font-size: 26rpx;
		}

		button {
			border: 0;
			padding: 0;
			background-color: #FFFFFF;
			line-height: normal;
		}

		button::after {
			content: none;
		}
	}

	.cancle {
		border-top: 1rpx solid #f1f1f1;
		line-height: 90rpx;
		text-align: center;
	}
</style>
