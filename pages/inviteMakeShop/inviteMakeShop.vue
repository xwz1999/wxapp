<template>
	<view>
		<view class="top-bg bg-img" :style="'background-image: url('+STATIC_URL+'invite-bg.png);'">
			<view class="top-con flex flex-direction  align-center">
				<view class="text-white" style="font-size: 90rpx;font-weight: 700;">邀好友 升店主</view>
				<view class="text-black bg-white" style="font-size: 24rpx;line-height: 35rp;border-radius: 18rpx;padding: 0 60rpx;">仅需10位</view>
			</view>
		</view>
		<view class="user-box bg-img" :style="'background-image: url('+STATIC_URL+'bg02.png);'">
			<view class="user-con text-white">
				<view class="flex">
					<image class="avatar" v-if="userInfo.headImgUrl" :src="IMAGE_URL+userInfo.headImgUrl" mode="aspectFill"></image>
					<view class="user-name" style="margin-top: 10rpx;">{{userInfo.nickname}}</view>
				</view>
			</view>
			<view class="line-box">
				<view class="text-white flex" style="line-height: 60rpx;font-size: 24rpx;">
					已邀请 <text style="margin-left: 10rpx;"></text>{{hasInviteNum}}
				</view>
				<u-line-progress :show-percent="false" height="8" :percent="percent" active-color="#fff" inactive-color="#991323"></u-line-progress>
				<view class="flex text-white num-con">
					<view class="flex-sub" v-for="(item,index) in 10" :key="index">
						<view class="flex flex-direction align-center" v-if="index==0||index==3||index==7||index==9">
							<i class="iconfont iconsanjiao" style="font-size: 48rpx;"></i>
							<view class="">{{index+1}}人</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="code-box bg-white">
			<view class="code-top">
				<view class="flex justify-center align-center" style="margin-bottom: 15rpx;">
					<image src="../../static/shop/left.png" mode="widthFix"></image>
					<view style="padding: 0 20rpx;font-weight: 700;">专属邀请码</view>
					<image src="../../static/shop/right.png" mode="widthFix"></image>
				</view>
				<view class="flex justify-center align-center">
					<view class="invitationNo">{{invitationNo}}<text class="text-red copy" v-if="invitationNo" @tap="copy">复制</text></view>
				</view>
			</view>
			<view class="code-bottom">
				<view class="txt">专属权益</view>
				<view class="item flex align-center">
					<image src="../../static/shop/01.png" mode="widthFix"></image>
					<view class="">
						<view class="txt">自购收益</view>
						<view class="num">自己购物，平台返还5%-50%佣金</view>
					</view>
				</view>
				<view class="item flex align-center">
					<image src="../../static/shop/02.png" mode="widthFix"></image>
					<view class="">
						<view class="txt">导购收益</view>
						<view class="num">分享商品链接，用户购买无退货获得佣金</view>
					</view>
				</view>
				<view class="item flex align-center">
					<image src="../../static/shop/03.png" mode="widthFix"></image>
					<view class="">
						<view class="txt">0元开店</view>
						<view class="num">零成本、零库存、零风险、零门槛
						</view>
					</view>
				</view>
				<view class="item flex align-center">
					<image src="../../static/shop/04.png" mode="widthFix"></image>
					<view class="">
						<view class="txt">专属培训</view>
						<view class="num">享受专属老师教授营销技巧，轻松创业</view>
					</view>
				</view>
				<template v-if="roleLevel!=500">
					<view class="item flex align-center">
						<image src="../../static/shop/05.png" mode="widthFix"></image>
						<view class="">
							<view class="txt">店主晋升</view>
							<view class="num">有机会晋升至白银店铺，享受团队红利</view>
						</view>
					</view>
					<view class="item flex align-center">
						<image src="../../static/shop/06.png" mode="widthFix"></image>
						<view class="">
							<view class="txt">权益卡包</view>
							<view class="num">有机会获得权益卡，畅享升级或保级绿色通道</view>
						</view>
					</view>
				</template>
			</view>
		</view>


		<view class="steps-box bg-white">
			<view class="flex justify-center align-end" style="padding: 15rpx 0;">
				<image src="../../static/shop/left1.png" mode="widthFix"></image>
				<view class="step-title">简单三步 立享财富</view>
				<image src="../../static/shop/right2.png" mode="widthFix"></image>
			</view>
			<view class="steps-con flex justify-center">
				<view class="flex flex-direction align-center">
					<image src="../../static/shop/icon01.png" mode="widthFix"></image>
					<view class="">分享链接</view>
					<view class="">给好友</view>
				</view>
				<view class="line"></view>
				<view class="flex flex-direction align-center">
					<image src="../../static/shop/icon02.png" mode="widthFix"></image>
					<view class="">好友打开链接</view>
					<view class="">注册信息</view>
				</view>
				<view class="line"></view>
				<view class="flex flex-direction align-center">
					<image src="../../static/shop/icon03.png" mode="widthFix"></image>
					<view class="">好友下载APP</view>
					<view class="">邀请成功</view>
				</view>
			</view>
		</view>

		<button class="text-white" style="background-color: #D5101A;height: 88rpx;line-height: 88rpx; font-size: 30rpx; margin:0 30rpx 100rpx;"
		 open-type="share">马上去邀请</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				roleLevel: 500,
				userInfo: {
					nickname: "",
					headImgUrl: ""
				},
				invitationNo: "",
				percent: 0,
				hasInviteNum: 0
			};
		},
		onLoad() {
			this.roleLevel = uni.getStorageSync("userInfo").roleLevel
			this.userInfo.nickname = uni.getStorageSync("userInfo").nickname
			this.userInfo.headImgUrl = uni.getStorageSync("userInfo").headImgUrl
			this.invitationNo = uni.getStorageSync("userInfo").invitationNo
			this.getInviteNum()
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.invitationNo,
					success: function() {
						console.log('success');
					}
				});
			},
			//查询已经邀请的人数
			getInviteNum() {
				this.$u.post('/api/v1/users/profile/invite/count').then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
					}
					this.hasInviteNum = res.data.data.count
					if (this.hasInviteNum <= 10) {
						this.percent = this.hasInviteNum * 10
					} else {
						this.percent = 100
					}
					console.log(this.percent)
				});
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '阿库网络公司正在邀请您加入瑞库客，0成本带您玩转副业',
				path: '/pages/mobileLogin/mobileLogin?invitationNo=' + this.invitationNo,
				imageUrl: this.STATIC_URL + 'invite.jpg'
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #3A3943;
	}

	.top-bg {
		position: relative;
		height: 480rpx;
	}

	.top-con {
		position: absolute;
		width: 100%;
		left: 0;
		top: 40rpx;
	}

	.user-box {
		position: relative;
		top: -50rpx;
		left: 30rpx;
		width: 690rpx;
		height: 386rpx;
		border-radius: 10rpx;
		overflow: hidden;

		.user-con {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 35rpx;

			.avatar {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}

		.line-box {
			position: absolute;
			bottom: 40rpx;
			width: 590rpx;
			left: 50rpx;
			font-size: 24rpx;

			.num-con {
				position: relative;
				top: -16rpx;
			}
		}
	}

	.code-box {
		margin: 0 30rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		overflow: hidden;

		.code-top {
			padding: 40rpx 0;

			image {
				width: 136rpx;
			}
		}

		.code-bottom {
			padding: 30rpx 20rpx;
			border-top: 1rpx solid #F1F1F1;

			.item {
				height: 100rpx;
				font-size: 24rpx;

				image {
					width: 60rpx;
					margin-right: 20rpx;
				}
			}

			.txt {
				color: #333333;
				font-weight: 700;
				line-height: 45rpx;
			}

			.num {
				color: #aaa;
			}
		}
	}

	.steps-box {
		border-radius: 10rpx;
		padding: 30rpx 0;
		margin: 40rpx 30rpx;

		image {
			width: 60rpx;
		}

		.step-title {
			color: #000;
			font-weight: 900;
			line-height: 55rpx;
			padding: 0 10rpx;
		}

		.steps-con {
			line-height: 30rpx;
			font-size: 20rpx;

			.line {
				width: 100rpx;
				margin: 40rpx 10rpx 0;
				border-top: 2rpx dashed #E53935;
			}

			image {
				width: 80rpx;
			}
		}
	}

	.invitationNo {
		position: relative;
		font-size: 48rpx;
		color: #333;
		line-height: 60rpx;
		font-weight: 700;

		.copy {
			font-size: 20rpx;
			margin-left: 10rpx;
			text-decoration: underline;
			position: absolute;
			left: 100%;
			bottom: 0;
			white-space: nowrap;
		}

	}
</style>
