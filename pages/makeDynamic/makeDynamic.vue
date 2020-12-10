<template>
	<view>
		<textarea value="" v-model="content" class="placeholder bg-white" maxlength="200" placeholder="请输入内容" />
		<view class="image-box flex flex-wrap">
			<view class="image-item bg-img" v-for="(item,index) in images" :key="index" :style="'background-image: url('+IMAGE_URL+item.path+');'">
				<text class="cuIcon-roundclosefill" @tap="delImage(index)"></text>
			</view>
			<view v-if="images.length<maxLength" class="flex flex-direction justify-center align-center upload" @tap="chooseImage">
				<text class="cuIcon-pic" style="font-size: 48rpx;"></text>
				<view class="">上传图片</view>
				<view class="">(最多{{maxLength}}张)</view>
			</view>
		</view>
		<view class="" style="padding: 25rpx;">
			<button class="bg-red text-white" @tap="submit">发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				images: [],
				maxLength: 9,
				goodsId: 0,
				content: ""
			};
		},
		onLoad(options) {
			this.goodsId = parseInt(options.goodsId)
		},
		methods: {
			submit() {
				this.$u.post("/api/v1/moment_copy/create", {
					userId: uni.getStorageSync("userInfo").id,
					goodsId: this.goodsId,
					text: this.content,
					images: this.images
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.showToast({
						title: "发布成功",
						success: () => {
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						}
					})
				})
			},
			//删除图片
			delImage(i) {
				uni.showModal({
					title: '提示',
					content: '确认要删除该图片吗',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.images.splice(i, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			chooseImage() {
				uni.chooseImage({
					count: this.maxLength-this.images.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						console.log(res.tempFilePaths);
						let pics = res.tempFilePaths
						for (let i = 0; i < pics.length; i++) {
							this.uploadPic(pics[i],i)
						}
					}
				});
			},
			uploadPic(url,i) {
				uni.uploadFile({
					url: this.BASE_URL + '/api/v1/files/photo/upload',
					filePath: url,
					name: 'photo',
					success: (res) => {
						let result = JSON.parse(res.data)
						console.log(result,i)
						if (result.code == "SUCCESS") {
							console.log(result.data.data.url)
							let url = result.data.data.url
							console.log(this.images)
							console.log(this.images.length)
							if (this.images.length < this.maxLength) {
								console.log(this.IMAGE_URL + url)
								uni.getImageInfo({
									src: this.IMAGE_URL + url,
									success: (image) => {
										let imageMsg = {
											path: url,
											width: image.width,
											height: image.height
										}
										this.images.push(imageMsg)
									},
									fail: (err) => {
										console.log(err)
									}
								});
							} else {
								this.$u.toast("最多上传" + this.maxLength + "张图片");
							}
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.placeholder {
		padding: 22rpx;
		margin: 25rpx;
		width: 700rpx;
		line-height: 40rpx;
	}

	.image-box {
		margin: 25rpx;

		&>view {
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			font-size: 20rpx;
			color: #AAAAAA;

			&:nth-child(4n) {
				margin-right: 0;
			}
		}

		.upload {
			border: 1rpx solid #DDDDDD;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}

		.image-item {
			position: relative;

			.cuIcon-roundclosefill {
				font-size: 32rpx;
				position: absolute;
				right: 5rpx;
				top: 5rpx;
				color: rgba(0, 0, 0, 0.6);
			}
		}
	}
</style>
