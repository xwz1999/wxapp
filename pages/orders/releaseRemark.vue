<template>
	<view class="">
		<view class="card-box">
			<view class="head-box flex align-center">
				<view class="lf bg-img" :style="'background-image: url('+IMAGE_URL+pageData.mainPhotoUrl+');'"></view>
				<view class="rg">
					<view class="title">
						<text>{{pageData.goodsName}}</text>
					</view>
					<view class="pic">
						<text>型号规格 {{pageData.skuName}}</text>
					</view>
				</view>
			</view>
			<view class="content">
	
			</view>
			<view class="image-list  flex flex-wrap align-end">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				pageData: null,
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.data));
			this.pageData = data
		},
		methods: {
			
		}
	}
</script>


<style lang="scss" scoped>
	.card-box {
		margin: 30rpx;
		padding: 20rpx;
		background: #FFFFFF;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		font-size: 24rpx;
		border-radius: 16rpx;

		.head-box {
			margin-bottom: 46rpx;

			.lf {
				width: 112rpx;
				height: 112rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.rg {
				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.pic {
					font-size: 26rpx;
				}
			}
		}

		.content {
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 80rpx;
		}
		.image-list {
			.image-box {
				width: 178rpx;
				height: 178rpx;
				border-radius: 8rpx;
				margin-right: 16rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
