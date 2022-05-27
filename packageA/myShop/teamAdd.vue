<template>
	<view class="">
		<image class="wx_code" :src="IMAGE_URL+'/wxapp/jyy-service.jpeg'"></image>
		<view class="wx_code_tip">扫描二维码联系客服</view>
		<view class="wx_number">
			<view :decode="true" style="font-size: 14px;color: #333333;">微信号&nbsp;&nbsp;&nbsp;</view>

			<!-- <text :decode="true" style="font-size: 16px;font-weight: 500;color: #333333;margin:10px;">jyy123456&nbsp;&nbsp;&nbsp;&nbsp;</text>
		    <text style="font-size: 14px;color: #2F82E5;">复制</text> -->
			<view style="font-size: 16px;font-weight: 500;color: #333333;margin-right:10px;">jyy123456
			<text style="font-size: 14px;color: #2F82E5;" @tap="copy">复制</text></view>
		</view>
		<view class="save-btn flex align-center">
			<view class="btn" @click='save'>保存二维码到相册</view>
		</view>
	</view>
</template>

<script>
	import {
		wxSaveAuth,
		downloadImgs
	} from '@/utils/download.js'
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				invitationNo: this.$store.state.invitationNo,
				imageUrl:'https://mallcdn.reecook.cn/static/wxapp/jyy-service.jpeg'
			}
		},
		mounted() {},
		methods: {
			//复制
			copy() {
				uni.setClipboardData({
					data: 'jyy123456',
					success: function() {
						console.log('success');
					}
				});
			},
			// previewImage(index, images) {
			// 	let picUrls = images.map(item => {
			// 		return this.IMAGE_URL + item.url
			// 	})
			// 	console.log(picUrls)
			// 	// return
			// 	uni.previewImage({
			// 		urls: picUrls,
			// 		current: index,
			// 		success: (res) => {
			// 			console.log("success")
			// 		}
			// 	});
			// },
			// downloadPic(images) {
			// 	let urls = images.map(item => {
			// 		return this.IMAGE_URL + item.url
			// 	})
			// 	// 获取保存到相册权限
			// 	wxSaveAuth().then(res => {
			// 		// 保存多张图片到相册
			// 		downloadImgs(urls)
			// 	})
			// },
			save() {
				// let urls = images.map(item => {
				// 	return this.IMAGE_URL + item.url
				// })
				// 获取保存到相册权限
				let arry=[this.imageUrl]
				wxSaveAuth().then(res => {
					// 保存多张图片到相册
					downloadImgs(arry)
				})
			},
			//点击保存图片
			// save() {
			// 	let that = this
			// 	//若二维码未加载完毕，加个动画提高用户体验
			// 	wx.showToast({
			// 		icon: 'loading',
			// 		title: '正在保存图片',
			// 		duration: 1000
			// 	})
			// 	//判断用户是否授权"保存到相册"
			// 	wx.getSetting({
			// 		success(res) {
			// 			//没有权限，发起授权
			// 			if (!res.authSetting['scope.writePhotosAlbum']) {
			// 				wx.authorize({
			// 					scope: 'scope.writePhotosAlbum',
			// 					success() { //用户允许授权，保存图片到相册
			// 						that.savePhoto();
			// 					},
			// 					fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
			// 						wx.openSetting({
			// 							success() {
			// 								wx.authorize({
			// 									scope: 'scope.writePhotosAlbum',
			// 									success() {
			// 										that.savePhoto();
			// 									}
			// 								})
			// 							}
			// 						})
			// 					}
			// 				})
			// 			} else { //用户已授权，保存到相册
			// 				that.savePhoto()
			// 			}
			// 		}
			// 	})
			// },
			//保存图片到相册，提示保存成功
			savePhoto() {
				let imgUrl = this.imgUrlArr[this.current]
				wx.downloadFile({
					url: imgUrl,
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								console.log(res.tempFilePath)
								wx.showToast({
									title: '保存成功',
									icon: "success",
									duration: 1000
								})
							}
						})
					}
				})
			}
		},

	}
</script>


<style scoped lang="scss">
	.wx_code {
		width: 200px;
		height: 200px;
		margin: 60px auto 0;
		border: red solid 1px;
	}

	.wx_code_tip {
		color: #D5101A;
		font-size: 12px;
		width: fit-content;
		margin: 10px auto;
	}

	.wx_number {
		display: flex;
		margin: 30px auto;
		width: fit-content;
	}

	.save-btn {
		margin-top: 40rpx;
		padding: 0 10%;
		height: 80rpx;

		box-shadow: 0 0 10rpx 1rpx #f1f1f1;

		// background: #FFFFFF;
		.btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			color: #FFFFFF;
			text-align: center;
			background: #F43F3B;
		}

	}
</style>
