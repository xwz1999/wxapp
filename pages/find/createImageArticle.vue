<template>
	<view>
		<view class="addImageArticle">
			<view class="textArea">
				<u-input u-model="value" type="textarea" height="400" placeholder="有什么想法就和大家说说吧!" maxlength="200"
					@input="textIn">
				</u-input>
				<text>{{textCurLength}}/{{textMaxLength}}</text>
			</view>
			<u-upload v-if="_type==1" ref="uUpload" :action="BASE_URL+upload_url" :auto-upload="true"
				@on-Success="success" @on-remove="remove" name="photo"></u-upload>
			<view v-else-if="_type==2" class="videoArea" @click="uploadVideo">
				<!-- <image v-if="coverFile" :src="coverFile.tempFilePaths[0]" ></image> -->
				<video v-if="videoFile" :src="videoFile.tempFilePath"></video>
				<image v-else class="" :src="IMAGE_URL+ '/wxapp/uni-program/icon/delete.png'"></image>
			</view>
		</view>
		<u-collapse v-if="_type==2">
			<u-collapse-item class="collaspe">
				<view slot="title" style="display: flex;">
					<image class="icon" :src="IMAGE_URL + '/wxapp/uni-program/icon/topic.png'" mode=""></image>
					<text style="margin-left: 16rpx;">{{topic?topic.title:'添加话题（推荐）'}}</text>
				</view>
				<view class="addTopic">
					<image class="icon" :src="IMAGE_URL + '/wxapp/uni-program/icon/topic.png'" mode=""></image>
					<u-input class="input" v-model="value" placeholder="创建你的话题" @confirm="createTopic" />
				</view>
				<view class="hot">热门话题</view>
				<scroll-view scroll-y="true" style="height: 400rpx;">
					<view class="topic" v-for="(item, index) in topicList" :data-topic="item" @click="selTopic">
						<image class="iconMini" :src="IMAGE_URL + '/wxapp/uni-program/icon/topic.png'" mode=""></image>
						<view class="info">
							<view class="title">{{item.title}}</view>
							<view class="des">
								<text>{{item.partake}}人参与｜共{{item.substance}}条内容</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</u-collapse-item>
		</u-collapse>
