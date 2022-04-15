<template>
	<view class="flex flex-direction container">
		<view class="top-box">
			<u-navbar :is-fixed="false" :is-back="false" background="transparent" :border-bottom="false"></u-navbar>
			<!-- <cover-view class="flex justify-between text-white align-center top-con">
				<cover-view class="flex align-center top-left round">
					<cover-view class="avatar">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+videoDetail.headImgUrl" :index="index" height="70" border-radius="35"
						 :error-img="IMAGE_URL + '/null05.png'"  @click="toUserHomePage(videoDetail.userId,videoDetail.isFollow)"></u-lazy-load>
					</cover-view>
					<cover-view class="user-info">
						<cover-view style="font-size: 26rpx;">{{videoDetail.nickname}}</cover-view>
						<cover-view style="font-size: 20rpx;">点赞数 {{videoDetail.praise}}</cover-view>
					</cover-view>
					<cover-view class="btn round bg-red shadow" v-if="videoDetail.isFollow==0" @tap="addFollow">+关注</cover-view>
				</cover-view>
				<cover-view class="cuIcon-close" style="font-size: 48rpx;" @tap="back"></cover-view>
			</cover-view> -->
		</view>

		<view class="videoBox">
			<!-- 直播 -->
			<view v-if="isLive" style="position: absolute; top: 60px;z-index: 100;"
				class="flex justify-between text-white align-center top-con" :style="fullScreen?'display:none;':''">
				<view style="" class="flex align-center top-left round">
					<view class="avatar">
						<image :src="judgeCover(videoDetail.headImgUrl)"
							@click="toUserHomePage(videoDetail.userId,videoDetail.isFollow)"
							style="height: 35px; border-radius: 35px;"></image>
					</view>
					<view class="user-info">
						<view style="font-size: 26rpx;">{{videoDetail.nickname}}</view>
						<view style="font-size: 20rpx;">点赞数 {{videoDetail.praise}}</view>
					</view>
					<view class="btn round bg-red shadow" v-if="videoDetail.isFollow==0" @tap="addFollow">+关注</view>
				</view>
				<view class="avatarList" v-if="memberList" @click="isGroup = true">
					<u-avatar :src="IMAGE_URL + memberList[0].avatar" size='50'
						style='position: relative;left: 10;z-index: 100;'></u-avatar>
					<u-avatar :src="IMAGE_URL + memberList[1].avatar" size='50' v-if='memberList.length > 1'
						style='position: relative;left: 5;z-index: 10;'></u-avatar>
					<u-avatar :src="IMAGE_URL + memberList[2].avatar" size='50' v-if='memberList.length > 2'></u-avatar>
				</view>
				<view class="cuIcon-close" style="font-size: 48rpx;color: white;" @tap="back"></view>
			</view>

			<live-player v-if="isLive" class="video flex-sub" :src="videoDetail.playUrl" object-fit="fillCrop"
				style="position: fixed;z-index: 10;" :style="screenWidth?('width:'+screenWidth+'px;height:'+screenHeight+'px;'):''" @statechange="statechange" @click="setFullScreen" mode="RTC"
				autoplay>
			</live-player>

			<!-- 视频 -->
			<video v-else class="video flex-sub" :src="videoDetail.playUrl" style="position: relative;" controls>
				<view style="position: absolute; top: 60px;"
					class="flex justify-between text-white align-center top-con">
					<view class="flex align-center top-left round">
						<view class="avatar">
							<image :src="IMAGE_URL+videoDetail.headImgUrl"
								@click="toUserHomePage(videoDetail.userId,videoDetail.isFollow)"
								style="height: 35px; border-radius: 35px;"></image>
						</view>
						<view class="user-info">
							<view style="font-size: 26rpx;">{{videoDetail.nickname}}</view>
							<view style="font-size: 20rpx;">点赞数 {{videoDetail.praise}}</view>
						</view>
						<view class="btn round bg-red shadow" v-if="videoDetail.isFollow==0" @tap="addFollow">+关注</view>
					</view>
					<view class="cuIcon-close" style=";font-size: 48rpx;" @tap="back"></view>
				</view>
			</video>
		</view>
		<!-- 讲解 商品弹框 -->
		<view class="goodsBox flex flex-direction" v-if="isExplain">
			<view style="position: absolute;right: -5px;top: -5px; width: 12px;height: 12px;">
				<image :src="IMAGE_URL + '/closed.png'" mode="" style="width: 100%; height: 100%;"
					@tap="isExplain = false"></image>
			</view>
			<view class="tips flex justify-center" style="padding: 4px;">宝贝正在讲解中</view>
			<view style="padding: 5px; background: #fff;" @click="shopping(goodsInfo.id)">
				<view style="position: relative;width: 100px;height: 100px;">
					<image :src="IMAGE_URL + goodsInfo.url" style="width: 100%;height: 100%;" mode=""></image>
					<text class="goodsName">{{goodsInfo.goodsName}}</text>
				</view>
				<view class="red priceBox" style="">
					￥
					<text style="font-size: 14px;">
						{{goodsInfo.price.split('.')[0]}}
					</text>
					<text v-if="goodsInfo.price.split('.').length >= 2">
						.{{goodsInfo.price.split('.')[1]}}
					</text>
					<text v-else>
						.00
					</text>
				</view>
			</view>
		</view>
		<!-- 底部界面 -->
		<view v-if="isLive" class="bottom flex flex-direction"
			style="padding: 0px 20px;width: 100%;position: absolute; bottom: 20px;z-index: 10;"
			:style="fullScreen?'display:none;':''">
			<view class="chatBox flex">
				<scroll-view scroll-y="true" :scroll-into-view="toView" style="width: 60%;height: 240px;">
					<view class="chatContent">
						<text class="name" style="min-width: 70px;">
							系统消息:
						</text>
						欢迎来到直播间，左家右厨禁止未成年人进行直播，请大家共同遵守、监督。直播间内严禁出现违法违规、低俗色情、吸烟酗酒等内容，如有违规行为请及时举报。请大家注意财产安全，谨防网络诈骗。
					</view>
					<view class="chatContent" :id="'item' + index" v-for="(item, index) in contentList "
						:class="item.type === 1 ? 'join' : '' " :key='index'>
						<text v-if='item.type !== 2' class="name" style="min-width: 70px;">
							{{item.name}}:
						</text>
						{{item.content}}
					</view>
				</scroll-view>
			</view>
			<canvas canvas-id="bubble" style="width: 90px;height: 300px;z-index: 999;" class="like-fx"></canvas>
			<view class="flex justify-between align-end " style="width: 100%;">
				<input confirm-type="send" type="text" v-model="content" placeholder="说点什么吧" style="color: white;"
					@confirm="toSend" />
				<image :src="IMAGE_URL + '/shop/more.png'" style="width: 60rpx;" mode="widthFix"
					@click="isClear = true"></image>
				<button class="noStyleButton" open-type="share">
					<image :src="IMAGE_URL + '/share.png'" style="width: 60rpx;" mode="widthFix"></image>
				</button>
				<image :src="IMAGE_URL + '/love.png'" style="width: 60rpx;margin-right: 20px;" @click="thumbsUp"
					mode="widthFix"></image>
				<view class="" style="position: relative;" @tap="isShow = true">
					<image :src="IMAGE_URL + '/shop/pack.png'" style="width: 90rpx;" mode="widthFix"></image>
					<view class="text-center goods-num">{{videoDetail.goodsLists.length}}</view>
				</view>
			</view>
		</view>

		<view v-else class="bottom flex flex-direction"
			style="padding: 0px 20px;width: 100%;position: absolute; bottom: 50px;z-index: 10;">
			<view class="flex justify-end align-end " style="width: 100%;">
				<!-- <image :src="IMAGE_URL + '/shop/more.png'" style="width: 60rpx;" mode="widthFix" @click="isClear = true"></image > -->
				<!-- <button open-type="share" style="background: none;">
					<image :src="IMAGE_URL + '/share.png'" style="width: 60rpx;" mode="widthFix"></image >
				</button>
				<image :src="IMAGE_URL + '/love.png'" style="width: 60rpx;margin-right: 20px;" @click="thumbsUp" mode="widthFix"></image >
				 -->
				<view class="" style="position: relative;" @tap="isShow = true">
					<image :src="IMAGE_URL + '/shop/pack.png'" style="width: 90rpx;" mode="widthFix"></image>
					<view class="text-center goods-num">{{videoDetail.goodsLists.length}}</view>
				</view>
			</view>
		</view>
		<!-- 商品显示 -->
		<u-popup v-model="isShow" mode="bottom" border-radius="20" height="60%">
			<view class="goods-container">
				<view class="item" v-for="(item,index) in videoDetail.goodsLists" :key="index">
					<view class="item-con flex justify-between">
						<view class="goods-pic">
							<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index"
								height="200" border-radius="10" :error-img="IMAGE_URL + '/null05.png'"
								@click="toGoodsDetail(item.id)"></u-lazy-load>
							<view class="no">{{index+1}}</view>
							<view v-if='item.id==goodsInfo.id' class="explain">讲解中</view>
						</view>
						<view class="goods-con flex-sub flex flex-direction justify-between">
							<view class="">
								<view class="goods-name two-line">{{item.goodsName}}</view>
								<view class="goods-remark">{{item.description}}</view>
								<view class="goods-brand">
									<image :src="IMAGE_URL+item.brandImg" mode="heightFix"></image>
									<text>{{item.brandName}}</text>
								</view>
							</view>
							<view class="">
								<view class="flex justify-between align-center">
									<view class="flex justify-between align-center">
										<view class="coupon text-white">
											<image :src="IMAGE_URL+'/tic.png'" mode="heightFix"></image>
											<view class="coupon-price">{{item.coupon}}元券</view>
										</view>
										<view class="goods-commission">赚{{item.commission}}</view>
									</view>
									<view class="goods-store">剩余<text class="text-red">{{item.inventory}}</text>件</view>
								</view>
								<view class="right-bottom flex justify-between align-end">
									<view class="flex align-end" style="font-size: 24rpx;">
										<text class="text-orange">券后</text>
										<text class="text-red">￥</text>
										<text class="text-red"
											style="font-size: 36rpx;line-height: 36rpx;font-weight: 700;">{{item.discountPrice}}</text>
										<text class="text-gray"
											style="text-decoration: line-through;margin-left: 10rpx;">￥{{item.originalPrice}}</text>
									</view>
									<view class="text-white bg-red round shadow buy" @tap="shopping(item.id)">马上抢</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 清屏 -->
		<u-popup v-model="isClear" mode="bottom" border-radius="15">
			<view class="flex" style="padding: 10px 20px;">
				<view class="flex flex-direction align-center" @click='clear'>
					<view class="cuIcon-delete" style="font-size: 20px;margin-bottom: 5px;"></view>
					<text>清屏</text>
				</view>
				<view class="flex flex-direction align-center" @click='report' style="margin-left: 20px;">
					<view class="cuIcon-warn" style="font-size: 20px;margin-bottom: 5px;"></view>
					<text>举报</text>
				</view>
			</view>
		</u-popup>
		<!-- 举报 -->
		<u-modal v-model="isReport" title="是否举报" :show-cancel-button="true" @confirm='toReport' :confirm-style="{color:'#D5101A'}">
			<view class="inputArea" style="margin: 40px 0;">
				<input type="text" v-model="reportContent" placeholder="请填写举报理由" style="text-align: center;" />
			</view>
		</u-modal>
		<!-- 直播关闭 -->
		<view class="liveClosed justify-center flex flex-direction align-center" v-if='isClosed'
			style="width: 100vw;height: 100vh;z-index: 9999;">
			<view class="cuIcon-close exitIcon" style="font-size: 48rpx;color: white;" @tap="back"></view>
			<view>直播已结束</view>
			<view class="avatar" style="margin: 40px 0px 55px;">
				<image :src="judgeCover(videoDetail.headImgUrl)" style="width: 80px;height: 80px; border-radius: 35px;">
				</image>
			</view>
			<view class="flex">
				<view class="center" style="margin-right: 50px;">
					<view>{{closedInfo.look}}</view>
					<text style="font-size: 14px;">观看</text>
				</view>
				<view class="center">
					<view>{{closedInfo.praise}}</view>
					<text style="font-size: 14px;">获赞</text>
				</view>
			</view>
			<button class="followBtn" v-if="videoDetail.isFollow==0" @tap="addFollow">关注</button>
			<button class="followBtn ">已关注</button>
			<text style="color: #999999;font-size: 12px;">关注主播，不错过更多精彩内容</text>
		</view>
		<!-- 查看群成员 -->
		<u-popup v-model="isGroup" mode="bottom" border-radius="15" style='height: 40%;' class='memberPopup'>
			<view class="flex justify-center" style="color: white;margin-bottom: 5px;">在线观众</view>
			<scroll-view scroll-y="true" style="height: 100%;">
				<view v-for="item in memberList" :key='item.userID' class="flex align-center list">
					<u-avatar :src="IMAGE_URL + item.avatar" size='50' style='margin-right: 5px;'></u-avatar>
					<text style="margin-right: 10px;">{{item.nick}}</text>
				</view>
			</scroll-view>
		</u-popup>

		<!-- 购买商品 -->
		<choose class='sdk' v-if='showSpecs' :showSpecs='showSpecs' :goodsId='goodsId' @closed='showSpecs = false'>
		</choose>
	</view>
