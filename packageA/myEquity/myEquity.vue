<template>
	<view class="equityShow">
		<view class="userInfo">
			<view class="avatar">
				<u-lazy-load threshold="-100" :image="IMAGE_URL+userInfo.headImgUrl" :index="index" height="140"
					border-radius="70" :loading-img="IMAGE_URL+'/null05.png'" :error-img="IMAGE_URL+'/null05.png'"
					img-mode="aspectFill"></u-lazy-load>
			</view>
			<view class="info">
				<view class="name">
					{{userInfo.nickname}}
				</view>
				<view class="levelBox">
					<image :src="iconPic" mode="widthFix" style="width: 24rpx;"></image>
					<view style="margin-left: 3rpx;">{{role}}</view>
				</view>
			</view>
		</view>
		<image :src="IMAGE_URL+equityImage" mode="widthFix" style="width: 100vw;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				bgImage: this.STATIC_URL + 'bg01.png',
				isLogin: false,
				iconPic: "",
				role: "",
				equityImage: '',
				userInfo: {
					nickname: "",
					headImgUrl: ""
				}
			};
		},
		onLoad() {
			this.getUserInfo()
		},
		onShow() {
			if (uni.getStorageSync("auth")) {
				this.isLogin = true
				this.userInfo.nickname = uni.getStorageSync("userInfo").nickname
				this.userInfo.headImgUrl = uni.getStorageSync("userInfo").headImgUrl
			}
		},
		methods: {
			//获取我的全部信息
			getUserInfo() {
				this.$u.post('/api/v1/users/profile/my_info', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
					if (!this.info) {
						return
					}
					this.roleLevel = this.info.roleLevel
					switch (this.roleLevel) {
						case 500:
							this.role = "会员"
							// this.bgImage = this.STATIC_URL + 'bg01.png'
							this.iconPic = this.STATIC_URL +'mine/level00.png'
							this.bgImage = this.STATIC_URL + "role00.png"
							this.equityImage = '/uni-program/equity/equityMember.jpg'
							break;
						case 400:
							this.role = "店主"
							// this.bgImage = this.STATIC_URL + 'bg02.png'
							this.iconPic = this.STATIC_URL +'mine/level01.png'
							this.bgImage = this.STATIC_URL + "role01.png"
							this.equityImage = '/uni-program/equity/equityShopOwner.jpg'
							break;
						case 300:
							this.role = "白银店铺"
							// this.bgImage = this.STATIC_URL + 'bg03.png'
							this.iconPic = this.STATIC_URL +'mine/level02.png'
							this.bgImage = this.STATIC_URL + "role02.png"
							this.equityImage = '/uni-program/equity/equitySilver.jpg'
							break;
						case 200:
							this.role = "黄金店铺"
							// this.bgImage = this.STATIC_URL + 'bg04.png'
							this.iconPic = this.STATIC_URL +'mine/level03.png'
							this.bgImage = this.STATIC_URL + "role03.png"
							this.equityImage = '/uni-program/equity/equityGold.jpg'
							break;
						case 100:
							this.role = "钻石店铺"
							// this.bgImage = this.STATIC_URL + 'bg05.png'
							this.iconPic = this.STATIC_URL +'mine/level04.png'
							this.bgImage = this.STATIC_URL + "role04.png"
							this.equityImage = '/uni-program/equity/equityDiamonds.jpg'
							break;
						default:
							break;
					}

				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.equityShow {
		margin-top: -60rpx;

		.userInfo {
			position: absolute;
			top: 30rpx;
			width: 100%;
			padding: 0 30rpx;
			display: flex;
			z-index: 1;

			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.info {
				.name {
					font-size: 42rpx;
					margin: 10rpx 0;
					color: #fff;
				}

				.levelBox {
					color: #B25E34;
					background-color: #F5CA88;
					height: 36rpx;
					line-height: 36rpx;
					border-radius: 20rpx;
					padding: 0 20rpx;
					font-size: 20rpx;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>
