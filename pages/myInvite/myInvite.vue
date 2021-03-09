<template>
	<view style="height: 100vh;">
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 80vh;">
			<image :src="IMAGE_URL + '/null05.png'"  style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无邀请</view>
		</view>
		<view v-else class="flex flex-direction" style="height: 100%;">
			<view class="search-box bg-white flex justify-between">
				<input class="flex-sub" type="text" v-model="keyword" placeholder-class="placeholder" placeholder="请输入昵称/备注/手机号" />
				<text class="cuIcon-search"></text>
			</view>
			<scroll-view scroll-y="true" class="scroll flex-sub" style="height: 0;">
				<view class="peoples-box">
					<view class="people flex bg-white" v-for="(item,index) in list" :key="index" @tap="toUserInfo(item)">
						<view class="pic bg-img" :style="'background-image: url('+IMAGE_URL+item.headImgUrl+');'"></view>
						<view class="name-con flex-sub flex flex-direction justify-around">
							<view class="name text-black">{{item.nickname}}<text class="cuIcon-post text-red" style="margin-left: 5rpx;"></text></view>
							<view class="flex" style="color: #999;font-size: 24rpx;">
								<view class="" style="margin-right: 40rpx;">{{item.phoneNum}}</view>
								<view class="">{{item.date}}</view>
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
				isNull: false
			};
		},
		onShow() {
			this.getInviteList()
		},
		methods: {
			getInviteList() {
				this.$u.post('/api/v1/users/profile/invite/list', {
					userID: uni.getStorageSync("userInfo").id,
					SearchCond: this.keyword
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.list = res.data.data
					if (this.list.length == 0) {
						this.isNull = true
						return
					}
					this.list.map(item => item.date = item.createdAt.split(" ")[0])
				});
			},
			toUserInfo(item) {
				this.$store.commit('setUserInfo', item);
				uni.navigateTo({
					url: "../userInfo/userInfo"
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