</template>

<script>
	import choose from '../../components/chooseSKU.vue'
	import TIM from 'tim-wx-sdk' //小程序环境
	export default {
		components: {
			choose
		},
		data() {
			return {
				screenWidth:null,
				screenHeight:null,
				tim: '',
				IMAGE_URL: this.IMAGE_URL,
				id: 0,
				videoDetail: [],
				isShow: false, // 商品显示
				isClear: false, // 更多功能 清屏
				isReport:false,// 举报弹窗
				isGroup: false, // 查看群成员
				isExplain: false, // 讲解的商品
				isClosed: false, // 直播关闭
				isLive: 0, //是否是直播

				toView: '',
				sdkStatus: false,
				groupInfo: {},
				contentList: [], // 聊天内容
				content: '', // 聊天输入框
				count: 0, // 点赞数
				time: '', // 点赞计时器
				page: 0, // 拉取群成员信息用
				memberList: [], // 存放群成员信息
				goodsInfo: '', // 讲解的商品信息

				queue: {},
				timer: 0,
				ctx: null,
				height: 300,
				width: 90,
				closedInfo: {}, // 关闭后直播信息显示

				showSpecs: false, // 选择规格 弹窗
				goodsId: 0,

				fullScreen: false
			};
		},
		onHide() {
			console.log('21333333333333333')
		},
		onLoad(options) {
			let that =this
			uni.getSystemInfo({
			    success: function (res) {
					that.screenWidth = res.screenWidth
					that.screenHeight = res.screenHeight
			    }
			});
			wx.hideShareMenu()
			wx.setNavigationBarRightButton({
				hide:true
			})
			console.log(options)
			if (options.id) {
				this.id = parseInt(options.id)
				this.isLive = parseInt(options.isLive)
				this.getDetail()
				this.ctx = wx.createCanvasContext("bubble")
				this.queue = {};
			}
		},
		watch: {
			contentList(val) {
				this.toView = 'item' + String(val.length - 1)
			},
			groupInfo(val) {
				if (val.memberCount - 1 > this.memberList.length) {
					this.getGroupMemberInfo()
				}
			}
		},
		beforeDestroy() {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			if (this.tim) {
				let quit = this.tim.quitGroup(this.videoDetail.groupId);
				quit.then(function(imResponse) {
					console.log(imResponse.data.groupID); // 退出成功的群 ID
				}).catch(function(imError) {
					console.warn('quitGroup error:', imError); // 退出群组失败的相关信息
				});

				let closedSDK = function(event) {
					console.log('关闭监听 SDK')
					// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
					// event.name - TIM.EVENT.MESSAGE_RECEIVED
					// event.data - 存储 Message 对象的数组 - [Message]
				};
				this.tim.off(TIM.EVENT.SDK_READY, closedSDK)

				let closedMessage = function(event) {
					console.log(event)
					console.log('关闭监听 MESSAGE_RECEIVED')
					// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
					// event.name - TIM.EVENT.MESSAGE_RECEIVED
					// event.data - 存储 Message 对象的数组 - [Message]
				};
				this.tim.off(TIM.EVENT.MESSAGE_RECEIVED, closedMessage)

				let closedNotSDK = function(event) {
					console.log('关闭监听 SDK_NOT_READY')
					// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
					// event.name - TIM.EVENT.MESSAGE_RECEIVED
					// event.data - 存储 Message 对象的数组 - [Message]
				};
				this.tim.off(TIM.EVENT.SDK_NOT_READY, closedNotSDK)

				let promise = this.tim.logout();
				promise.then(function(imResponse) {
					console.log(imResponse); // 登出成功
				}).catch(function(imError) {
					console.warn('logout error:', imError);
				})
			}
		},
		methods: {
			play(e) {
				console.log(e)
			},
			setFullScreen(e) {
				this.fullScreen = !this.fullScreen
			},
			statechange(e) {
				console.log(e)
				console.log('live-player code:', e.detail.code)
			},
			async createdLive() {
				let options = {
					SDKAppID: 1400435566
				}
				// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
				this.tim = TIM.create(options) // SDK 实例通常用 tim 表示
				// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
				// tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
				this.tim.setLogLevel(2); // release 级别，SDK 输出关键信息，生产环境时建议使用
				// 注册腾讯云即时通信 IM 上传插件
				// tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});

				let that = this
				this.tim.on(TIM.EVENT.SDK_READY, async function(event) {
					that.contentList = []
					// await that.join()
					that.sdkStatus = true
					console.log('SDK_READY')
					// that.globalData.isImLogin = true
					// wx.setStorageSync('isImLogin', true)
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					// event.name - TIM.EVENT.SDK_READY
				});
				// sdk 状态关闭
				this.tim.on(TIM.EVENT.SDK_NOT_READY, async function(event) {
					that.sdkStatus = false
					console.log('SDK_NOT_READY')
					uni.navigateTo({
						url: "/pages/find/find"
					})
				});
				// sdk 消息接收
				let onMessageReceived = function(event) {
					let data = event.data
					data.forEach((item) => {

						console.log("实时消息内容：")
						console.log(item)
						let status = false
						let obj = {
							name: item.nick,
							type: 0,
							content: ''
						}
						if (item.type === "TIMGroupSystemNoticeElem" || item.payload.operationType) {
							that.getGroupInfo()
						}
						if (item.payload.operationType === 1) {
							status = true
							obj.type = 1
							obj.content = '来了'
						}
						if (item.type === 'TIMTextElem') {
							status = true
							obj.content = item.payload.text
						}
						if (item.payload.operationType === 255) {
							let data = JSON.parse(item.payload.userDefinedField)
							console.log("自定义通信：")
							console.log(data)
							if (data.type === 'Notice') {
								status = true
								obj.type = 2
								obj.content = data.data.content
							}
							if (data.type === 'Explain') {
								that.getExplainGoods(data.data.goodsId)
							} else if (data.type === 'UnExplain') {
								that.isExplain = false
							}
							if (data.type === 'LiveStop') {
								that.closedInfo = data.data
								that.logoutSDK()
							}
							if (data.type === 'Praise') {
								that.videoDetail.praise += data.data.addPraise
							}
						}
						if (status) {
							that.contentList.push(obj)
						}
					})

					console.log(event)
					// event.data - 存储 Message 对象的数组 - [Message]
				};
				that.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

				// sdk 群消息更新
				// this.tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
				// 	console.log(event)
				// 	// if (that.sdkStatus) {
				// 	// 	that.getMessageList()
				// 	// }
				// // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
				// // event.name - TIM.EVENT.GROUP_LIST_UPDATED
				// // event.data - 存储 Conversation 对象的数组 - [Conversation]
				// });

				await this.$u.post("/api/v1/live/live/im/login_info").then(res => {
					if (res.data.code == "FAIL") {
						return
					}
					let promise = this.tim.login({
						userID: res.data.data.identifier,
						userSig: res.data.data.sign
					});
					promise.then(function(imResponse) {
						that.join()
						console.log(imResponse.data); // 登录成功
						if (imResponse.data.repeatLogin === true) {
							// 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
							console.log(imResponse.data.errorInfo);
						}
					}).catch(function(imError) {
						console.warn('login error:', imError); // 登录失败的相关信息
					});
				});
			},
			// 退出 SDK
			logoutSDK() {
				console.log(this.closedInfo)
				this.isClosed = true
				let promise = this.tim.logout();
				promise.then(function(imResponse) {
					console.log(imResponse); // 登出成功
				}).catch(function(imError) {
					console.warn('logout error:', imError);
				})
			},

			// 获取讲解商品信息
			getExplainGoods(val) {
				this.$u.post('/api/v1/goods/detail/summary', {
					userID: uni.getStorageSync("userInfo").id,
					GoodsID: val
				}).then((res) => {
					let data = res.data.data
					let obj = {
						id: data.id,
						goodsName: data.goodsName,
						url: data.mainPhotos[0].url,
						price: String(data.price.min.discountPrice)
					}
					this.goodsInfo = obj
					this.isExplain = true
				})
			},
			// 获取群资料 包括 群人数
			getGroupInfo() {
				let that = this
				let promise = this.tim.getGroupProfile({
					groupID: this.videoDetail.groupId
				});
				promise.then(function(imResponse) {
					that.groupInfo = imResponse.data.group
				}).catch(function(imError) {
					console.warn('getGroupProfile error:', imError); // 获取群详细资料失败的相关信息
				});
			},
			// 获取 群成员信息
			getGroupMemberInfo() {
				let that = this
				let promise = this.tim.getGroupMemberList({
					groupID: this.videoDetail.groupId,
					count: 30,
					offset: this.page
				}); // 从0开始拉取30个群成员
				promise.then(function(imResponse) {
					if (!that.isGroup) {
						that.memberList = []
						imResponse.data.memberList && imResponse.data.memberList.forEach((item) => {
							if (item.role !== 'Owner') {
								that.memberList.push(item)
							}
						})
					} else {
						imResponse.data.memberList && imResponse.data.memberList.forEach((item) => {
							if (item.role !== 'Owner') {
								that.memberList.push(item)
							}
						})
					}

				}).catch(function(imError) {
					console.warn('getGroupMemberList error:', imError);
				});
			},
			// 加入
			async join() {
				let that = this
				let promise = this.tim.joinGroup({
					groupID: this.videoDetail.groupId,
					type: TIM.TYPES.GRP_AVCHATROOM
				});
				await promise.then(function(imResponse) {
					console.log("加入直播间：imResponse返回")
					console.log(imResponse)
					switch (imResponse.data.status) {
						case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
							break;
						case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
							// let obj = {
							// 	name: uni.getStorageSync("userInfo").nickname,
							// 	type: 0,
							// 	content: '来了'
							// }
							// that.contentList.push(obj)
							that.getGroupInfo()
							that.getGroupMemberInfo()
							console.log(imResponse.data.group); // 加入的群组资料
							break;
						case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
							break;
						default:
							break;
					}
				}).catch(function(imError) {
					console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
				})
			},
			// 发送消息
			toSend(val) {
				let that = this
				console.log("发送消息内容：")
				console.log(this.content)
				if (this.content) {
					let message = this.tim.createTextMessage({
						to: this.videoDetail.groupId,
						conversationType: TIM.TYPES.CONV_GROUP,
						payload: {
							text: String(this.content)
						}
					})
					this.tim.sendMessage(message).then(function(imResponse) {
						// 发送成功
						let obj = {
							name: uni.getStorageSync("userInfo").nickname,
							type: 0,
							content: String(that.content)
						}
						that.contentList.push(obj)
						that.content = ''
						console.log(imResponse);
					}).catch(function(imError) {
						// 发送失败
						console.warn('sendMessage error:', imError);
					});
				}
			},
			// 会话 列表 暂时没用
			getMessageList() {
				// 打开某个会话时，第一次拉取消息列表
				let promise = this.tim.getMessageList({
					conversationID: 'GROUP' + this.videoDetail.groupId,
					count: 15
				});
				promise.then(function(imResponse) {
					console.log(imResponse)
					const messageList = imResponse.data.messageList; // 消息列表。
					const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
					const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				});
				// 下拉查看更多消息
				// let promise = tim.getMessageList({conversationID: res.data.data.identifier, nextReqMessageID, count: 15});
				// promise.then(function(imResponse) {
				//   const messageList = imResponse.data.messageList; // 消息列表。
				//   const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
				//   const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				// });
			},
			// 清屏
			clear() {
				this.contentList = []
				this.isClear = false
			},
			// 举报
			report(){
				this.isClear = false
				this.isReport = true
			},
			toReport(){
				this.reportContent = null
				this.$u.toast("举报成功！");
				return
			},
			// 获取直播信息
			getDetail() {
				if (this.isLive) {
					this.$u.post("/api/v1/live/live/live_info", {
						id: this.id
					}).then(res => {
						res.data.data.goodsLists.forEach((item) => {
							if (item.isExplain == 1) {
								let obj = {
									id: item.id,
									goodsName: item.goodsName,
									url: item.mainPhotoUrl,
									price: String(item.discountPrice)
								}
								this.goodsInfo = obj
								this.isExplain = true
							}
						})
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.videoDetail = res.data.data
						wx.enableAlertBeforeUnload({
							message: "是否确认离开直播间？",
							success: function(res) {
								console.log("方法注册成功：", res);
							},
							fail: function(errMsg) {
								console.log("方法注册失败：", errMsg);
							},
						});
						this.createdLive()
					});
				} else {
					this.$u.post("/api/v1/live/live/video_info", {
						id: this.id
					}).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.videoDetail = res.data.data
					});
				}


			},
			// 返回
			back() {
				// let promise = this.tim.logout()
				// promise.then(function(imResponse) {
				//   console.log(imResponse.data) // 登出成功
				// }).catch(function(imError) {
				//   console.warn('logout error:', imError)
				// })
				if(getCurrentPages().length>1){
				uni.navigateBack()
					return
				}
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			toUserHomePage(id, isFollow) {
				uni.navigateTo({
					url: "/packageA/userHomePage/userHomePage?userId=" + id + "&isFollow=" + isFollow
				})
			},
			toGoodsDetail(id) {
				// let promise = this.tim.logout()
				// promise.then(function(imResponse) {
				//   console.log(imResponse.data); // 登出成功
				// }).catch(function(imError) {
				//   console.warn('logout error:', imError)
				// });
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?id=" + id
				})
			},
			//添加关注
			addFollow() {
				this.$u.post('/api/v1/live/user/follow/add', {
					followUserId: this.videoDetail.userId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.$u.toast("关注成功");
					// this.videoDetail.isFollow==1
					this.$set(this.videoDetail, 'isFollow', 1)

				});
			},
			// 点赞
			thumbsUp() {
				this.count++
				this.likeClick()
				clearTimeout(this.time)
				this.time = setTimeout(() => {
					this.$u.post('/api/v1/live/live/praise/add', {
						liveItemId: this.id,
						praise: this.count,//
						praise:1
					}).then(res => {
						console.log(res);
					});
				}, 100)
			},
			// 点赞动画
			likeClick() {
				const image = '../../static/love.png';
				const anmationData = {
					id: new Date().getTime(),
					timer: 0,
					opacity: 0.5,
					pathData: this.generatePathData(),
					image: image,
					factor: {
						speed: 0.004, // 运动速度，值越小越慢
						t: 0 //  贝塞尔函数系数
					}
				};
				if (Object.keys(this.queue).length > 0) {
					this.queue[anmationData.id] = anmationData;
				} else {
					this.queue[anmationData.id] = anmationData;
					this.bubbleAnimate();
				}
				console.log(this.queue)
			},

			/**获取最大最小随机值 */
			getRandom(min, max) {
				return Math.random() * (max - min) + min;
			},

			/**获取图片路径 */
			generatePathData() {
				let width = this.width
				let height = this.height
				const p0 = {
					x: 0.65 * width,
					y: height
				};
				const p1 = {
					x: this.getRandom(0.22 * width, 0.33 * width),
					y: this.getRandom(0.5 * height, 0.75 * height)
				};
				const p2 = {
					x: this.getRandom(0, 0.88 * width),
					y: this.getRandom(0.25 * height, 0.5 * height)
				};
				const p3 = {
					x: this.getRandom(0, 0.88 * width),
					y: this.getRandom(0, 0.125 * height)
				};
				return [p0, p1, p2, p3];
			},

			/**更新图片的最新运动路径 */
			updatePath(data, factor) {
				const p0 = data[0];
				const p1 = data[1];
				const p2 = data[2];
				const p3 = data[3];

				const t = factor.t;

				/*计算多项式系数 （下同）*/
				const cx1 = 3 * (p1.x - p0.x);
				const bx1 = 3 * (p2.x - p1.x) - cx1;
				const ax1 = p3.x - p0.x - cx1 - bx1;

				const cy1 = 3 * (p1.y - p0.y);
				const by1 = 3 * (p2.y - p1.y) - cy1;
				const ay1 = p3.y - p0.y - cy1 - by1;

				const x = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p0.x;
				const y = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p0.y;
				return {
					x,
					y
				};
			},

			/**点赞动画 */
			bubbleAnimate() {
				let width = this.width
				let height = this.height
				Object.keys(this.queue).forEach(key => {
					const anmationData = this.queue[+key];
					const {
						x,
						y
					} = this.updatePath(
						anmationData.pathData,
						anmationData.factor
					);
					const speed = anmationData.factor.speed;
					anmationData.factor.t += speed;

					var curWidth = 30;
					curWidth = (height - y) / 1.5;
					curWidth = Math.min(30, curWidth);

					var curAlpha = anmationData.opacity;
					curAlpha = y / height;
					curAlpha = Math.min(1, curAlpha);
					this.ctx.globalAlpha = 1;
					this.ctx.drawImage(anmationData.image, x - curWidth / 2, y, curWidth, curWidth);
					if (anmationData.factor.t > 1) {
						delete this.queue[anmationData.id];
					}
					if (y > height) {
						delete this.queue[anmationData.id];
					}

				});
				this.ctx.draw();
				if (Object.keys(this.queue).length > 0) {
					this.timer = setTimeout(() => {
						this.bubbleAnimate();
					}, 5);
				} else {
					clearTimeout(this.timer);
					this.ctx.draw(); // 清空画面
				}
			},

			// 判断头像
			judgeCover(val) {
				if(!val){
					return
				}
				let arr = val.split('/')
				if (arr[0] === 'http:' || arr[0] === 'https:') {
					return val
				}
				return this.IMAGE_URL + val
			},
			shopping(val) {
				this.goodsId = val
				this.showSpecs = true
			},
			// 分享
			onShareAppMessage(res) {
				return {
					title: "好友" + this.videoDetail.nickname + "正在左家右厨直播,快来看看吧！",
					path: '/packageA/livePlayback/livePlayback?id=' + this.id + "&isLive=" + this.isLive,
					imageUrl: this.IMAGE_URL + this.videoDetail.headImgUrl
				}
			}
		}
	}
