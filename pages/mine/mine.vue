<template>
	<view class="">
		<view v-if="isLogin" class="flex flex-direction" style="height: 100vh;width:100vw;">
			<u-navbar :is-back="false" title="   " :border-bottom='false' :background="background"></u-navbar>
			<view class="top-nav">
				<image :src="IMAGE_URL+'/wxapp/mine/mine-bg.png'" mode="widthFix" style="width: 750rpx;"></image>
				<!-- <image :src="`${IMAGE_URL}/wxapp/mine/mine-bg.png`" mode="widthFix" style="width: 750rpx;"></image> -->
				<view class="top-nav-box">
					<view  class="nav-box" :style="'background-image: url('+bgImage+');'">
						
						<view class="flex align-center">
							<view class="flex-sub">
								<view class="flex">
									<navigator url="/packageA/myInfo/myInfo" hover-class="none">
										<view class="avatar">
											<u-lazy-load threshold="-100" :image="IMAGE_URL+userInfo.headImgUrl"
												:index="index" height="140" border-radius="70"
												:loading-img="IMAGE_URL + '/wxapp/null05.png'"
												:error-img="IMAGE_URL + '/wxapp/null05.png'" img-mode="aspectFill">
											</u-lazy-load>
										</view>
									</navigator>
								</view>

							</view>
				<!-- 			<view class="" style="width: 112rpx;">
								<view class="flex justify-around align-center" style="width: 100%;color: #FFFFFF;">
									<navigator url="/packageA/myCollect/myCollect" hover-class="none"
										style="margin-right: 30rpx;">
										<u-icon name="heart" size="48"></u-icon>
										<view>收藏</view>
									</navigator>
									<view>
										<button open-type='contact' class='customer-service'>
											<u-icon name="server-fill" size="48"></u-icon>
										</button>
										<view>客服</view>
									</view>
								</view>
							</view> -->
						</view>
						<view class="flex align-center" >
							<view class="flex-sub">
								<view class="" style="font-size: 40rpx;font-weight: 500;">
									<text>{{userInfo.nickname}}</text>
								</view>
							</view>
							<view class="flex justify-center" style="width: 112rpx;margin-top: -10rpx;">
								<image :src="iconPic" mode="widthFix" style="width: 96rpx; height: 110rpx;"></image>
							</view>
						</view>
						<view class="flex align-center">
							<view class="flex-sub">
								<text>NO.{{info.identifier}}</text>
							</view>
							<view class="flex-sub">
								<text>注册时间{{usercreatedAt}}</text>
							</view>
							<view class="flex-sub" style="width: 112rpx; text-align: center;">
								<text style="margin-left: 45px;">({{role}})</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<scroll-view class="flex-sub" scroll-y="true" style="height: 0;" :refresher-threshold="100"
				:refresher-enabled='refresherEnabled' @refresherpulling="onPulling" @refresherrefresh="onRefresh"
				@refresherrestore="onRestore" @refresherabort="onAbort" :refresher-triggered="triggered">
				<!-- banlance-background.png -->
				<view class="info-container">
				<view v-if="roleLevel==1||roleLevel==2" class="balance-box2" :style="'background-image: url('+IMAGE_URL+'/wxapp/uni-program/banlanceBackground.png)'" >
					<view class="shop2">
						<image :src="IMAGE_URL+'/wxapp/uni-program/v.png'" mode=""></image>
						<view style="font-size: 10px;margin-top: 3px;">
							店铺
						</view>
					</view>
					<view class="balance2">
						<view class="balance21">
							<text style="font-size: 14px;">余额：</text><text v-if="info.balance!=0" style="font-size: 12px;">¥</text><text>{{info.balance}}</text>
						</view>
						<view class="warn2">
							每月10日、25日审核提现申请
						</view>
					</view>
					<button class="withdraw2" size="mini" @tap="withdraw2">立即提现</button>
				</view>
					<view v-if="roleLevel==1||roleLevel==2" class="box bg-white" style="border-radius: 0 0 10px 10px;margin: 0 15px 10px;">
						<!-- <navigator url="../totalEarnings/totalEarnings" class="subtitle flex justify-between" style="border: 0;padding: 10rpx 20rpx;"> -->
						<navigator  :hover-class="false"
							class="subtitle flex justify-between" style="border: 0;padding: 10rpx 20rpx;">
							<view>累计总收益
						<!-- 	<text style="font-size: 20rpx;font-weight: normal;padding-left: 5rpx;">(瑞币)</text><text
									class="text-gray cuIcon-question"
									style="font-size: 24rpx;font-weight: 400; padding-left: 8rpx;"
									@tap.stop="tipModel(true,'totalEarning')"></text> -->
									</view>
							<view class="flex more">
								<text
									style="font-size: 34rpx;color: #333333;line-height:80rpx;">{{profit.Total|toFixed(2)}}</text>
								<text class="cuIcon-right"></text>
							</view>
						</navigator>
					</view>
					<view>
						<view v-if="roleLevel==1||roleLevel==2" class="box bg-white">
							<view class="subtitle flex justify-between">
								<view class="flex align-center">
									<image :src="IMAGE_URL + '/wxapp/mine/t01.png'" style="width: 64rpx;" mode="widthFix">
									</image>
									<view>自购收益 <text class="text-gray cuIcon-question"
											style="font-size: 24rpx;font-weight: 400; padding-left: 8rpx;"
											@tap.stop="tipModel(true,'purchase')"></text></view>
								</view>

								<!-- <navigator url="/packageA/myIncome/purchase"  :hover-class="false" class="flex more"> -->
								<!-- 	<navigator url="/packageA/myIncome/purchase" v-if="1" :hover-class="false" class="flex more">
									图表分析<text class="cuIcon-right"></text>
								</navigator> -->
							</view>
							<view class="money-box flex justify-between align-center">
								<view :data-incomeType="1" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">未到账收益(瑞币)</view>
									<view class="num">
										{{profit.EAmount1||0}}
									</view>
								</view>
								<view :data-incomeType="1" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">
										{{profit.ECount1||0}}
									</view>
								</view>
								<view class="" style="width: 3rpx;height: 58rpx; margin: 0 34rpx; background: #EEEEEE;">
								</view>
								<view :data-incomeType="7" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">已到账收益(瑞币)</view>
									<view class="num">{{profit.Amount1||0}}
									</view>
								</view>
								<view :data-incomeType="7" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">{{profit.Count1||0}}
									</view>
								</view>
							</view>
						</view>
						<view v-if="roleLevel==1||roleLevel==2" class="box bg-white">
							<view class="subtitle flex justify-between">
								<view class="flex align-center">
									<image :src="IMAGE_URL + '/wxapp/mine/t02.png'" style="width: 64rpx;" mode="widthFix">
									</image>
									<view>分享收益 <text class="text-gray cuIcon-question"
											style="font-size: 24rpx;font-weight: 400; padding-left: 8rpx;"
											@tap.stop="tipModel(true,'guide')"></text></view>
								</view>
								<!-- <view class="flex more" v-if="1">查看明细<text class="cuIcon-right"></text></view> -->
							</view>
							<view class="money-box flex justify-between align-center">
								<view :data-incomeType="3" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">未到账收益(瑞币)</view>
									<view class="num">
										{{profit.EAmount2||0}}
									</view>
								</view>
								<view :data-incomeType="3" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">
										{{profit.ECount2||0}}
									</view>
								</view>
								<view class="" style="width: 3rpx;height: 58rpx; margin: 0 34rpx; background: #EEEEEE;">
								</view>
								<view :data-incomeType="9" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">已到账收益(瑞币)</view>
									<view class="num">{{profit.Amount2||0}}</view>
								</view>
								<view :data-incomeType="9" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">{{profit.Count2||0}}</view>
								</view>
							</view>
						</view>
						<view v-if="roleLevel==1||roleLevel==2" class="box bg-white">
							<view class="subtitle flex justify-between">
								<view class="flex align-center">
									<image :src="IMAGE_URL + '/wxapp/mine/t03.png'" style="width: 64rpx;" mode="widthFix">
									</image>
									<view>品牌补贴 <text class="text-gray cuIcon-question"
											style="font-size: 24rpx;font-weight: 400; padding-left: 8rpx;"
											@tap.stop="tipModel(true,'team')"></text></view>
								</view>
						<!-- 		<navigator url="/packageA/myIncome/shopSubsidy" :hover-class="false" class="flex more">
									图表分析<text class="cuIcon-right"></text>
								</navigator> -->
							</view>
							<view class="money-box flex justify-between align-center">
								<view :data-incomeType="5" >
									<view class="txt" style="margin-bottom: 20rpx;">未到账收益(瑞币)</view>
									<view class="num">
										{{profit.EAmount3||0}}
									</view>
								</view>
								<view :data-incomeType="5" >
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">{{profit.ECount3||0}}
									</view>
								</view>
								<view class="" style="width: 3rpx;height: 58rpx; margin: 0 34rpx; background: #EEEEEE;">
								</view>
								<view :data-incomeType="11" >
									<view class="txt" style="margin-bottom: 20rpx;">已到账收益(瑞币)</view>
									<view class="num">{{profit.Amount3||0}}</view>
								</view>
								<view :data-incomeType="11" >
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">{{profit.Count3||0}}</view>
								</view>
							</view>
						</view>
						<view v-if="roleLevel==2" class="box bg-white">
							<view class="subtitle flex justify-between">
								<view class="flex align-center">
									<image :src="IMAGE_URL + '/wxapp/mine/t01.png'" style="width: 64rpx;" mode="widthFix">
									</image>
									<view>开店收益 <text class="text-gray cuIcon-question"
											style="font-size: 24rpx;font-weight: 400; padding-left: 8rpx;"
											@tap.stop="tipModel(true,'purchase')"></text></view>
								</view>
						
								<!-- <navigator url="/packageA/myIncome/purchase"  :hover-class="false" class="flex more"> -->
								<!-- 	<navigator url="/packageA/myIncome/purchase" v-if="1" :hover-class="false" class="flex more">
									图表分析<text class="cuIcon-right"></text>
								</navigator> -->
							</view>
							<view class="money-box flex justify-between align-center">
								<view :data-incomeType="1" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">未到账收益(瑞币)</view>
									<view class="num">
										{{profit.EAmount4||0}}
									</view>
								</view>
								<view :data-incomeType="1" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">
										{{profit.ECount4||0}}
									</view>
								</view>
								<view class="" style="width: 3rpx;height: 58rpx; margin: 0 34rpx; background: #EEEEEE;">
								</view>
								<view :data-incomeType="7" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">已到账收益(瑞币)</view>
									<view class="num">{{profit.Amount4||0}}
									</view>
								</view>
								<view :data-incomeType="7" @click="inComeDetail">
									<view class="txt" style="margin-bottom: 20rpx;">订单数</view>
									<view class="num">{{profit.Count4||0}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 我的收益3.0版本 -->
					<!-- 	<view class="box bg-white" @click="toMyIncome">
						<view class="subtitle flex align-center justify-between"><text>我的收益</text> <text class="cuIcon-right"></text></view>
						<view class="flex justify-around text-center align-center subtitle" style="line-height: 50rpx;font-size: 36rpx;color: #333333;padding: 16rpx 0 20rpx 0;font-weight: 400;">
							<view>
								<view class="">
									<text>{{myIncomeData.monthExpect?myIncomeData.monthExpect:0}}</text>
								</view>
								<view class="" style="font-size: 24rpx;">
									<text>本月预估</text>
								</view>
							</view>
							<view class="line" style="width: 4rpx; height: 76rpx; background: #E6E6E6; border-radius: 1rpx;">
							</view>
							<view class="">
								<view class="">
									<text>{{myIncomeData.dayExpect?myIncomeData.dayExpect:0}}</text>
								</view>
								<view class="" style="font-size: 24rpx;">
									<text>今日预估</text>
								</view>
							</view>
						</view>
						<view class="flex justify-around align-center" style="font-size: 24rpx;color: #666666;padding: 14rpx 0;">
							<view class="">
								<text>上月结算</text><text style="color: #D7BE8E;">￥{{myIncomeData.lastMonthIncome?myIncomeData.lastMonthIncome:0}}</text>
							</view>
							<view class="">
							</view>
							<view class="">
								<text>上月预估</text><text style="color: #D7BE8E;">￥{{myIncomeData.lastMonthExpect?myIncomeData.lastMonthExpect:0}}</text>
							</view>
						</view>
					</view>
					 -->
					<view class="box bg-white" style="border-radius: 20rpx; margin:20rpx 20rpx;">
						<navigator url="/pages/orders/orders" hover-class="none"
							class="subtitle flex justify-between">
							<view>订单中心
								<!-- <text style="font-weight: normal;font-size: 26rpx;">(自购)</text> -->
							</view>
							<view class="flex more">查看明细<text class="cuIcon-right"></text></view>
						</navigator>
						<view class="order-con flex justify-around">
							<view class="order-item flex flex-direction align-center"
								v-for="(item,index) in orderStatus" :key="index" @tap="toOrders(index)">
								<image :src="item.icon" style="height: 56rpx;margin-bottom: 10rpx;width: auto;"
									mode="heightFix"></image>
								<view style="font-size: 24rpx;color: #666;">{{item.text}}</view>
								<view class="order-count" v-if="item.count">{{item.count}}</view>
							</view>
						</view>
					</view>
					<view class="box flex justify-around bg-white" style="border-radius: 20rpx; margin:20rpx 20rpx;">
						<view v-for="(item,index) in otherOptions" class="other-item flex-sub flex flex-direction justify-between align-center"
							@tap="toPage(item.page)">
							<image :src="item.icon" style="height: 50rpx;width: auto;margin-bottom: 10rpx;"
								mode="heightFix"></image>
							<view>{{item.text}}</view>
						</view>
					</view>
				</view>

				<!-- </view> -->
			</scroll-view>
		</view>
		<view class="" v-else>
			<view class="logo-box">
				<image :src="IMAGE_URL+'/wxapp/recookLogo.png'" mode="widthFix"></image>
			</view>
			<view class="login-btn">
				<view class="" @click="toLogin">
					登录
				</view>
			</view>
		</view>
		<!-- 分享弹出框 -->
		<u-popup v-model="isShow" mode="bottom" border-radius="15">
			<view class="share-box flex justify-between">

				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" @tap="copyLink">
						<image class="share-icon" :src="IMAGE_URL + '/wxapp/mine/wx.png'" mode="widthFix"></image>
						<view class="txt">复制链接</view>
					</button>
				</view>
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" @click="teamShare">
						<image class="share-icon" :src="IMAGE_URL + '/wxapp/mine/post.png'" mode="widthFix"></image>
						<view class="txt">二维码海报</view>
					</button>
				</view>
			</view>
			<view class="cancle" @tap="hideModel">取消</view>
		</u-popup>

		<tip-model :show='showTipModel' :title='tipModelTitle' @confirm='tipConfirm'></tip-model>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				// 开启下拉
				refresherEnabled: true,
				//
				triggered: false,
				isShow: false, //分享显示隐藏
				tipModelTitle: '', //模态窗
				showTipModel: false, //模态窗显示隐藏
				needAmount: 0, //canvas 进度条 销售总额
				cardType: 0, //canvas 是否使用升级卡
				checkDate: null, //考核日期
				progressShow: true, //进度条显示隐藏
				progressColor: { //进度条渐变色
					start: '#B2C1CF',
					end: '#364C53'
				},
				background: { // 导航栏颜色
					backgroundColor: '#3A3943',
				},
				usercreatedAt: null, //会员创建时间
				profit: [], // 各种收益
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				isLogin: false, //是否登录
				bgImage: this.IMAGE_URL + '/wxapp/bg01.png', //背景
				iconPic: "", //徽章
				role: "", //徽章
				orderStatus: [{
						icon: this.IMAGE_URL + "/wxapp/mine/p1.png",
						text: "待付款"
					},
					{
						icon: this.IMAGE_URL + "/wxapp/mine/p2.png",
						text: "待发货"
					},
					{
						icon: this.IMAGE_URL + "/wxapp/mine/p3.png",
						text: "待收货"
					},
					{
						icon: this.IMAGE_URL + "/wxapp/mine/p4.png",
						text: "待评价"
					},
					{
						icon: this.IMAGE_URL + "/wxapp/mine/p5.png",
						text: "售后/退货"
					}
				],
				otherOptions: [{
						icon: this.IMAGE_URL +"/wxapp/uni-program/address.png",
						text: "地址",
						page: "/packageA/address/index"
					},
					{
						icon:  this.IMAGE_URL +"/wxapp/uni-program/myCollect.png",
						text: "收藏",
						page:'/packageA/myCollect/myCollect'
					},
					{
						icon:  this.IMAGE_URL +"/wxapp/uni-program/cooperation.png",
						text: "商务合作",
						page: "/packageA/cooperation/cooperation"
					},
					{
						icon:  this.IMAGE_URL +"/wxapp/uni-program/setting.png",
						text: "设置",
						page: "/packageA/settings/settings"
					}
				],
				roleLevel: 500, //会员等级
				// welfareTotal: 0, //卡包数量
				info: {},
				userInfo: {
					nickname: "",
					headImgUrl: ""
				},
				teamIncome: {
					amount: 0,
					historyIncome: 0,
					orderNum: 0
				},
			};
		},
		created() {
			this.$store.commit('setIsLogin')
			this.isLogin = this.$store.state.isLogin
			if (uni.getStorageSync("userInfo")) {
				this.usercreatedAt = uni.getStorageSync("userInfo").createdAt.substring(0, 10)
			}
			this.checkDate = new Date();
		},
		onLoad() {
			this.isLogin = this.$store.state.isLogin
			if (this.isLogin) {
				this.getUserInfo()
				// this.getTotalEarning()
				// this.welfare()
			}
		},
		onShow() {
			if (this.isLogin) {
				this.userInfo.nickname = uni.getStorageSync("userInfo").nickname
				this.userInfo.headImgUrl = uni.getStorageSync("userInfo").headImgUrl
				this.myIncome()
				// this.check()
			}
		},
		methods: {
			//下拉过程的函数
			onPulling(e) {},
			//松手后执行下拉事件的函数
			onRefresh() {
				console.log('onRefresh')
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.getUserInfo()
				// this.getTotalEarning()
				this.myIncome()
				// this.check()
				// this.welfare()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			//结束下拉函数
			onAbort() {
				console.log('onAbort')
			},
			//弹出层隐藏
			hideModel() {
				this.isShow = false
			},
			// 复制链接
			copyLink() {
				const that = this
				let url = `${this.H5_BASE_URL}/#/user/appRegister/${this.$store.state.invitationNo}`
				uni.setClipboardData({
					data: url,
					success: function() {
						console.log('success');
						that.hideModel()
					}
				});
			},
			// 卡包数量
			// welfare() {
			// 	let sendData = {
			// 		page: 1,
			// 		limit: 10,
			// 		type: 0,
			// 	}
			// 	this.$u.post('/api/v2/app/user/welfare/lists', sendData).then(res => {
			// 		if (res.data.code == "FAIL") {
			// 			return
			// 		}
			// 		console.log(res)
			// 		this.welfareTotal = res.data.data.total
			// 	})
			// },

			//进度条数据 以及是否显示
			check() {
				// yy-mm
				let month = this.$options.filters['formatDate'](this.checkDate, 'yy-mm')
				this.$u.post('/api/v2/app/user/check', {
					month: month
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						// this.$u.toast(res.data.msg);
						this.progressShow = false
						return
					}
					let result = res.data.data
					this.needAmount = result.needAmount
					this.cardType = result.cardType
					if (this.roleLevel === 200) {
						this.progressColor.start = '#ECD5A7'
						this.progressColor.end = '#E0AE5C'
					}
					let r = this.convert_length(80)
					if (result.cardType) {
						this.Progressbar(100, 100, r, this.progressColor.start, this.progressColor.end);
					} else {
						let amount = result.amount
						let needAmount = result.needAmount
						if (needAmount === 0) {
							amount = 0
							needAmount = 100
						}
						this.Progressbar(amount, needAmount, r, this.progressColor.start, this.progressColor.end);
					}
				});
			},
			//进度条
			Progressbar(remain, total, r, colorStart, colorEnd) {
				const setLineWidth = this.convert_length(10)
				const context = wx.createContext();
				// 打底灰色曲线
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r, 0, 2 * Math.PI);
				context.setLineWidth(setLineWidth);
				context.setStrokeStyle('#FFFFFF');
				context.stroke();
				//绘制打底曲线的边线
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r - (setLineWidth / 2), 0, 2 * Math.PI);
				context.setLineWidth(this.convert_length(2));
				context.setStrokeStyle(colorStart);
				context.stroke();
				//绘制打底曲线的边线
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r + (setLineWidth / 2), 0, 2 * Math.PI);
				context.setLineWidth(this.convert_length(2));
				context.setStrokeStyle(colorStart);
				context.stroke();

				// 圆弧角度
				const deg = ((remain / total).toFixed(2)) * 2 * Math.PI;
				// 画渐变曲线
				const grd = context.createLinearGradient(0, 50, 50, 0);
				grd.addColorStop('0', colorStart);
				grd.addColorStop('1.0', colorEnd);
				context.setStrokeStyle(grd);
				context.lineCap = 'round';
				context.setLineWidth(setLineWidth);
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r, -0.5 * Math.PI, -0.5 * Math.PI + deg);
				context.stroke();

				wx.drawCanvas({
					canvasId: 'progress',
					actions: context.getActions()
				});
			},
			// 辅助函数，用于转换小程序中的rpx
			convert_length(length) {
				return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
			},
			inComeDetail(e) {
// 				let incometype = e.currentTarget.dataset.incometype
// uni.navigateTo({
// 					url: "/packageA/myIncome/index?incometype=" + incometype
// 				})
			},
			withdraw2(){
				uni.navigateTo({
					url: "/packageA/withdraw/withdraw"
				})
			},
			toMineShopPage(url) {
				uni.navigateTo({
					url: "/packageA/mineShop/mineShop?url=" + url
				})
			},
			teamShare() {
				uni.navigateTo({
					url: "/packageA/myShop/teamAdd"
				})
			},
			toMyInfo() {
				uni.navigateTo({
					url: "/packageA/myInfo/myInfo"
				})
			},
			toBalance() {
				//我的余额	
				uni.navigateTo({
					url: "/packageA/balance/balance"
				})
			},
			// 我的收益
			myIncome() {
				this.$u.post('/api/v2/app/user/profit').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						// this.$u.toast(res.data.msg);
						return
					}
					this.profit = res.data.data
				});
			},
			// 到我的收益页面
			toMyIncome() {
				uni.navigateTo({
					url: "/packageA/myIncome/cumulative"
				})
			},
			// getTotalEarning() {
			// 	this.$u.post('/api/v1/shop/shop_index', {
			// 		userID: uni.getStorageSync("userInfo").id
			// 	}).then(res => {
			// 		console.log(res.data);
			// 		if (res.data.code == "FAIL") {
			// 			this.$u.toast(res.data.msg);
			// 			return
			// 		}
			// 		let info = res.data.data
			// 		// this.totalEarning = info.accumulateIncome.all
			// 	});
			// },
			//获取我的全部信息
			getUserInfo() {
				this.$u.post('/api/v1/users/profile/my_info', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
					if (!this.info) {
						return
					}
					console.log(res.data.data)
					uni.setStorageSync("userId", res.data.data.identifier)
					console.log(uni.getStorageSync("userId"))
					this.roleLevel = this.info.level
					uni.setStorageSync("myLevel", res.data.data.level)
					this.bgImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'mineBg')
					this.role = this.$options.filters['roleFilter'](this.roleLevel, 'txt')
					this.iconPic = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')
					this.$store.commit('setRoleLevel', this.roleLevel);
					// 订单数量提醒
					this.orderStatus[0].count = this.info.orderCenter.waitPay
					this.orderStatus[1].count = this.info.orderCenter.waitSend
					this.orderStatus[2].count = this.info.orderCenter.waitRecv
					// this.orderStatus[4].count = this.info.orderCenter.afterSales
				});
			},
			toWithdraw() {
				uni.navigateTo({
					url: "/packageA/withdraw/withdraw"
				})
			},
			toCoupons() {
				uni.navigateTo({
					url: "/packageA/coupons/coupons"
				})
			},
			toMyMoney() {
				uni.navigateTo({
					url: "/pages/myMoney/myMoney"
				})
			},
			toCardPackage() {
				uni.navigateTo({
					url: "/pages/cardPackage/cardPackage"
				})
			},
			toLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			tipModel(flag, title) {
				this.showTipModel = flag
				this.tipModelTitle = title
			},
			tipConfirm() {
				this.showTipModel = false
			},
			toTeamEarnings() {
				uni.navigateTo({
					url: "/packageA/teamEarnings/teamEarnings"
				})
			},
			toPage(page) {
				uni.navigateTo({
					url: page
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
							url: "/pages/orders/remark"
						})
						return;
					case 4:
						uni.navigateTo({
							url: "/pages/afterSaleGoods/afterSaleGoods"
						})
						return;
					default:
						break;
				}
				uni.navigateTo({
					url: "/pages/orders/orders?type=" + type
				})
			}
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
	}
