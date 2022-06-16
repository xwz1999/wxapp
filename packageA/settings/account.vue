<template>
	<view>
		<view class="box bg-white">
			<navigator url="/pages/authentication/authentication" class="item flex justify-between">
				<view class="">提现密码设置</view>
				<text class="cuIcon-right"></text>
			</navigator>
			<navigator url="/packageA/settings/accountdetail" class="item flex justify-between">
				<view class="">注销账号</view>
				<text class="cuIcon-right"></text>
			</navigator>
		</view>
<!-- 		<view class="box bg-white" v-if='isShow'>
			<view class="item flex justify-between">
				<view class="title">
					手机号显示开关
					<view class="tips">
						关闭后，其他人将无法看到您的手机号
					</view>
				</view>
				<u-switch v-model="onChange" @change="changePhoneSecret" active-color="red" inactive-color="#F5F5F5">
				</u-switch>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [],
				onChange: false,
				isShow:false
			}
		},
		onLoad() {
			this.info = uni.getStorageSync("userInfo")
			this.onChange = this.info.secret == 1 ? true : false
			let level=uni.getStorageSync("myLevl")
			console.log(level)
			
			this.isShow=level!='2'?true:false
		},
		methods: {
			changePhoneSecret(value) {
				let secret = this.info.secret
				this.$u.post('/api/v2/app/user/secret', {
					secret
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					if (secret == 1) {
						this.info.secret = 0
					} else if (secret == 0) {
						this.info.secret = 1
					}
					console.log(this.info)
					uni.setStorageSync("userInfo", this.info)
				})
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

			.title {
				line-height: 50rpx;
			}

			.tips {
				font-size: 24rpx;
			}

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
