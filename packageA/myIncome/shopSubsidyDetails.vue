<!-- 自购 -->
<template>
	<view class="" class="flex flex-direction" style="height: 100vh;width:100vw;">
		<view class="">
			<view class="">
				<u-navbar title="我的" :border-bottom='false' :background="background"></u-navbar>
			</view>
			<view class="content">
				<!-- 正文内容 -->
				<view class="nav-box" :style="'background-image: url('+IMAGE_URL+'/cir-bg.png);'">
					<view class="time-box flex justify-between">
						<picker mode="date" start="1990-01-01" fields="month" :end="end_time" @change="chooseTime">
							<view class="time bg-white text-black">{{time}}<text class="cuIcon-triangledownfill"></text></view>
						</picker>
					</view>
					<view class="card-box" :style="'background-image: url('+otherBg+');background-size: 100% auto;'">
						<!-- 	<image :src="otherBg" mode="widthFix" style="border-radius:16rpx;"></image> -->
						<view class="card flex  flex-wrap" style=" align-content: space-between;">
							<view class="flex  justify-between align-end" style="width: 100%;">
								<view class="">
									<text style="font-size:36rpx;color:#6A6A6A;">预估收益(瑞币)</text>
									<view class="">
										<text style="font-size:56rpx;color:#333333;">1</text>
									</view>
								</view>
								<view class="">
									<image :src="bgImage" mode="widthFix" style="width: 96rpx; height: 110rpx;"></image>
								</view>
							</view>
							<view class="flex  justify-between" style="width: 100%;">
								<view>
									<text style="font-size:36rpx;color:#6A6A6A;">销售额(元)</text>
									<view class="">
										<text style="font-size:56rpx;color:#333333;">2</text>
									</view>
								</view>
								<view class="">
									<text style="font-size:36rpx;color:#6A6A6A;">提成比例(%)</text>
									<view class="">
										<text style="font-size:56rpx;color:#333333;">3</text>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>

			</view>
		</view>
		<view class="flex flex-direction" style="height: 100vh;width:100vw;">
			<view class="member-line">
				<view class="line">
				</view>
			</view>
			<scroll-view class="flex-sub" scroll-y="true" style="height: 0;">
				<view class="member-box">
					<view class="member-head flex justify-between align-center">
						<view class="">
							自营店铺贡献榜
						</view>
						<view class="flex">
							<view class="">
								<text class="cuIcon-friend"></text>
							</view>
							<view class="">
								<text class="cuIcon-calendar"></text>
							</view>
							<view class="">
								<text class="cuIcon-recharge"></text>
							</view>
						</view>
					</view>
					<view class="flex member-list" v-for="index of 9" :key='index'>
						<view class="member-avatar text-center">
							<view class="avatar">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" height="80" border-radius="70"
								 :loading-img="IMAGE_URL + '/null05.png'" :error-img="IMAGE_URL + '/null05.png'" img-mode="aspectFill"></u-lazy-load>
							</view>
							<view class="">
								<text class="cuIcon-command"></text>
							</view>
						</view>
						<view class="list">
							<view class="title">
								<text>张威（本人）</text>
							</view>
							<view class="icon-box flex align-end">
								<view class="icon-item">
									<view class="">
										<text class="cuIcon-phone"></text> 12312312313
									</view>
									<view class="">
										<text class="cuIcon-friend"></text> 9
									</view>
								</view>
								<view class="icon-item">
									<view class="">
										<text class="cuIcon-weixin"></text> 12312312313
									</view>
									<view class="">
										<text class="cuIcon-calendar"></text> 9
									</view>
								</view>
								<view class="icon-item">
									<view class="">
										<text class="cuIcon-recharge"></text> 9
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#16182B',
				},
				IMAGE_URL: this.IMAGE_URL,
				bgImage: '',
				badgeImage: '',
				otherBg: null,

				roleLevel: 0,
				end_time: "",
				time: '',

			}
		},
		created() {

			this.roleLevel = this.$store.state.roleLevel
			this.otherBg = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')
			this.badgeImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')
		},
		mounted() {


		},

		methods: {
			chooseTime(e) {
				this.time = e.detail.value
				console.log(e)
				// this.getInfo()
			},
			getToday() {
				let today = new Date()
				let Y = today.getFullYear()
				let D = today.getDate()
				let M = today.getMonth() + 1
				if (M === 1) {
					M = 12
					Y = Y - 1
				}
				if (M < 10) {
					M = '0' + M
				}
				let newDate = Y + "-" + M
				// console.log(newDate)
				return newDate
			},
		},
		onLoad(options) {
			console.log(options)
			this.end_time = this.time = this.getToday()
			// this.getInfo()
		},
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		width: 750rpx;
		min-height: 440rpx;
		background-size: 100% auto;
		background-repeat: no-repeat;
		padding: 20rpx 30rpx;
	}

	.time-box {
		line-height: 60rpx;

		color: #AAAAAA;

		.time {
			border-radius: 40rpx;
			padding: 0 10rpx 0 20rpx;
		}

	}

	.card-box {
		width: 690rpx;
		margin: 20rpx auto;
		position: relative;
		padding: 30rpx 40rpx 40rpx 40rpx;
		// .card {
		// 	position: absolute;
		// 	padding: 30rpx 40rpx 40rpx 40rpx;
		// 	top: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	left: 0;
		// }

	}

	.member-line {
		width: 722rpx;
		margin: 20rpx auto 0;
		padding: 6rpx 8rpx;
		background: #E3E3E3;
		box-shadow: 0rpx 4rpx 8rpx 0px rgba(0, 0, 0, 0.25);
		border-radius: 14rpx;
		z-index: 10;

		.line {
			width: 706rpx;
			height: 8rpx;
			background: #6A6A6A;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.39);
			border-radius: 14rpx;
			opacity: 0.31;
		}
	}

	.member-box {
		margin: 0 30rpx;
		position: relative;
		top: -6rpx;
		z-index: 100;
		padding: 0 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.11);

		.member-head {
			padding: 48rpx 0 20rpx 0;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.member-list {
			.member-avatar {
				padding: 20rpx 0 30rpx 0;
				width: 80rpx;
				margin-right: 22rpx;

				.avatar {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.list {
				padding: 26rpx 0;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				border-bottom: 2rpx solid #EEEEEE;

				.title {
					font-size: 28rpx;
					color: #333333;
				}

				.icon-box {
					font-size: 22rpx;
					color: #999999;

					.icon-item {
						min-width: 165rpx;
						margin-right: 30rpx;
						padding-bottom: 12rpx;

					}
				}

			}
		}
	}
</style>