</script>

<style lang="scss">
	.progress-box {
		width: 100%;
		position: relative;

		.progress-core {
			position: absolute;
			font-size: 40rpx;
			transform: 50%;
		}

		.progress {
			// display: inline-block;
			width: 240rpx;
			margin: 0 auto;
			height: 240rpx;
		}
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

	page {
		background-color: #F3F4F6;
	}

	.logo-box {
		font-size: 34rpx;
		font-weight: 700;
		margin: 258rpx auto;

		image {
			width: 160rpx;
			box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
			margin: 0 auto;
			border-radius: 30rpx;
		}
	}

	.login-btn {
		width: 50%;
		margin: 0 auto;
		line-height: 86rpx;
		border-radius: 16rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #C92219;
	}

	.top-nav {
		position: relative;
		z-index: 10;
		font-size: 20rpx;

		.top-nav-box {
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 100;

			.nav-box {
				height: 320rpx;
				margin: 20rpx 12rpx;
				background-size: 100% auto;
				padding: 42rpx 52rpx;

				.avatar {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					overflow: hidden;
				}

			}
		}
	}


	.shop-box {
		padding: 0 10rpx;

		.card {
			position: relative;

			width: 340rpx;
			height: 180rpx;
			margin: 10rpx 0;
			padding: 24rpx;
			border-radius: 8rpx;
			overflow: hidden;
			z-index: 10;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;

			image {
				z-index: -1;
				position: absolute;
				top: 0;
				left: 0;
			}
		}

	}

	.top-container {
		position: relative;
		border-radius: 80rpx/30rpx;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		overflow: hidden;
		height: 450rpx;

		.user-msg-box {
			position: absolute;
			width: 100%;
			bottom: 150rpx;
			left: 0;
			padding: 0 30rpx;

			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.nickname {
				font-size: 42rpx;
				margin: 10rpx 0;
			}

			.level-box {
				color: #B25E34;
				background-color: #F5CA88;
				height: 36rpx;
				line-height: 36rpx;
				border-radius: 20rpx;
				padding: 0 20rpx;
				font-size: 20rpx;
			}
		}

		.balance-box {
			position: absolute;
			bottom: 0;
			width: 690rpx;
			left: 30rpx;

			.balance-con {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				color: #FFDEAA;
				font-size: 20rpx;

				.widthdraw-btn {
					height: 50rpx;
					background-image: linear-gradient(#FECCAB, #FEB273);
					font-size: 28rpx;
					color: #6F4019;
				}
			}
		}
	}

	.box {
		// border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;

		.subtitle {
			padding: 0 20rpx;
			line-height: 84rpx;
			font-size: 32rpx;
			color: #000;
			// border-bottom: 2rpx solid #E6E6E6;
			font-weight: 700;

			.more {
				font-size: 26rpx;
				color: #AAAAAA;
				font-weight: normal;
			}
		}

		.order-item {
			width: 130rpx;
			padding: 30rpx 0;
			position: relative;

			.order-count {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				// border: 1rpx solid red;
				// color: red;
				color: #FFFFFF;
				background-color: red;
				border-radius: 50%;
				height: 30rpx;
				width: 30rpx;
				font-size: 20rpx;
				line-height: 30rpx;
				text-align: center;
			}
		}
	}

	.card-con>view {
		width: 200rpx;
		height: 134rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 45rpx;
		font-size: 24rpx;
		color: #999999;

		.num {
			color: #000;
			font-size: 36rpx;
		}
	}

	.other-item {
		color: #999;
		font-size: 24rpx;
		padding: 30rpx 0;

		text {
			font-size: 66rpx;
		}
	}

	.money-box {
		padding: 0 20rpx;
		color: #999;

		.num {
			text-align: center;
		}

		&>view {
			padding: 20rpx 0;
			line-height: 45rpx;
			// flex: 1;	
		}

		&>navigator {
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
	.balance-box2{
		    background-size: 100% 62px;
		    background-repeat: no-repeat;
		    margin: 12px 15px 0;
		    margin-bottom: 0;
		    height: 62px;
		    display: flex;
		    /* flex-direction: column; */
		    justify-content: space-between;
		    align-items: center;
		    color: #FFDEAA;
		    padding: 12px;
			.shop2{
				    height: fit-content;
				    text-align: center;
					image{
						    width: 16px;
						    height: 16px;
						    margin: auto;
					}
			}
			.balance2{
				.warn2{
					    font-size: 10px;
					    margin-top: 5px;
				}
			}
			.withdraw2{
				    background-image: linear-gradient(#FEDCAB, #FEBC73);
				    border-radius: 16px;
					margin: 0;
			}
	}
</style>