<!-- 		<view class="addPastGoods" @click="show=true">
			<view class="left">
				<image :src="IMAGE_URL + '/wxapp/uni-program/icon/upload_cart.png'" mode=""></image>
				<text>{{goodsInfo?goodsInfo.goodsName:'添加关联产品'}}</text>
			</view>
			<image :src="IMAGE_URL + '/wxapp/uni-program/icon/next.png'" mode=""></image>
		</view> -->
		<button v-if="_type == 1" class="bg-red cu-btn text-white lg block" style="margin: 25rpx;" @click="create">发布</button> <!-- ||!uploadPicLists -->
		<button v-if="_type == 2" class="bg-red cu-btn text-white lg block" style="margin: 25rpx;" @click="createVideo"
			:disabled="!text||!goodsInfo||!videoFile">发布</button>
		<u-popup class="pop" v-model="show" mode="bottom" @close="closePop" safe-area-inset-bottom="true"
			border-radius="10" height="60vh">
			<view class="title">最近购买的商品</view>
			<view v-if="isNull" class="null flex flex-direction justify-center align-center">
				<image :src="IMAGE_URL + '/wxapp/null05.png'" style="width: 300rpx;" mode="widthFix"></image>
				<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无商品</view>
			</view>
			<scroll-view v-else class="flex-sub" scroll-y="true" style="height: 60vh;" @scrolltolower="getGoodsList">
				<view class="goods-box">
					<!-- 单行排列方式 -->
					<goods-list v-if="isBlock" situation=1 @setGoodsInfo="setGoodsInfo" :goodsList="goodsList">
					</goods-list>
					<!-- 缩略图排列方式 -->
					<large-image-list v-else :goodsList="goodsList"></large-image-list>
				</view>
				<u-loadmore :status="loadStatus" margin-bottom="40" />
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	const VodUploader = require('@/node_modules/vod-wx-sdk-v2/demo/lib/vod-wx-sdk-v2.js');
	import largeImageList from '@/components/largeImageList.vue'
	export default {

		data() {
			return {
				_type: 1, // 1.图文 2.视频
				text: null,
				BASE_URL: this.BASE_URL,
				IMAGE_URL: this.IMAGE_URL,
				upload_url: '/api/v1/files/photo/upload',
				textMaxLength: 200,
				textCurLength: 0,
				uploadPicLists: [],
				fileName: "",
				videoFile: null,
				coverFile: null,
				progress: 0,
				uploader: null,
				signature: null,
				show: false,
				topicList: [],
				goodsList: [],
				page: 1,
				stopLoad: false,
				loadStatus: "loadmore", //触底加载状态,
				isBlock: true,
				isNull: false,
				topic: null,
				goodsInfo: null
			}
		},
		components: {
			largeImageList
		},
		onLoad(options) {
			if (options._type) {
				let _type = options._type
				this._type = _type
				if (_type == 2) {
					uni.setNavigationBarTitle({
					　　title:"发布视频"
					})
					this.uploadVideo()
					this.getTopicList()
				}
			}
			this.getGoodsList()
		},
		methods: {

			startUpload() {
				wx.showLoading({
					title: '处理中',
					mask: true,
				})
				const self = this;
				const uploader = VodUploader.start({
					mediaFile: self.videoFile, //必填，把chooseVideo回调的参数(file)传进来
					getSignature: self.getSignature,
					coverFile: self.coverFile, // 选填，视频封面
					error: function(result) {
						console.log("error");
						console.log(result);
						wx.hideLoading();
						wx.showModal({
							title: "上传失败",
							content: JSON.stringify(result),
							showCancel: false
						});
					},
					progress: function(result) {
						console.log("progress");
						console.log(result);
						//  wx.hideLoading();
						self.setData({
							progress: parseInt(result.percent * 100)
						})
						// wx.showLoading({
						//   title: "上传中 " + result.percent * 100 + "%"
						// });
					},
					finish: function(result) {
						console.log("finish");
						console.log(result);
						// wx.hideLoading();
						// wx.showModal({
						// 	title: "上传成功",
						// 	content: "fileId:" + result.fileId + "\nvideoName:" + result.videoName,
						// 	showCancel: false
						// });
						let data = {
							content:self.text,
							fileId:result.fileId,
							topicId:self.topic.id,
							userId:uni.getStorageSync("userInfo").id,
							goodsId : self.goodsInfo.id
						}
						self.$u.post('/api/v1/live/short/publish',data).then(res=>{
							if (res.data.code == "FAIL") {
								self.$u.toast(res.data.msg);
								return
							}
							self.$u.toast(res.data.msg)
							setTimeout(() => {
								uni.navigateBack({})
							}, 1000)
						})
						self.reset();
					}
				});
				this.uploader = uploader
			},
			reset() {
				this.videoFile = null
				this.coverFile = null
				this.uploader = null
				this.progress = 0
			},
			cancelUpload() {
				this.uploader.cancel();
			},
			resumeUpload() {
				this.uploader.start();
			},
			//  图片上传成功
			success(data, index, lists, name) {
				this.uploadPicLists = lists
			},
			// 图片删除成功
			remove(index, lists, name) {
				this.uploadPicLists = lists
			},
			// 上传视频
			uploadVideo() {
				let _this = this
				uni.chooseVideo({
					success: (response) => {
						this.videoFile = response
						uni.showModal({
							content: "是否添加视频封面",
							success(res) {
								if (res.confirm) {
									_this.uploadVideoCoverImg()
								}
							}
						})
					}
				})
			},
			uploadVideoCoverImg() {
				uni.chooseImage({
					sourceType: ["album", "camera"],
					count: 1,
					success: (response) => {
						console.log(response)
						this.coverFile = response
					}
				})

			},
			getSignature(callback) {
				wx.request({
					url: this.BASE_URL + '/api/v1/live/short/upload_sign',
					method: 'POST',
					header: {
						"X-Recook-ID": uni.getStorageSync('auth').id,
						"X-Recook-Token": uni.getStorageSync('auth').token,
						"Device-Type": "wxapp",
						"X-Recook-System": 'wxapp',
						"X-Recook-version": "32"
					},
					success(res) {
						callback(res.data.data.data.sign)
					}
				})
				// this.$u.post('/api/v1/live/short/upload_sign').then(res=>{
				// 	if (res.data.code == "FAIL") {
				// 		this.$u.toast(res.data.msg);
				// 		return
				// 	}
				// 	 this.signature = res.data.data.sign
				// 	 console.log(a)
				// 	 a = res.data.data.sign
				// 	 					 console.log(a)
				// })
				// console.log(a)
				// debugger
				// return a 
			},
			textIn(value) {
				this.textCurLength = value.length
				this.text = value
			},
			createTopic(value) {
				console.log(value);
				this.$u.post('/api/v1/live/topic/add',{title:value}).then(res=>{
					if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
					let topic = {}
					topic.title=value
					topic.id = res.data.data.topicId
					this.topic = topic
				})
				
			},
			selTopic(e) {
				this.topic = e.currentTarget.dataset.topic

			},
			// 获取热门话题
			getTopicList() {
				this.$u.post('/api/v1/live/topic/hot').then(res => {
					this.topicList = res.data.data
				})
			},
			// 获取历史订单
			getGoodsList() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				let data = {
					limit: 20,
					page: this.page
				}
				this.$u.post('/api/v1/live/order/history', data).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let goodsList = res.data.data.list
					// console.log(goodsList)
					this.page++
					if (goodsList == null || goodsList.length == 0) {
						this.loadStatus = "nomore"
						this.stopLoad = true
						if (this.page == 1) {
							this.isNull = true
						}
						return
					}
					//为了防止第一页商品数量不够时scrollview不能触底导致底部一直显示正在加载
					if (goodsList.length < 5) {
						this.loadStatus = "nomore"
					}
					for (let i = 0; i < goodsList.length; i++) {
						goodsList[i].totalSalesVolume = goodsList[i].salesVolume
						goodsList[i].price = goodsList[i].discountPrice
						goodsList[i].primePrice = goodsList[i].originalPrice
						goodsList[i].goodsId = goodsList[i].id
					}
					this.goodsList.push(...goodsList)
				});
			},
			closePop() {
				this.page = 1
			},
			setGoodsInfo(item) {
				this.goodsInfo = item
				this.show = false
			},
			create() {
				
				let userId = uni.getStorageSync("userInfo").id
				//let goodsId = this.goodsInfo.id
				let text = this.text
				let images = []
				if(images!=[]&&text!=''){
					this.uploadPicLists.forEach((item) => {
						let picInfo = {
							path: item.response.data.data.url
						}
						images.push(picInfo)
					})
					let data = {
						userId,
						//goodsId,
						text,
						images
					}
					console.log(data)
					this.$u.post('/api/v1/moment_copy/create', data).then(res => {
						console.log(res)
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.$u.toast(res.data.msg)
						setTimeout(() => {
							uni.navigateBack({})
						}, 1000)
					})
				}else{
					this.$u.toast('请先添加您的想法');
				}
			
			},
			createVideo(){
				this.startUpload()
			}
		}
	}
