<template>
	<view style="height: 100vh;">
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 80vh;">
			<image :src="IMAGE_URL + '/null05.png'" style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无邀请</view>
		</view>
		<view v-else class="flex flex-direction" style="height: 100%;">
			<view class="search-box bg-white flex justify-between">
				<input class="flex-sub" type="text" v-model="keyword" placeholder-class="placeholder" placeholder="请输入昵称/备注/手机号" />
				<text class="cuIcon-search"></text>
			</view>
			<scroll-view scroll-y="true" class="scroll flex-sub" style="height: 0;">
				<view class="peoples-box">
					<view class="member-box">
						<!-- <view class="pic bg-img" :style="'background-image: url('+IMAGE_URL+item.headImgUrl+');'"></view>
						<view class="name-con flex-sub flex flex-direction justify-around">
							<view class="name text-black">{{item.nickname}}<text class="cuIcon-post text-red" style="margin-left: 5rpx;"></text></view>
							<view class="flex" style="color: #999;font-size: 24rpx;">
								<view class="" style="margin-right: 40rpx;">{{item.phoneNum}}</view>
								<view class="">{{item.date}}</view>
							</view>
						</view> -->
						<view class="member-title flex">
							<view class="" style="width: 360rpx;">
								<text>团队贡献榜{{list.length}}</text>
							</view>
							<view class="" style="flex: 1;">
								<text>团队人数：{{list.length +1}}</text>
							</view>
							<view class="">
								<u-switch v-model="checked"></u-switch>
							</view>
						</view>
						<view class="member-table ">
							<view class="member-list flex" v-for="(item,index) in list" :key='index' @tap="toUserInfo(item)">
								<view class="">
									<view class="avatar">
										<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" height="80" border-radius="50%"
										 :loading-img="IMAGE_URL + '/null05.png'" :error-img="IMAGE_URL + '/null05.png'" img-mode="aspectFill"></u-lazy-load>
									</view>
								</view>
								<view class="" style="flex:1">
									<view class="flex justify-between">
										<view class="user-name">
											{{item.nickname}}
										</view>
										<!-- 	<view class="user-price">
												{{item.amount}}
											</view> -->
									</view>
									<view class="flex align-center flex-wrap">
										<view class="" style="width: 50%;padding: 10rpx 0;">
											{{item.wechatNo}}
										</view>
										<view class="" style="width: 50%;padding: 10rpx 0;">
											{{item.phone}}
										</view>
										<view class="" style="width: 50%;padding: 10rpx 0;">
											{{item.roleLevel}}
										</view>
										<view class="" style="width: 50%;padding: 10rpx 0;">
											{{item.count}}
										</view>
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
				IMAGE_URL: this.IMAGE_URL,
				keyword: "",
				list: [],
				isNull: false,
				checked:false
			};
		},
		onShow() {
			this.userShop()
		},
		methods: {
			userShop() {
				this.$u.post('/api/v2/app/user/team', {
					keyword: this.keyword
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.list = res.data.data
					// if (this.list.length == 0) {
					// 	this.isNull = true
					// 	return
					// }
					// this.list.map(item => item.date = item.createdAt.split(" ")[0])
				});
				// this.$u.post('/api/v1/users/profile/invite/list', {
				// 	userID: uni.getStorageSync("userInfo").id,
				// 	SearchCond: this.keyword
				// }).then(res => {
				// 	console.log(res);
				// 	if (res.data.code == "FAIL") {
				// 		this.$u.toast(res.data.msg);
				// 		return
				// 	}
				// 	this.list = res.data.data
				// 	if (this.list.length == 0) {
				// 		this.isNull = true
				// 		return
				// 	}
				// 	this.list.map(item => item.date = item.createdAt.split(" ")[0])
				// });
			},
			toUserInfo(item) {
				this.$store.commit('setUserInfo', item);
				uni.navigateTo({
					url: "../../pages/userInfo/userInfo"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100vw;
		height: 100vh;
	}

	.member-box {
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
			// margin-bottom: 20rpx;
			margin-top: 30rpx;
			padding: 30rpx 40rpx 0rpx 40rpx;
			// padding: 40rpx 0 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
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

	.people {
		padding: 20rpx;
		margin: 0 30rpx 20rpx;
		border-radius: 10rpx;

		.pic {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		&:last-child {
			margin-bottom: 200rpx;
		}
	}
</style>
