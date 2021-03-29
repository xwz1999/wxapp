<template>
	<view style="height: 100vh;">
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 80vh;">
			<image :src="IMAGE_URL + '/null05.png'" style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无邀请</view>
		</view>
		<view v-else class="flex flex-direction" style="height: 100%;">
			<view class="search-box bg-white flex justify-between">
				<input class="flex-sub" type="text" v-model="keyword" placeholder-class="placeholder" @confirm="inputSend"
				 placeholder="请输入昵称/备注/手机号" />
				<text class="cuIcon-search"></text>
			</view>
			<scroll-view scroll-y="true" class="scroll flex-sub" style="height: 0;">
				<view class="flex member-list" v-for="(item,index) in list" :key='index' @click="toGiveCard(item.userId)">
					<view class="member-avatar text-center">
						<view class="avatar">
							<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" height="80" border-radius="70"
							 :loading-img="IMAGE_URL + '/null05.png'" :error-img="IMAGE_URL + '/null05.png'" img-mode="aspectFill"></u-lazy-load>
						</view>
					</view>
					<view class="list" style="flex: 1;">
						<view class="flex align-start">
							<view class="title flex-sub">
								<text>{{item.nickname}}</text>
							</view>
							<view class="">

							</view>
						</view>
						<view class="icon-box flex align-end">
							<view class="icon-item">
								<view class="">
									<text class="cuIcon-weixin"></text>
									<text>{{item.wechatNo?item.wechatNo:'-'}}</text>
					
								</view>
								<view class="">
									<text class="cuIcon-friend"></text>
									<text>{{item.roleLevel | roleFilter('txt')}}</text>
								</view>
							</view>
							<view class="icon-item">
								<view class="">
								<text class="cuIcon-phone"></text>
								<text>{{item.phone}}</text>
								</view>
								<view class="">
									<text class="cuIcon-friend"></text>
									<text>{{item.count}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="peoples-box">
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
				</view> -->
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
				cardId:null,
			};
		},
		onShow() {
			this.getInviteList()
		},
		onLoad(option) {
			console.log(option)
			if(option.cardId){
				this.cardId = parseInt(option.cardId)
			}
		},
		methods: {
			toGiveCard(id){
				const that = this
				uni.showModal({
				    title: '提示',
				    content: '是否确定赠送卡片？',
				    success: (res) =>{
				        if (res.confirm) {
				           uni.navigateTo({
				           	url: `../cardPackage/userCard?cardId=${that.cardId}&giveUserId=${id}`
				           })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});	
	
			},
			inputSend(e) {
				this.keyword = e.detail.value
				if (e.detail.value) {
					this.getInviteList()
				}
			},
			getInviteList() {
				this.$u.post(`/api/v2/app/user/team`, {
					keyword: this.keyword
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

	.member-list {
		padding: 0 30rpx;
		margin: 20rpx 0;
		background: #FFFFFF;
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
			.title {
				font-size: 32rpx;
				color: #333333;
			}

			.icon-box {
				font-size: 26rpx;
				color: #999999;
				.icon-item {
					width: 50%;
					
					padding-bottom: 30rpx;

					text {
						padding-right: 8rpx;
					}
				}
			}

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
