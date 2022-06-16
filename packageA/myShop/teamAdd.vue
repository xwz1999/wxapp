<template>
	<view class="">
		<image class="wx_code" :src="IMAGE_URL+'/wxapp/jyy-service.jpeg'"></image>
		<view class="wx_code_tip">扫描二维码联系客服</view>
		<view class="wx_number">
			<view :decode="true" style="font-size: 14px;color: #333333;">微信号&nbsp;&nbsp;&nbsp;</view>
			<!-- <text :decode="true" style="font-size: 16px;font-weight: 500;color: #333333;margin:10px;">jyy123456&nbsp;&nbsp;&nbsp;&nbsp;</text>
		    <text style="font-size: 14px;color: #2F82E5;">复制</text> -->
			<view style="font-size: 16px;font-weight: 500;color: #333333;margin-right:10px;">jyy123456
				<text style="font-size: 14px;color: #2F82E5;" @tap="copy">复制</text>
			</view>
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
				imageUrl: 'https://mallcdn.reecook.cn/static/wxapp/jyy-service.jpeg'
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
			save1() {
				// let urls = images.map(item => {
				// 	return this.IMAGE_URL + item.url
				// })
				// 获取保存到相册权限
				let arry = [this.imageUrl]
				wxSaveAuth().then(res => {
					// 保存多张图片到相册
					downloadImgs(arry)
				})
			},
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
