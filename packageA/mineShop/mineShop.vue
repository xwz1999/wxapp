<template>
	<view style="height: 100vh;">
		<u-navbar :title="navTitle"></u-navbar>
		<view class="flex flex-direction" style="height: 100%;">
			<view class="" style="position: relative;">
				<view class="search-box bg-white flex justify-between">
					<input class="flex-sub" type="text" v-model="keyword" placeholder-class="placeholder" @confirm="inputSend"
					 placeholder="请输入昵称/备注/手机号" />
					<text class="cuIcon-search"></text>
				</view>
			</view>

			<view class="member-box">
				<view class="member-title flex justify-between">
					<view class="" style="width: 360rpx;">
						<text>团队贡献榜{{list.length}}</text>
					</view>
					<view class="flex">
						<text>团队人数：{{totalCount}}</text>
						<view class="" v-if="navTitle === '我的团队'">
							<view class="screen-box">
								<view class="screen" @click="screen()">

									<view class="fill row-translateX" :class="{'translateX':isTranslateX}">
										<text v-if="isTranslateX">推荐</text>
										<text v-else>筛选</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="member-table ">
					<scroll-view scroll-y="true" class="scroll flex-sub">
						<view class="member-list flex" v-for="(item,index) in screenList" :key='index' @tap="toUserInfo(item)">
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
										{{item.nickname}}
									</view>
									<view class="" style="width: 50%;padding: 10rpx 0;">
										{{item.count}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>



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
				"isTranslateX": false,
				url: '', //设置请求接口
				checked: false,
				navTitle: '',
				totalCount: 0 //团队人数
			};
		},
		computed: {
			// 筛选错 flag
			screenList() {
				let params = this.list
				if (this.isTranslateX) {
					params = params.filter(item => item.flag > 0)
				}
				return params
			}
		},
		methods: {
			inputSend(e) {
				this.keyword = e.detail.value
				this.userShop()
			},
			screen() {
				this.isTranslateX = !this.isTranslateX
				console.log(this.isTranslateX)
			},
			userShop() {
				// 
				// url
				this.$u.post(`/api/v2/app/user/${this.url}`, {
					keyword: this.keyword
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.list = res.data.data
					let total = 0
					this.list.map(item => {
						total += item.count
					})
					this.totalCount = total
				});

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

			this.userShop()

			switch (options.url) {
				case 'team':
					this.navTitle = '我的团队'
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

				this.userShop()
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

	.row-translateX {
		transition-duration: 0.3s;
		transform: translateX(0px);
	}

	.translateX {

		background: #FD6661;
		transform: translateX(45rpx);
	}

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
