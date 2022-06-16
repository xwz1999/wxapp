<template>
	<view class="box">
		<view class="box_text">
			<view class="text">请注意，一旦注销账户：</view>
			<view class="title">您的账户无法登陆与使用</view>
			<view class="title">身份、账户信息、会员权益将被清空且无法恢复</view>
			<view class="title">您账户内的资产（余额、优惠劵、权益卡等）将会被清空且无法恢复</view>
			<view class="title">您已经完成等交易将无法出理售后</view>
			<view class="title">您将无法便捷的使用查询账号历史交易记录</view>
		</view>
		<view class="ccc">
			<navigator url="/packageA/settings/SendSMS" class="item ">
				<view class="">确认注销</view>
			</navigator>
			<navigator url="/packageA/settings/account" class="item1">
				<view class="">不注销了</view>
			</navigator>
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
			// deleteUser() {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '确认注销账号吗？',
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				console.log('用户点击确定');
			// 				this.$u.post('/api/v1/users/profile/userDestroy', {
			// 					user_id: uni.getStorageSync("userInfo").id
			// 				}).then(res => {
			// 					console.log(res);
			// 					if (res.data.code == "FAIL") {
			// 						this.$u.toast(res.data.msg);
			// 						return
			// 					}
			// 					uni.clearStorageSync()
			// 					uni.showToast({
			// 						title: "账号已注销"
			// 					})
			// 					setTimeout(function() {
			// 						uni.reLaunch({
			// 							url: "../login/login"
			// 						})
			// 					}, 2000)
			// 				});
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});
			// },
			// signOut() {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '退出后将清空您的个人信息,确定要退出吗？',
			// 		confirmText: "确认退出",
			// 		cancelText: "取消",
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				uni.clearStorageSync()
			// 				uni.navigateTo({
			// 					url: "/pages/login/login"
			// 				})
			// 				console.log('用户点击取消');
			// 			} else if (res.cancel) {

			// 				console.log('用户点击确定');
			// 			}
			// 		}
			// 	});
			// }
		}
	}
</script>

<style lang="scss">
	.box {
		width: 100%;
		height: 100vh;
		background: #fff;
		margin-top: 5rpx;
		// box-shadow: inset 10rpx 0rpx 0rpx 0rpx red;

	}

	.text {
		line-height: 100rpx;
		padding: 0 30rpx;
		font-size: 38rpx;
		font-weight: 600;
		color: #333333;
	}

	.title {
		padding: 20rpx 40rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.ccc {
		    line-height: 100rpx;
			margin-top: 450rpx;
		    display: flex;
		    font-size: 38rpx;
		    color: #333333;
		    padding: 30rpx;
		    background: #fff;
		    display: flex;
		    align-items: center;
		    justify-content: space-around;
		    width: 100%;
		    margin-bottom: 50rpx;
	}
	.item{
		background-color: #efefef;
		    color: #000;
		    position: relative;
		    padding: 2rpx 91rpx;
		    /* background: #F9F9F9; */
		    border-radius: 8rpx;
	}
	.item1{
		background-color: rgb(207, 34, 36);
	    color: #fff;
	    position: relative;
	    padding: 2rpx 91rpx;
	    /* background: #F9F9F9; */
	    border-radius: 8rpx;
	}
</style>
