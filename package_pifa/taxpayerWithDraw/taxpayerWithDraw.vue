<template>
	<scroll-view scroll-y="true" style="height: 100vh;background-color:#3A3842;">
		<view class="step">
			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step1_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">开发票</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step2.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">申请提现</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step3.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">平台审核</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step4.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">打款到账</text>
			</view>
			<view @tap.stop="kefu()"
				style="position: absolute;left: 0;right: 0;top: 170rpx;backdrop-filter: blur(30rpx) saturate(150%);
			background-color: rgba(255, 255, 255, 0.2);padding: 30rpx 30rpx ;display: flex;justify-content: space-between;align-items: center;">
				<text style="color: #FFF;font-size: 30rpx;">如有疑问，点击联系客服</text>
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_kefu.png'" style="width: 64rpx;" mode="widthFix">
				</image>
			</view>

		</view>

		<view style="margin: 0 24rpx;border-radius: 16rpx;background-color: #D4363E;height: 24rpx;margin-top: 120rpx;">
		</view>
		<view style="position: absolute;top: 340rpx;left:42rpx;right:42rpx; ">

			<view style="background-color: #fff;padding: 50rpx 0rpx;border-radius: 10rpx 10rpx 20rpx 20rpx ;">
				<view style="display: flex;justify-content: space-between;padding: 0 30rpx;">
					<text style="color: #333;font-size: 28rpx;">结算金额</text>
					<text style="color: #333;font-size: 28rpx;font-weight: bold;">¥{{withdrawAmount.balance}}</text>
				</view>
				<view style="display: flex;justify-content: space-between;margin-top: 24rpx;padding: 0 30rpx;">
					<view style="color: #333;font-size: 28rpx;">
						<view @tap="rule()">
							需缴纳税费金额
							<text class="text-gray cuIcon-question" style="font-size: 24rpx;padding-left: 8rpx;"></text>
						</view>
					</view>
					<text style="color: #333;font-size: 28rpx;font-weight: bold;">¥{{withdrawAmount.tax_amount}}</text>
				</view>
				<view style="display: flex;justify-content: space-between;margin-top: 24rpx;padding: 0 30rpx;">
					<text style="color: #333;font-size: 28rpx;">实际结算金额</text>
					<text style="color: #333;font-size: 28rpx;font-weight: bold;">¥{{withdrawAmount.actual_amount}}</text>
				</view>
				<view style="display: flex;padding: 0 30rpx;margin-top: 24rpx;">
					<text style="color: #999;font-size: 24rpx;">请开增值税专用发票，收到发票后的10个工作日内安排付款，注意查收！</text>
				</view>
				<view style="display: flex;justify-content: space-between;margin-top: 32rpx;">
					<view style="width: 16rpx;height: 32rpx;border-radius: 0 16rpx 16rpx 0;background-color: #3A3842;">
					</view>
					<view style="width: 100%;height: 2rpx;background-color: #eee;margin-top: 16rpx;"></view>
					<view style="width: 16rpx;height: 32rpx;border-radius: 16rpx 0 0 16rpx;background-color: #3A3842;">
					</view>
				</view>

				<view
					style="width: 100%; align-items: center;justify-content: center;display: flex;position: absolute;">
					<image :src="IMAGE_URL+'/wxapp/withdraw/img_yuanquan.png'" class="image" mode="widthFix"
						style="width: 160rpx;"></image>
					<text style="color:#CE1A23 ;font-size: 28rpx;position: absolute;">对公开票信息</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 120rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">开票内容</view>
					<text style="color: #333;font-size: 28rpx;">现代服务*推广服务费或营销服务费</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">单位全称</view>
					<text style="color: #333;font-size: 28rpx;">浙江京耀云供应链管理有限公司</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">税号</view>
					<text style="color: #333;font-size: 28rpx;">现代服务*91330201MA7E4AA99L</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">地址电话</view>
					<text style="color: #333;font-size: 28rpx;">浙江省宁波高新区菁华路108号024幢4楼4-3 15267755720</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">开户行</view>
					<text style="color: #333;font-size: 28rpx;">上海浦东发展银行宁波鄞州支行</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">银行账户</view>
					<text style="color: #333;font-size: 28rpx;">94170078801800002166</text>
				</view>

				<view @tap="copy()" style="display: flex;width: 100%;justify-content: center;margin-top: 40rpx;">
					<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_copy.png'" style="width: 40rpx;"
						mode="widthFix">
					</image>
					<text style="color:#D5101A;font-size: 28rpx;margin-left: 10rpx;">复制开票信息</text>
				</view>

				<view style="display: flex;justify-content: space-between;margin-top: 32rpx;">
					<view style="width: 16rpx;height: 32rpx;border-radius: 0 16rpx 16rpx 0;background-color: #3A3842;">
					</view>
					<view style="width: 100%;height: 2rpx;background-color: #eee;margin-top: 16rpx;"></view>
					<view style="width: 16rpx;height: 32rpx;border-radius: 16rpx 0 0 16rpx;background-color: #3A3842;">
					</view>
				</view>
				<view style="margin-top: 16rpx;padding: 0 30rpx;">
					<text style="color: #333;font-size: 28rpx;">发票收件地址</text>
				</view>
				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;justify-content: space-between;">
					<view style="display: flex;">
						<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">收件地址</view>
						<text style="color: #333;font-size: 28rpx;">{{info.address}}\n{{info.name}}    {{info.mobile}}</text>
					</view>

					<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_copy.png'" style="max-width: 40rpx;"
						mode="widthFix" @tap="copyInfo()">
					</image>
				</view>
				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;justify-content: space-between;">
					<view style="display: flex;">
						<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">收件邮箱</view>
						<text style="color: #333;font-size: 28rpx;">{{info.email}}</text>
					</view>

					<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_copy.png'" style="max-width: 40rpx;"
						mode="widthFix" @tap="copyStr(info.email)">
					</image>
				</view>


			</view>

			<view @tap="nextPage()"
				style="background-color: #D5101A;height: 80rpx;border-radius:36rpx;width: 100%;margin-top: 50rpx;display: flex;justify-content: center;align-items: center;">
				<text style="color: #fff;">已开票，下一步</text>
			</view>

			<view style="height: 180rpx;"></view>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				workGroupWid: "2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
				IMAGE_URL: this.IMAGE_URL,
				info: null,
				withdrawAmount: null
			}
		},
		onLoad() {
			this.getInfo()
			this.getAmount()
		},
		methods: {
			nextPage(){
				uni.navigateTo({
					url: "/package_pifa/taxpayerWithDrawSecond/taxpayerWithDrawSecond"
				})
			},
			copyInfo() {
				uni.setClipboardData({
					data: this.info.address+'\n'+this.info.name+'  '+this.info.mobile,
					success: function() {
						console.log('success');
					}
				});
			},
			copy() {
				uni.setClipboardData({
					data: "浙江京耀云供应链管理有限公司\n91330201MA7E4AA99L\n浙江省宁波高新区菁华路108号024幢4楼4-3 15267755720\n上海浦东发展银行宁波鄞州支行\n94170078801800002166",
					success: function() {
						console.log('success');
					}
				});
			},
			copyStr(text) {
				uni.setClipboardData({
					data: text,
					success: function() {
						console.log('success');
					}
				});
			},
			rule() {
				console.log('123123');
				uni.navigateTo({
					url: "/packageA/withdraw/withdrawRule"
				})
			},
			kefu() {
				if (!uni.getStorageSync("auth").token) {
					this.$u.toast("游客无法使用该功能，请登录");
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
				} else {
					uni.navigateTo({
						url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid +
							'&type=workGroup&aid=&title=联系客服'
					});
				}
			},
			getInfo() {
				//获取联系人信息
				this.$u.post('/api/v2/app/company/contact', {}).then(res => {
					console.log(res.data.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					this.info = res.data.data

				});
			},
			getAmount() {
				this.$u.post('/api/v2/app/company/apply/all_amount', {}).then(res => {
					console.log(res.data.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					this.withdrawAmount = res.data.data

				});
			}
		}
	}
</script>

<style lang="scss">
	.step {
		display: flex;
		background-color: #fff;
		padding: 40rpx 20rpx 60rpx 20rpx;
		margin: 0 48rpx;
		border-radius: 16rpx;

		.gotoImage {
			width: 20rpx;
			margin-top: 20rpx;
		}

		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.image {
				width: 65rpx;
				height: 65rpx;
			}

			.text {
				color: #333;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