</script>

<style lang="scss">
	.addImageArticle {
		background: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;

		.textArea {
			position: relative;
		}

		.videoArea {
			width: 200rpx;
			height: 200rpx;
			overflow: hidden;
			margin: 10rpx;
			background: #f4f5f6;
			position: relative;
			border-radius: 10rpx;

			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #606266;
			font-size: 26rpx;
		}

		text {
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			color: #c0c4cc;
		}
	}

	.addPastGoods {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		background: #fff;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 32rpx;
				height: 32rpx;
				flex-shrink: 0;
			}

			text {
				margin: 0 16rpx;
			}
		}

		image {
			width: 10rpx;
			height: 20rpx;
			flex-shrink: 0;
		}
	}

	.u-collapse-head {
		background: #fff;
		padding: 20rpx 20rpx 20rpx 40rpx !important;
	}

	.icon {
		width: 32rpx;
		height: 32rpx;
		flex-shrink: 0;
	}

	.iconMini {
		width: 24rpx;
		height: 24rpx;
		flex-shrink: 0;
	}

	.collaspe {
		.addTopic {
			display: flex;
			align-items: center;
			margin: 20rpx 40rpx;

			.input {
				width: 100%;
				border-bottom: 1px solid #2e2e2e;
				margin: 0 16rpx;
			}
		}

		.hot {
			color: #303133;
			font-size: 28rpx;
			font-weight: 600;
			margin: 40rpx 20rpx;
		}

		.topic {
			display: flex;
			margin: 20rpx;

			image {
				margin: 6rpx;
			}

			.info {
				.title {
					font-size: 28rpx;
					color: #c5756f;
				}

				.des {
					font-size: 24rpx;
				}
			}
		}
	}

	.pop {
		.title {
			text-align: center;
			margin: 40rpx;
			font-size: 32rpx;
		}
	}
</style>
