<template>
	<view>
		<view class="box bg-white">
			<navigator url="/packageA/myInfo/myInfo" class="item flex justify-between">
				<view class="">个人资料</view>
				<text class="cuIcon-right"></text>
			</navigator>
			<navigator url="/packageA/settings/account" class="item flex justify-between">
				<view class="">账户与安全</view>
				<text class="cuIcon-right"></text>
			</navigator>
		</view>
		<view class="box bg-white">
			<!-- 		<navigator url="/pages/feedback/feedback" class="item flex justify-between">
				<view class="">意见反馈</view>
				<text class="cuIcon-right"></text>
			</navigator> -->
			<view class="item flex justify-between">
				<view class="">关于我们</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="item flex justify-between">
				<view class="">隐私政策</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="box bg-white">
			<view class="item flex justify-between" @tap="signOut">
				<view class="">退出登录</view>
				<text class="cuIcon-right"></text>
			</view>
			<!-- 	<view class="bottom text-center bg-white" @tap="signOut">退出登录</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			signOut() {
				uni.showModal({
					title: '提示',
					content: '退出后将清空您的个人信息,确定要退出吗？',
					confirmText: "确认退出",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync()
							uni.reLaunch({
								url: "../login/login"
							})
							console.log('用户点击取消');
						} else if (res.cancel) {

							console.log('用户点击确定');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin-top: 40rpx;

		.item {
			line-height: 100rpx;
			padding: 0 30rpx;
			font-size: 34rpx;
			border-bottom: 1rpx solid #f1f1f1;
			color: #333333;

			text {
				color: #AAAAAA;
			}

			&:last-child {
				border-bottom: 0;
			}
		}
	}

	.bottom {
		line-height: 100rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		font-size: 32rpx;
		color: #333333;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);
	}
</style>