</script>

<style lang="scss">
	.noStyleButton{
		background: none;		
	}
	.noStyleButton::after{
	  border: none;
	}
	.red {
		color: red;
	}

	page {
		background-color: #000000;
	}

	.container {
		position: fixed;
		height: 100vh;
		width: 100vw;
	}

	.top-box {
		position: fixed;
		width: 100%;
		top: 0;
		background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
		z-index: 100;

	}

	.top-con {
		width: 100%;
		padding: 0px 20px;

		.top-left {
			padding: 10rpx;
			overflow: hidden;
			background-color: rgba(0, 0, 0, 0.3);

			.avatar {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.user-info {
				margin: 0 15rpx;
				line-height: 35rpx;
			}

			.avatar {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.user-info {
				margin: 0 15rpx;
				line-height: 35rpx;
			}
		}

		.btn {
			height: 50rpx;
			line-height: 50rpx;
			padding: 0 20rpx;
			text-align: center;
			font-size: 26rpx;
		}
	}

	.videoBox {
		width: 100%;
		height: 100vh;
	}

	.video {
		width: 100%;
		height: 100%;
	}

	.bottom {
		padding: 0 0 40rpx;

		.goods-num {
			position: absolute;
			width: 100%;
			bottom: 10rpx;
			color: #FFFFFF;
		}
	}

	.goods-container {
		background-color: white;
		padding: 30rpx 25rpx;

		.item {
			margin: 20rpx 0;
			padding-bottom: 20px;
			margin-right: 20px;

			.item-con {
				.goods-pic {
					width: 200rpx;
					height: 200rpx;
					margin-right: 15rpx;
					border-radius: 10rpx;
					overflow: hidden;
					position: relative;

					.no {
						position: absolute;
						left: 0;
						top: 0;
						line-height: 26rpx;
						font-size: 18rpx;
						color: #FFFFFF;
						text-align: center;
						width: 50rpx;
						background-color: rgba(0, 0, 0, 0.3);
						border-top-left-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
					}

					.explain {
						position: absolute;
						width: 100%;
						left: 0;
						bottom: 0;
						line-height: 26rpx;
						font-size: 18rpx;
						color: #FFFFFF;
						text-align: center;
						background-color: #EB4E6E;
					}
				}

				.goods-con {
					.goods-name {
						font-weight: 700;
						margin-bottom: 5rpx;
					}

					.goods-remark {
						color: #AAAAAA;
						font-size: 24rpx;
					}

					.goods-brand {
						color: #EB4E6E;
						font-size: 24rpx;
						display: flex;
						align-items: center;

						image {
							width: 20rpx;
							height: 20rpx;
						}

						text {
							margin-left: 10rpx;
						}
					}

					.goods-commission {
						margin-left: 10rpx;
						color: #EB4E6E;
						font-size: 24rpx;
						border: 1px solid #EB4E6E;
					}

					.coupon {
						position: relative;

						image {
							height: 35rpx;
							width: auto;
						}

						.cimage {
							height: 35rpx;
							width: auto;
						}

						.coupon-price {
							position: absolute;
							line-height: 35rpx;
							top: 0;
							width: 100%;
							left: 0;
							font-size: 24rpx;
							text-align: center;
						}
					}

					.goods-store {
						justify-content: flex-end;
						font-size: 20rpx;
						display: flex;
						align-items: center;
						// cover-view{
						// 	display: inline-block;
						// }
					}
				}

				.right-bottom {
					margin-top: 5rpx;
					flex-grow: 1;

					.buy {
						padding: 0 20rpx;
					}

					.text {
						width: auto;
						height: 100%;
					}
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	.container {
		cover-view {
			line-height: normal;
			height: auto;
			// overflow: auto;
		}

		.center {
			text-align: center;
		}

		.bottom-box {
			padding-top: 10px;
			background: white;
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			bottom: 0px;
			width: 100%;
			height: 40%;
		}

		.chatContent {
			background: rgba(0, 0, 0, 0.1);
			font-size: 13px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: white;
			border-radius: 16px;
			margin-bottom: 9px;
			word-wrap: break-word;
			word-break: break-all;
			white-space: pre-line;

			.name {
				color: #97DCF7;
			}
		}

		.join {
			background: rgba(255, 0, 0, 0.1);
		}

		.like-fx {
			position: fixed;
			right: 60px;
			bottom: 50px;
		}

		/deep/ .memberPopup {
			.u-drawer-content {
				background: none;

				.list {
					padding: 0px 20px;
					margin-bottom: 10px;
					color: white;
					font-size: 12px;
				}
			}
		}

		.goodsBox {
			z-index: 99;
			width: 110px;
			position: absolute;
			bottom: 80px;
			right: 20px;

			.tips {
				background: #DEF0FA;
				border-radius: 4px 4px 0px 0px;
				font-size: 11px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #0091FF;
				line-height: 16px;
			}

			.goodsName {
				position: absolute;
				bottom: 5px;
				left: 0px;
				width: 100%;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.priceBox {
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				margin-top: 5px;
			}
		}

		.liveClosed {
			position: absolute;
			background: #232323;
			font-size: 20px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;

			.followBtn {
				background: #DB2D2D;
				border-radius: 22px;
				width: 209px;
				height: 40px;
				margin: 50px 0px 16px;
			}

			.exitIcon {
				position: fixed;
				right: 30px;
				top: 80px;
				width: 30px;
				height: 30px;
			}
		}

		.spec-box {
			padding: 30rpx;

			.spec-top {
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f1f1f1;

				.goods-pic {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}
			}

			.spec-con {
				.spec-title {
					line-height: 80rpx;
				}

				.spec-item {
					border: 2rpx solid transparent;
					background-color: #f1f1f1;
					color: #000;
					border-radius: 8rpx;
					margin: 10rpx 0;
					margin-right: 20rpx;
					padding: 0 25rpx;
					font-size: 26rpx;
					line-height: 50rpx;
				}

				.spec-checked {
					background-color: rgba(201, 34, 25, 0.05);
					color: red;
					border: 2rpx solid red;
				}

				.noneActive {
					background-color: #f9f9f9;
					color: #ddd;
					border: 2rpx solid transparent;
					pointer-events: none;
				}
			}

			.goods-num-box {
				height: 100rpx;
				margin-top: 50rpx;
			}
		}

		.spec-btn-box {
			padding: 20rpx 30rpx;
			font-size: 32rpx;

			view {
				height: 80rpx;
				line-height: 80rpx;

				&:first-child {
					border-top-left-radius: 40rpx;
					border-bottom-left-radius: 40rpx;
					background-image: linear-gradient(to right, #787978, #5d5e5d);
				}

				&:last-child {
					border-top-right-radius: 40rpx;
					border-bottom-right-radius: 40rpx;
					background-image: linear-gradient(to right, #c6193d, #ff3456);
				}
			}
		}

	}
</style>
