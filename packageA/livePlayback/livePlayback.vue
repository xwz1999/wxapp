<template>
	<view class="flex flex-direction container">
		<view class="top-box">
			<u-navbar :is-fixed="false" :is-back="false" background="transparent" :border-bottom="false"></u-navbar>
			<view class="flex justify-between text-white align-center top-con">
				<view class="flex align-center top-left round">
					<view class="avatar">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+videoDetail.headImgUrl" :index="index" height="70" border-radius="35"
						 :error-img="IMAGE_URL + '/null05.png'"  @click="toUserHomePage(videoDetail.userId,videoDetail.isFollow)"></u-lazy-load>
					</view>
					<view class="user-info">
						<view style="font-size: 26rpx;">{{videoDetail.nickname}}</view>
						<view style="font-size: 20rpx;">点赞数 {{videoDetail.praise}}</view>
					</view>
					<view class="btn round bg-red shadow" v-if="videoDetail.isFollow==0" @tap="addFollow">+关注</view>
				</view>
				<text class="cuIcon-close" style="font-size: 48rpx;" @tap="back"></text>
			</view>
		</view>
		<live-player v-if="isLive" class="video flex-sub" :src="videoDetail.playUrl" mode="RTC" autoplay/>
		<video v-else  class="video flex-sub" :src="videoDetail.playUrl" controls></video>
		<view class="flex justify-between align-end bottom">
			<image :src="IMAGE_URL + '/shop/more.png'" style="width: 60rpx;" mode="widthFix"></image>
			<view class="" style="position: relative;" @tap="isShow = true">
				<image :src="IMAGE_URL + '/shop/pack.png'" style="width: 90rpx;" mode="widthFix"></image>
				<view class="text-center goods-num">{{videoDetail.goodsLists.length}}</view>
			</view>
		</view>
		<!-- <u-popup v-model="isShow" mode="bottom" border-radius="20" height="60%">
			<view class="goods-container">
				<view class="item" v-for="(item,index) in videoDetail.goodsLists" :key="index">
					<view class="item-con flex justify-between">
						<view class="goods-pic">
							<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" height="200" border-radius="10" :error-img="IMAGE_URL + '/null05.png'"  @click="toGoodsDetail(item.id)"></u-lazy-load>
							<view class="no">{{index+1}}</view>
						</view>
						<view class="goods-con flex-sub flex flex-direction justify-between">
							<view class="">
								<view class="goods-name two-line">{{item.goodsName}}</view>
								<view class="goods-remark">{{item.description}}</view>
							</view>
							<view class="">
								<view class="flex justify-between">
									<view class="coupon text-white">
										<image :src="IMAGE_URL+'/tic.png'" mode="heightFix"></image>
										<view class="coupon-price">{{item.coupon}}元券</view>
									</view>
									<view class="goods-store">剩余<text class="text-red">{{item.inventory}}</text>件</view>
								</view>
								<view class="right-bottom flex justify-between align-end">
									<view class="flex align-end" style="font-size: 24rpx;">
										<text class="text-orange">券后</text>
										<text class="text-red">￥</text>
										<text class="text-red" style="font-size: 36rpx;line-height: 36rpx;font-weight: 700;">85</text> 
										<text class="text-gray" style="text-decoration: line-through;margin-left: 10rpx;">￥125</text>
									</view>
									<view class="text-white bg-red round shadow buy" @tap="toGoodsDetail(item.id)">马上抢</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup> -->
		
		<u-popup v-model="isShow" mode="bottom" border-radius="20" height="60%">
			<cover-view class="goods-container">
				<cover-view class="item" v-for="(item,index) in videoDetail.goodsLists" :key="index">
					<cover-view class="item-con flex justify-between">
						<cover-view class="goods-pic">
							<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" height="200" border-radius="10" :error-img="IMAGE_URL + '/null05.png'"  @click="toGoodsDetail(item.id)"></u-lazy-load>
							<cover-view class="no">{{index+1}}</cover-view>
						</cover-view>
						<cover-view class="goods-con flex-sub flex flex-direction justify-between">
							<cover-view class="">
								<cover-view class="goods-name two-line" style="width:95%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto;">{{item.goodsName}}</cover-view>
								<cover-view class="goods-remark">{{item.description}}</cover-view>
							</cover-view>
							<cover-view class="">
								<cover-view class="flex justify-between">
									<cover-view class="coupon text-white">
										<cover-image class='cimage' style='width: 51.9444px;' :src="IMAGE_URL+'/tic.png'" mode="heightFix"></cover-image>
										<cover-view class="coupon-price">{{item.coupon}}元券</cover-view>
									</cover-view>
									<cover-view class="goods-store">
										剩余
										<cover-view class="text-red">{{item.inventory}}</cover-view>
										件
									</cover-view>
								</cover-view>
								<cover-view class="right-bottom flex justify-between align-end">
									<cover-view class="flex align-end" style="font-size: 24rpx;">
										<cover-view class="text-orange">券后</cover-view>
										<cover-view class="text-red">￥</cover-view>
										<cover-view class="text-red" style="font-size: 36rpx;line-height: 36rpx;font-weight: 700;">{{item.discountPrice}}</cover-view> 
										<cover-view class="text-gray" style="text-decoration: line-through;margin-left: 10rpx;">￥{{item.originalPrice}}</cover-view>
									</cover-view>
									<cover-view class="text-white bg-red round shadow buy" @tap="toGoodsDetail(item.id)">马上抢</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
		</u-popup>
		
	</view>
</template>

