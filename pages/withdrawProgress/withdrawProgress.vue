<template>
	<view>
		<view class="" style="margin: 30rpx 50rpx;">
			<u-time-line>
				<u-time-line-item nodeTop="2">
					<!-- 此处自定义了左边内容，用一个图标替代 -->
					<template v-slot:node>
						<view class="u-node" style="background: red;">
							<u-icon name="checkmark-circle-fill" color="#fff" :size="36"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title">提现申请已提交，等待处理</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item nodeTop="2">
					<!-- 此处自定义了左边内容，用一个图标替代 -->
					<template v-slot:node>
						<view class="u-node">
							<u-icon name="rmb-circle-fill" color="#fff" :size="36"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title">预计72小时内到账</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
