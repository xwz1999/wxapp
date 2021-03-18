<template>
	<view class="">
		<view class="card-box" :style="'background-image: url('+bgImage+');background-size: 100% auto;'">
			<view class="flex justify-between" style="height: 200rpx; padding: 40rpx;">
				<view class="card-title">
					<view class="txt" style="width: 100%;">
						累计总收益(瑞币)
					</view>
					<view class="num">
						10000.00
					</view>
				</view>
				<view class="">
					<image :src="badgeImage" mode="widthFix" style="width: 96rpx;"></image>
				</view>
			</view>
			<view class="foot-box flex  align-center">
				<view class="item">
					<view class="">
						自购收益
					</view>
					<view class="">
						1000.00
					</view>
				</view>
				<view class="foot-line">
					
				</view>
				<view class="item">
					<view class="">
						店铺补贴
					</view>
					<view class="">
						1000.00
					</view>
				</view>
				<view class="foot-line">
					
				</view>
				<view class="item">
					<view class="">
						自购收益
					</view>
					<view class="">
						1000.00
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
				bgImage: this.STATIC_URL + 'bg01.png',
				roleLevel: 0,
				badgeImage: '',
			}
		},
		created() {
			this.roleLevel = this.$store.state.roleLevel
			this.bgImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')

			this.badgeImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')
			// this.role = this.$options.filters['roleFilter'](this.roleLevel, 'txt')
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.card-box {
		width: 608rpx;
		height: 304rpx;
		overflow: hidden;
		border-radius: 8rpx;
		margin: 40rpx auto;
		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	}
	.card-title{
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		.txt{
			font-size: 32rpx;
			color: rgba(58,57,67,0.5);
		}
		.num{
			font-size: 68rpx;
				color: rgba(58,57,67,1);
		}
	}
	.foot-box {
		height: 124rpx;
		background: #FCFCFC;
		.item{
			text-align: center;
			flex: 1;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.foot-line{
			width: 2rpx;
			height: 44rpx;
			background: #D8D8D8;
			border: 2rpx solid #979797;
		}
	}

</style>
