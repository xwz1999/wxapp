<template>
	<!-- <view class="">
		<image class="wx_code" :src="IMAGE_URL+'/wxapp/jyy-service.jpeg'"></image>
		<view class="wx_code_tip">扫描二维码联系客服</view>
		<view class="wx_number">
			<view :decode="true" style="font-size: 14px;color: #333333;">微信号&nbsp;&nbsp;&nbsp;</view>
			<!-- <text :decode="true" style="font-size: 16px;font-weight: 500;color: #333333;margin:10px;">jyy123456&nbsp;&nbsp;&nbsp;&nbsp;</text>
		    <text style="font-size: 14px;color: #2F82E5;">复制</text> -->

	<!-- <view style="font-size: 16px;font-weight: 500;color: #333333;margin-right:10px;">jyy123456
				<text style="font-size: 14px;color: #2F82E5;" @tap="copy">复制</text>
			</view>
		</view>
		<view class="save-btn flex align-center">
			<view class="btn" @click='save'>保存二维码到相册</view>
		</view>
	</view> -->


	<view>
		<view class="method_1" v-if="isNull">
			<text style="color: #D5101A;font-size: 32rpx">方法一：</text>
			<view>
				<text style="color: #D5101A;font-size: 32rpx">拨打客服热线</text>
				<view style="height: 25rpx;"></view>
				<view style="display: flex;align-items: center;">

					<text style="color: #333333;font-size: 32rpx,">热线电话:</text>
					<view style="width: 30rpx;"></view>

					<text style="font-weight: bold; color: #111111;font-size: 32rpx">{{customeInfo.mobile}}</text>
					<image style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" :src="IMAGE_URL+'/wxapp/uni-program/wholesale_call.png'"
						@tap="call()">
					</image>
				</view>

			</view>
		</view>
		
		<view style="height: 20rpx;"></view>
		
		<view class="method_1" v-if="isNull">
			<text style="color: #D5101A;font-size: 32rpx">方法二：</text>
			<view>
				<text style="color: #D5101A;font-size: 32rpx">添加客服微信</text>
				<view style="height: 25rpx;"></view>
				<view style="display: flex;align-items: center;">
		
					<text style="color: #333333;font-size: 32rpx,">微信号:</text>
					<view style="width: 30rpx;"></view>
		
					<text style="font-weight: bold; color: #111111;font-size: 32rpx">{{customeInfo.wechat}}</text>
		
		
					<image style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" :src="IMAGE_URL+'/wxapp/uni-program/wholesale_copy.png'"
						@tap="copy(customeInfo.wechat)">
					</image>
				</view>
				
		
				<view style="display: flex;">
					<image style="width: 200rpx;height: 200rpx;margin-top: 20rpx;" :src="IMAGE_URL + customeInfo.photo" 
						@tap="copy(customeInfo.wechat)">
					</image>
					<view style="display: flex;flex-direction: column;justify-content: flex-end;">
					<image style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" :src="IMAGE_URL+'/wxapp/uni-program/wholesale_dowload.png'"
						@tap="save1()">
					</image>
					</view>
				</view>
		
			</view>
		
		</view>
		
		<view style="height: 20rpx;"></view>
		<view class="method_1" v-if="isNull">
			<text style="color: #D5101A;font-size: 32rpx">方法三：</text>
			<view>
				<text style="color: #D5101A;font-size: 32rpx">关注微信公众号并发送消息</text>
				<view style="height: 25rpx;"></view>
				<view style="display: flex;align-items: center;">
		
					<text style="color: #333333;font-size: 32rpx,">公众号:</text>
					<view style="width: 30rpx;"></view>
		
					<text style="font-weight: bold; color: #111111;ffont-size: 32rpx,">瑞库客APP</text>
		
		
					<image style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" :src="IMAGE_URL+'/wxapp/uni-program/wholesale_copy.png'"
						@tap="copy('瑞库客APP')">
					</image>
				</view>
		
			</view>
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
				imageUrl: '',
				isNull: false,
				customeInfo: {}
			}
		},
		mounted() {},
		onLoad() {
			this.getCustomer()
		},
		methods: {
			//复制
			copy(msg) {
				uni.setClipboardData({
					data: msg,
					success: function() {
						console.log('success');
					}
				});
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: this.customeInfo.mobile, //电话号码
					success: function(e) {
						console.log(e);
					},
					fail: function(e) {
						console.log(e);

					}
				})
			},

			save1() {
				// let urls = images.map(item => {
				// 	return this.IMAGE_URL + item.url
				// })
				// 获取保存到相册权限
				let arry = [ this.IMAGE_URL + this.customeInfo.photo]
				wxSaveAuth().then(res => {
					// 保存多张图片到相册
					downloadImgs(arry)
				})
			},

			getCustomer() {
				this.$u.post('/api/v2/app/jyy/contact', {

				}).then(res => {
					console.log(res)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.customeInfo = res.data.data
					if (this.customeInfo != null) {
						this.isNull = true
					} else {
						this.isNull = false
					}
				});
			},
		},

	}
</script>


<style lang="scss">
	/* page不能写带scope的style标签中，否则无效 */
	page {
		height: 100%;
		background-color: #FFFFFF;
	}
</style>


<style scoped lang="scss">
	.method_1 {
		//margin: 20px auto 0;
		margin: 10rpx 30rpx;
		padding: 30rpx 30rpx;
		border: red solid 1px;
		border-radius: 5px;
		display: flex;
	}


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
