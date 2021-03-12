<template>
	<view class="">
		<view class="swiper-dot flex justify-center align-center">
			<view class="dot" :class="current===index?'color':''" v-for="index in imgUrlArr.length" :key='index'>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper-box" :circular="true" interval="5000" duration="500" :current="current" @change="changeCurrent">
			<!-- v-for="(item,index) in swipers" :key="index" @tap="toDeitail(item.goodsId,item.activityUrl)" -->
			<swiper-item class="flex align-center" v-for="(item,index) in imgUrlArr" :key='index' >
				<image :src="item" mode="widthFix"></image>
			</swiper-item>
			
		</swiper>
		<view class="save-btn flex align-center">
			<view class="btn" @click='save'>保存图片到相册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				imgUrlArr:[],
				invitationNo:this.$store.state.invitationNo
			}
		},
		mounted() {
			this.getData()
			console.log(this.invitationNo)
		},
		methods: {
			changeCurrent(e) {
				this.current = e.detail.current
			},
			getData(){
				this.$u.get(`/api/v1/shop/share_photo/${this.invitationNo}`).then(res => {
					console.log(res)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.imgUrlArr = res.data.data
				})
			},
			//点击保存图片
			save() {
				let that = this
				//若二维码未加载完毕，加个动画提高用户体验
				wx.showToast({
					icon: 'loading',
					title: '正在保存图片',
					duration: 1000
				})
				//判断用户是否授权"保存到相册"
				wx.getSetting({
					success(res) {
						//没有权限，发起授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							wx.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //用户允许授权，保存图片到相册
									that.savePhoto();
								},
								fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
									wx.openSetting({
										success() {
											wx.authorize({
												scope: 'scope.writePhotosAlbum',
												success() {
													that.savePhoto();
												}
											})
										}
									})
								}
							})
						} else { //用户已授权，保存到相册
							that.savePhoto()
						}
					}
				})
			},
			//保存图片到相册，提示保存成功
			savePhoto() {
				let that = this
				wx.downloadFile({
					url: that.imgUrl,
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
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

	.swiper-dot {
		height: 80rpx;
		line-height: 80rpx;
		.dot {
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background: #FFFFFF;
			margin: 0 30rpx;
			border: 2rpx solid #F43F3B;
			&.color{
				background: #F43F3B;
			}
		}
	}

	.swiper-box {
		margin: 0 10%;
		height: calc(100vh - 200rpx);
		overflow: hidden;
	}
	.save-btn {
		margin-top: 40rpx;
		padding: 0 10%;
		height: 80rpx;
	
		box-shadow: 0 0 10rpx 1rpx #f1f1f1;
		background: #FFFFFF;
		.btn {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			color: #FFFFFF;
			text-align: center;
			background: #F43F3B;
		}
	
	}
</style>
