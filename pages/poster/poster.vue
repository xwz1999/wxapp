<template>
	<view class="box">
		<canvas @click.stop="" canvas-id="my-canvas" :style="{ width: 750 + 'rpx',height:80+'vh'}"></canvas>
		<view class="save-btn" @click.stop="saveImage">保存图片</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				ctx: null,
				canvasW: 0,
				canvasH: 0,
				canvasM: 0,
				title: '21313123123'
			}
		},
		created() {

			this.canvasW = wx.getSystemInfoSync().windowWidth
			this.canvasH = wx.getSystemInfoSync().windowHeight
			console.log(wx.getSystemInfoSync())
		},
		mounted() {
			this.__init()
			this.canvasM = this.convert_length(30)
		},
		methods: {
			//初始化画布
			async __init() {
				this.ctx = uni.createCanvasContext('my-canvas', this)
				this.ctx.setFillStyle("#FFFFFF")
				this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
				let city = '[宁波]天气:雨'
				let weekDate = '辛丑年(2021)正月十八'
				let ll = '湿度:93℃ 温度:5-15℃ 空气质量:优'
				let week = '2021.3.1星期一'
				//绘制标题
				this.ctx.setFontSize(this.convert_length(20)); //设置标题字体大小
				this.ctx.setFillStyle('#333'); //设置标题文本颜色
				this.ctx.fillText(city, this.canvasW * 0.1, this.convert_length(20) + 20)
				this.ctx.fillText(ll, this.canvasW * 0.1, this.convert_length(20) + 40)
				this.ctx.fillText(weekDate, this.canvasW - this.ctx.measureText(weekDate).width - this.canvasW * 0.1, this.convert_length(
					20) + 20)
				this.ctx.fillText(week, this.canvasW - this.ctx.measureText(week).width - this.canvasW * 0.1, this.convert_length(
					20) + 40)
				// ctx.fillText('20万', this.data.windowWidth - ctx.measureText('20万').width - 20, this.convert_length(20) + 20)

				// this.ctx.fillText(weekDate, this.canvasW * 0.7,this.convert_length(20) + 20)


				let headerImg = await this.getImageInfo(
					'https://testcdn.reecook.cn/static/photo/0a8c3159cf4a6cfe2475e6837a5b3521.jpg')

				this.ctx.drawImage(headerImg.path, this.canvasW * 0.1, this.convert_length(20) + 60, this.canvasW * 0.8, this.canvasW *
					0.8 * 0.8);
				//绘制标题
				// this.ctx.setFontSize(this.convert_length(34)); //设置标题字体大小
				// this.ctx.setFillStyle('#333'); //设置标题文本颜色
				// this.ctx.fillText(this.title, this.canvasW * 0.8 - 30,this.canvasW * 0.8 + 30 )
				await this.ctx.draw()
			},
			convert_length(length) {
				return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
			},
			//获取图片
			getImageInfo(imgSrc) {
				const that = this
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						// destWidth: that.canvasW * 5120 / wx.getSystemInfoSync().windowWidth,
						// destHeight: that.canvasH * 5120 / wx.getSystemInfoSync().windowHeight,
						success: (image) => {
							console.log(image)
							resolve(image);
							console.log('获取图片成功', image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败', err)
						}
					});
				});
			},
			saveImage() {
				//判断用户授权
				uni.getSetting({
					success(res) {
						console.log('获取用户权限', res.authSetting)
						if (Object.keys(res.authSetting).length > 0) {
							//判断是否有相册权限
							if (res.authSetting['scope.writePhotosAlbum'] == undefined) {
								//打开设置权限
								uni.openSetting({
									success(res) {
										console.log('设置权限', res.authSetting)
									}
								})
							} else {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									//打开设置权限
									uni.openSetting({
										success(res) {
											console.log('设置权限', res.authSetting)
										}
									})
								}
							}
						} else {
							return
						}
					}
				})
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					x: 0,
					y: 0,
					width: that.canvasW,
					height: that.canvasH,
					//复制 * 750 / wx.getSystemInfoSync().windowWidth,换算成rpx；
					destWidth: that.canvasW , //绘制canvas的时候用的是px， 这里换算成rpx ，导出后非常清晰
					destHeight: that.canvasH, //同上 px 换算成 rpx
					complete: (res) => {
						console.log('保存到相册', res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
						
							}
						})
					}
				}, this);
			},

		},
		onLoad() {

		},
		onShow() {

		}
	}
</script>
<style lang="scss">
	.box {
		background-color: #F8F8F8;
	}
</style>
