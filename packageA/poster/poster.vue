<template>
	<view>
		<view class="top">
			<button @click='saveImage'>保存</button>
			<text @click='eidtImage'>修改</text>
		</view>
		<painter @customActionStyle="customActionStyle" :palette="template" @imgOK="onImgOK" action="action" widthPixels="2080" />
		 <image :src="image" style="width: 654rpx; height: 1000rpx; margin-left:40rpx;"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				template: {},
				imagePath:'',
				image:'',
				paintPallette: {}
			}
		},
		mounted() {

			// console.log(new LastMayday().palette())
		},
		methods: {
			eidtImage(){
				this.template.views[3].text = '哈哈哈哈'
			},
			// initData() {
			// 	uni.showLoading({
			// 		title: "拼命生成中...",
			// 		mask: true,
			// 	});
			// 	this.template = new Card().palette()
			// 	console.log(this.template)
			// },
			onImgOK(e) {
				console.log(e)
				this.imagePath = e.detail.path;
				this.image = this.imagePath
				if (this.isSave) {
					this.saveImage(this.imagePath);
				}
			},
			saveImage() {
				if (this.imagePath && typeof this.imagePath === 'string') {
					this.isSave = false;
					wx.saveImageToPhotosAlbum({
						filePath: this.imagePath,
					});
				}
			},
		},
		onLoad: function() {
			this.template ={
			"width": "720rpx",
			"height": "1280rpx",
			"background": "#f8f8f8",
			"views": [{
					"type": "image",
					"url": "http://img1.maka.im/user/8982892/images/1c20d674cd6762877bc150a4850cc381.png",
					"css": {
						"width": "720rpx",
						"height": "1280rpx",
						"top": "0rpx",
						"left": "0rpx",
						"rotate": "0",
						"borderRadius": "",
						"borderWidth": "",
						"borderColor": "#000000",
						"shadow": "",
						"mode": "scaleToFill"
					}
				},
				{
					"type": "image",
					"url": "http://img1.maka.im/user/8982892/images/ebaecded1e3d015a3178aa790d8a45be.png",
					"css": {
						"width": "254rpx",
						"height": "308rpx",
						"top": "192rpx",
						"left": "230rpx",
						"rotate": "0",
						"borderRadius": "",
						"borderWidth": "",
						"borderColor": "#000000",
						"shadow": "",
						"mode": "scaleToFill"
					}
				},
				{
					"type": "text",
					"text": "努力做一个善良的人，做一个心态阳光的人，做一个积极向上的人，用正能量激发自己",
					"css": {
						"color": "#000000",
						"background": "",
						"width": "475rpx",
						"height": "75.02rpx",
						"top": "604rpx",
						"left": "119rpx",
						"rotate": "0",
						"borderRadius": "",
						"borderWidth": "",
						"borderColor": "#000000",
						"shadow": "",
						"padding": "0rpx",
						"fontSize": "20rpx",
						"fontWeight": "normal",
						// "maxLines": "2",
						"lineHeight": "37.74rpx",
						"textStyle": "fill",
						"textDecoration": "none",
						"fontFamily": "",
						"textAlign": "center"
					}
				},
				{
					"type": "text",
					"text": "微笑开始新的一天",
					"css": {
						"color": "#000000",
						"background": "",
						"width": "600rpx",
						"height": "58.68rpx",
						"top": "698rpx",
						"left": "60rpx",
						"rotate": "0",
						"borderRadius": "",
						"borderWidth": "",
						"borderColor": "#000000",
						"shadow": "",
						"padding": "0rpx",
						"fontSize": "36rpx",
						"fontWeight": "normal",
						"maxLines": "2",
						"lineHeight": "59.94rpx",
						"textStyle": "fill",
						"textDecoration": "none",
						"fontFamily": "",
						"textAlign": "center"
					}
				},
				{
					"type": "image",
					"url": "http://img1.maka.im/user/8982892/images/5ba0d49561a0e6be54b832bedb061320.jpg",
					"css": {
						"width": "127rpx",
						"height": "127rpx",
						"top": "1047rpx",
						"left": "532rpx",
						"rotate": "0",
						"borderRadius": "",
						"borderWidth": "",
						"borderColor": "#000000",
						"shadow": "",
						"mode": "scaleToFill"
					}
				}
			]
		}

		}
	}
</script>

<style lang="scss">
	.box {
		margin-top: 20rpx;

		.item {
			padding: 0 30rpx;
			height: 100rpx;
			border-bottom: 1rpx solid #f5f5f5;

			&:last-child {
				border: 0;
			}

			.default {
				font-size: 24rpx;
				color: #FA6400;
				border: 1rpx solid #FA6400;
				border-radius: 5rpx;
				margin-left: 5rpx;
				padding: 0 5rpx;
			}
		}
	}

	.btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
