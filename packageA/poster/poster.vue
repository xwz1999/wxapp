<template>
	<view>
	<!-- 	<painter @customActionStyle="customActionStyle" palette="paintPallette" @imgOK="onImgOK" action="action"
		 widthPixels="1000" /> -->

	</view>
</template>
<script>
	// export default {
	// 	data() {
	// 		return {
	// 			template: {},
	// 				customActionStyle: {
	// 				  border: {
	// 					borderColor: '#1A7AF8',
	// 				  },
	// 				  scale: {
	// 					textIcon: '/palette/switch.png',
	// 					imageIcon: '/palette/scale.png'
	// 				  },
	// 				  delete: {
	// 					icon: '/palette/close.png'
	// 				  }
	// 				}
	// 		}
	// 	},
	// 	methods:{
	// 		onImgOK(e) {
	// 			  console.log(e)
	// 		  this.imagePath = e.detail.path;
	// 		  this.image=this.imagePath
	// 		  if (this.isSave) {
	// 		    this.saveImage(this.imagePath);
	// 		  }
	// 		},
	// 		saveImage() {
	// 		  if (this.imagePath && typeof this.imagePath === 'string') {
	// 		    this.isSave = false;
	// 		    wx.saveImageToPhotosAlbum({
	// 		      filePath: this.imagePath,
	// 		    });
	// 		  }
	// 		},
	// 	}
	// }
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
