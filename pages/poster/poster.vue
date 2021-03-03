<template>
	<view>
		<view class="top">
			<button @click='saveImage'>保存</button>
		</view>
		<painter @customActionStyle="customActionStyle" :palette="template" @imgOK="onImgOK" action="action" widthPixels="1000" />
	</view>
</template>

<script>
	import {
		Card
	} from "./poster.js"
	export default {
		data() {
			return {
				template: {},
				customActionStyle: {
					border: {
						borderColor: '#1A7AF8',
					},
					scale: {
						textIcon: '/palette/switch.png',
						imageIcon: '/palette/scale.png'
					},
					delete: {
						icon: '/palette/close.png'
					}
				},
				paintPallette: {}
			}
		},
		mounted() {

			// console.log(new LastMayday().palette())
		},
		methods: {
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
			this.template = {
				"width": "654px",
				"height": "1000px",
				"background": "#FEF8F3",
				"views": [{
						"type": "qrcode",
						"content": "哈哈哈",
						"css": {
							"color": "#000000",
							"background": "#ffffff",
							"width": "200px",
							"height": "200px",
							"top": "779px",
							"left": "29px",
							"rotate": "0",
							"borderRadius": "10px"
						}
					},
					{
						"type": "text",
						"text": "扫码关注",
						"css": {
							"color": "#ff0000",
							"background": "rgba(0,0,0,0)",
							"width": "200px",
							"height": "43.89999999999999px",
							"top": "2px",
							"left": "1113px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "1px",
							"borderColor": "#000000",
							"shadow": "10 10 5 #888888",
							"padding": "0px",
							"fontSize": "30px",
							"fontWeight": "normal",
							"maxLines": "2",
							"lineHeight": "43.290000000000006px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "",
							"textAlign": "left"
						}
					},
					{
						"type": "text",
						"text": "扫码关注",
						"css": {
							"color": "#ff0000",
							"background": "rgba(0,0,0,0)",
							"width": "200px",
							"height": "43.89999999999999px",
							"top": "2px",
							"left": "1113px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "1px",
							"borderColor": "#000000",
							"shadow": "10 10 5 #888888",
							"padding": "0px",
							"fontSize": "30px",
							"fontWeight": "normal",
							"maxLines": "2",
							"lineHeight": "43.290000000000006px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "",
							"textAlign": "left"
						}
					},
					{
						"type": "text",
						"text": "扫码关注",
						"css": {
							"color": "#C87756",
							"background": "rgba(0,0,0,0)",
							"width": "30px",
							"height": "175.10999999999996px",
							"top": "787.94px",
							"left": "254px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "",
							"borderColor": "#000000",
							"shadow": "",
							"padding": "0px",
							"fontSize": "30px",
							"fontWeight": "normal",
							"maxLines": "5",
							"lineHeight": "43.290000000000006px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "",
							"textAlign": "left"
						}
					},
					{
						"type": "text",
						"text": "1. 忌食辛辣刺激食物\n2. 忌运动量过大\n3. 戒烟戒酒，忌暴饮暴食",
						"css": {
							"color": "#C87756",
							"background": "rgba(0,0,0,0)",
							"width": "250px",
							"height": "93.88px",
							"top": "611px",
							"left": "40px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "",
							"borderColor": "#000000",
							"shadow": "",
							"padding": "0px",
							"fontSize": "20px",
							"fontWeight": "normal",
							"maxLines": "6",
							"lineHeight": "31.080000000000002px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "",
							"textAlign": "left"
						}
					},
					{
						"type": "text",
						"text": "养生小贴士",
						"css": {
							"color": "#C87756",
							"background": "rgba(0,0,0,0)",
							"width": "200px",
							"height": "42.89999999999999px",
							"top": "537px",
							"left": "42px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "",
							"borderColor": "#C87756",
							"shadow": "",
							"padding": "0px",
							"fontSize": "30px",
							"fontWeight": "bold",
							"maxLines": "2",
							"lineHeight": "43.290000000000006px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "webfontzk",
							"textAlign": "left"
						}
					},
					{
						"type": "text",
						"text": "分",
						"css": {
							"color": "#C87756",
							"background": "rgba(0,0,0,0)",
							"width": "130px",
							"height": "185.89999999999998px",
							"top": "708px",
							"left": "484px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "",
							"borderColor": "#000000",
							"shadow": "",
							"padding": "0px",
							"fontSize": "130px",
							"fontWeight": "normal",
							"maxLines": "2",
							"lineHeight": "187.59000000000003px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "webfontzkxw",
							"textAlign": "left"
						}
					},
					{
						"type": "text",
						"text": "秋",
						"css": {
							"color": "#C87756",
							"background": "rgba(0,0,0,0)",
							"width": "130px",
							"height": "185.89999999999998px",
							"top": "580px",
							"left": "463.5px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "",
							"borderColor": "#000000",
							"shadow": "",
							"padding": "0px",
							"fontSize": "130px",
							"fontWeight": "normal",
							"maxLines": "2",
							"lineHeight": "187.59000000000003px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "webfontzkxw",
							"textAlign": "left"
						}
					},
					{
						"type": "image",
						"url": "https://static.fotor.com.cn/assets/res/pic/454d3884-b1d1-4059-a08b-18427f93c8eb.jpg?x-oss-process=image/resize,lfit,h_1200,w_1200/format,src",
						"css": {
							"width": "568.01px",
							"height": "475.27px",
							"top": "0px",
							"left": "39.19px",
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
						"text": "请朋友们注意防寒保暖，小心着凉",
						"css": {
							"color": "#fff",
							"background": "rgba(0,0,0,0)",
							"width": "22px",
							"height": "372.9000000000001px",
							"top": "61px",
							"left": "71px",
							"rotate": "0",
							"borderRadius": "",
							"borderWidth": "",
							"borderColor": "#000000",
							"shadow": "",
							"padding": "0px",
							"fontSize": "22px",
							"fontWeight": "normal",
							"maxLines": "22",
							"lineHeight": "24.42px",
							"textStyle": "fill",
							"textDecoration": "none",
							"fontFamily": "",
							"textAlign": "left"
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
