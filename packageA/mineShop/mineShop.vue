<template>
	<view style="height: 100vh;">
		<u-navbar :title="navTitle"></u-navbar>
		<view class="flex flex-direction" style="height: 100%;">
			<view class="card-box" :style="'background-image: url('+bgImage+');background-size: 100% auto;'">
				<view class="flex justify-center" style="height: 200rpx; padding: 40rpx;">
					<view class="">
						<image :src="badgeImage" mode="widthFix" style="width: 96rpx;"></image>
					</view>
				</view>
				<view class="foot-box flex  align-center">
					<view class="item" @click="cardChange(0)" :class="cardIndex === 0?'active':''">
						<view class="">
							自营补贴
						</view>
					</view>
					<view class="foot-line">

					</view>
					<view class="item" @click="cardChange(1)" :class="cardIndex === 1?'active':''">
						<view class="">
							分销店铺
						</view>
					</view>
					<view class="foot-line">
					
					</view>
					<view class="item" @click="cardChange(2)" :class="cardIndex === 2?'active':''">
						<view class="">
							代理店铺
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '', //设置请求接口
				navTitle: '',
				bgImage: this.STATIC_URL + 'bg01.png',
				roleLevel: 0,
				badgeImage: '',
				end_time: "",
				cardIndex: 0
			};
		},
		created() {
			this.roleLevel = this.$store.state.roleLevel
			this.bgImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')
			this.badgeImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')
		},
		methods: {
			cardChange(index) {
				this.cardIndex = index
			},
			toUserInfo(item) {
				this.$store.commit('setUserInfo', item);
				uni.navigateTo({
					url: "../../pages/userInfo/userInfo"
				})
			}
		},
		onLoad(options) {
			this.url = options.url
			switch (options.url) {
				case 'team':
					this.navTitle = '我的店铺'
					break;
				case 'recommend':
					this.navTitle = '我的推荐'
					break;
				case 'reward':
					this.navTitle = '我的奖励'
					break;
				default:
					break;
			}
			// 在用户页面修改之后调用
			uni.$off('userInfoEidt');
			uni.$on("userInfoEidt", res => {
				console.log(res)

				// this.userShop()
			})
			// navTitle
		}

	}
</script>

<style lang="scss">
	.screen-box {
		width: 116rpx;
		height: 32rpx;
		background: #F1F1F1;
		border-radius: 20rpx;
		border: 2rpx solid #EDEDED;
		justify-content: center;
		align-items: center;
	}

	.screen {
		width: 116rpx;
		height: 32rpx;
		background: #F1F1F1;
		border-radius: 20rpx;
		border: 2rpx solid #EDEDED;
		justify-content: center;
		align-items: center;
	}

	.fill {
		width: 72rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		border-radius: 20rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #9C9C9C;
	}

	.card-box {
		width: 608rpx;
		height: 304rpx;
		overflow: hidden;
		border-radius: 8rpx;
		margin: 40rpx auto;
		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	}

	.card-title {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;

		.txt {
			font-size: 32rpx;
			color: rgba(58, 57, 67, 0.5);
		}

		.num {
			font-size: 68rpx;
			color: rgba(58, 57, 67, 1);
		}
	}

	.foot-box {
		height: 124rpx;
		background: #FCFCFC;

		.item {
			text-align: center;
			flex: 1;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;

			&.active {
				color: #333333;
			}
		}

		.foot-line {
			width: 2rpx;
			height: 44rpx;
			background: #D8D8D8;
			border: 2rpx solid #979797;
		}
	}



	.member-box {
		background: #FFFFFF;

		.member-list {
			margin: 20rpx 30rpx;
			border-radius: 4rpx;
			padding: 20rpx 30rpx;
			background: #FFFFFF;
		}

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 20rpx;
		}

		.member-title {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 30rpx;
			padding: 30rpx 40rpx 0rpx 40rpx;

		}
	}

	.search-box {
		margin: 20rpx 30rpx;
		line-height: 70rpx;
		border-radius: 35rpx;

		input {
			height: 70rpx;
			padding: 0 30rpx;
		}

		.placeholder {
			color: #AAAAAA;
		}

		text {
			padding: 0 30rpx;
			font-size: 40rpx;
		}
	}
</style>