<script>
	import TIM from 'tim-wx-sdk'//小程序环境
	export default {
		data() {
			return {
				tim: '',
				IMAGE_URL:this.IMAGE_URL,
				id: 0,
				videoDetail: null,
				isShow:false,
				isLive:0, //是否是直播
			};
		},
		onHide() {
			console.log('21333333333333333')
		},
		onLoad(options) {
			console.log(options)
			if (options.id) {
				this.id = parseInt(options.id)
				this.isLive = parseInt(options.isLive)
				if(this.isLive){
					wx.enableAlertBeforeUnload({
					  message: "是否确认离开直播间？",
					  success: function (res) {
						console.log("方法注册成功：", res);
					  },
					  fail: function (errMsg) {
						console.log("方法注册失败：", errMsg);
					  },
					});
					// this.createdLive()
				}
				this.getDetail()
			}
		},
		destroyed() {
			let promise = this.tim.logout();
			promise.then(function(imResponse) {
			  console.log(imResponse.data); // 登出成功
			}).catch(function(imError) {
			  console.warn('logout error:', imError);
			})
		},
		methods: {
			async createdLive () {
				let options = {
				    SDKAppID: 1400435566
				}
				// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
				this.tim = TIM.create(options) // SDK 实例通常用 tim 表示
				// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
				// tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
				this.tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
				// 注册腾讯云即时通信 IM 上传插件
				// tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});

				let that = this
				this.tim.on(TIM.EVENT.SDK_READY, async function (event) {
					await that.join()
					console.log('SDK_READY')
					
					that.getMessageList()
					// that.globalData.isImLogin = true
					// wx.setStorageSync('isImLogin', true)
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					// event.name - TIM.EVENT.SDK_READY
				});
				
				await this.$u.post("/api/v1/live/live/im/login_info").then(res => {
					if (res.data.code == "FAIL") {
						return
					}
					let promise = this.tim.login({userID: res.data.data.identifier, userSig: res.data.data.sign});
					promise.then(function(imResponse) {
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
			async join () {
				let promise = this.tim.joinGroup({ groupID: this.videoDetail.groupId, type: TIM.TYPES.GRP_AVCHATROOM });
				await promise.then(function(imResponse) {
				  switch (imResponse.data.status) {
				    case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
				      break;
				    case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
				      console.log(imResponse.data.group); // 加入的群组资料
				      break;
				    case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
				      break;
				    default:
				      break;
				  }
				}).catch(function(imError){
				  console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
				})
			},
			// 发送消息
			sendMessage (val) {
				let message = this.tim.createTextMessage({
					to: this.videoDetail.groupId,
					conversationType: TIM.TYPES.CONV_GROUP,
					payload: {
						text: val
					}
				})
				console.log(message)
				this.tim.sendMessage(message).then(function(imResponse) {
					// 发送成功
					console.log(imResponse);
				}).catch(function(imError) {
					// 发送失败
					console.warn('sendMessage error:', imError);
				});
			},
			getMessageList () {
				// 打开某个会话时，第一次拉取消息列表
				let promise = this.tim.getMessageList({conversationID: 'GROUP' + this.videoDetail.groupId, count: 15});
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
			getDetail() {
				if(this.isLive){
					this.$u.post("/api/v1/live/live/live_info", {
						id: this.id
					}).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.videoDetail = res.data.data
					});
				}else{
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
			back() {
				// let promise = this.tim.logout()
				// promise.then(function(imResponse) {
				//   console.log(imResponse.data) // 登出成功
				// }).catch(function(imError) {
				//   console.warn('logout error:', imError)
				// })
				uni.navigateBack()
			},
			toUserHomePage(id,isFollow) {
				uni.navigateTo({
					url: "/pages/userHomePage/userHomePage?userId=" + id+"&isFollow="+isFollow
				})
			},
			toGoodsDetail(id){
				// let promise = this.tim.logout()
				// promise.then(function(imResponse) {
				//   console.log(imResponse.data); // 登出成功
				// }).catch(function(imError) {
				//   console.warn('logout error:', imError)
				// });
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?id="+id
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
					this.$set(this.videoDetail,'isFollow', 1 )
				});
			}
		},
	}
</script>

<style lang="scss">
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

		.top-con {
			padding: 0 30rpx;

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
	}

	.video {
		width: 100%;
	}

	.bottom {
		padding: 0 30rpx 30rpx;
		height: 120rpx;
		.goods-num{
			position: absolute;width: 100%;
			bottom: 10rpx;
			color: #FFFFFF;
		}
	}
	.goods-container{
		padding: 30rpx 25rpx;
		.item{
			margin: 20rpx 0;
			.item-con{
				.goods-pic{
					width: 200rpx;
					height: 200rpx;
					margin-right: 15rpx;
					border-radius: 10rpx;
					overflow: hidden;
					position: relative;
					.no{
						position: absolute;
						left: 0;
						top: 0;
						line-height: 26rpx;
						font-size: 18rpx;
						color: #FFFFFF;
						text-align: center;
						width: 50rpx;
						background-color: rgba(0,0,0,0.3);
						border-top-left-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
					}
				}
				.goods-con{
					.goods-name{
						font-weight: 700;
						margin-bottom: 5rpx;
					}
					.goods-remark{
						color: #AAAAAA;
						font-size: 24rpx;
					}
					.coupon{
						position: relative;
						image{
							height: 35rpx;
							width: auto;
						}
						.cimage{
							height: 35rpx;
							width: auto;
						}
						.coupon-price{
							position: absolute;
							line-height: 35rpx;
							top: 0;
							width: 100%;
							left: 0;
							font-size: 24rpx;
							text-align: center;
						}
					}
					.goods-store{
						line-height: 40rpx;
						font-size: 20rpx;
						display: flex;
						align-items: center;
						cover-view{
							display: inline-block;
						}
					}
				}
				.right-bottom{
					margin-top: 5rpx;
					.buy{
						padding: 0 20rpx;
					}
				}
			}
		}
	}
</style>
