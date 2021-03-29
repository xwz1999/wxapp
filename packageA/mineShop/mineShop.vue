<template>
	<view class="flex flex-direction" style="height: 100vh;width:100vw;">
		<u-navbar title="我的店铺"></u-navbar>
		<view class="card-box" :style="'background-image: url('+bgImage+');background-size: 100% auto;'">
			<view class="flex justify-center" style="height: 200rpx; padding: 40rpx;">
				<view class="">
					<image :src="badgeImage" mode="widthFix" style="width: 96rpx;"></image>
				</view>
			</view>
			<view class="foot-box flex  align-center">
				<view class="item" @click="cardChange(0,'team')" :class="cardIndex === 0?'active':''">
					<view class="">
						自营补贴
					</view>
				</view>
				<view class="foot-line">

				</view>
				<view class="item" @click="cardChange(1,'recommend')" :class="cardIndex === 1?'active':''">
					<view class="">
						分销店铺
					</view>
				</view>
				<view class="foot-line">

				</view>
				<view class="item" @click="cardChange(2,'reward')" :class="cardIndex === 2?'active':''">
					<view class="">
						代理店铺
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="search-box bg-white flex justify-between">
				<input class="flex-sub" type="text" v-model="keyword" placeholder-class="placeholder" @confirm="inputSend"
				 placeholder="请输入昵称/备注/手机号" />
				<text class="cuIcon-search"></text>
			</view>
			<view class="member-line">
				<view class="line">
				</view>
			</view>
		</view>
		<scroll-view class="flex-sub" scroll-y="true" style="height: 0;" :refresher-threshold="100" :refresher-enabled='refresherEnabled'
		 @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"
		 :refresher-triggered="triggered">

			<!-- 	<view class="member-line">
				<view class="line">
				</view>
			</view> -->
			<view>
				<view class="member-box">
					<view class="member-head flex justify-between align-center">
						<view class="">
							自营店铺贡献榜
						</view>
						<view class="flex">
							<view class="">
								<text class="cuIcon-friend"></text><text style="font-weight: 400;">{{totalMember}}</text>
							</view>
						</view>
					</view>
					<view class="flex member-list" v-for="(item,index) in memberList" :key='index'>
						<view class="member-avatar text-center">
							<view class="avatar">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" height="80" border-radius="70"
								 :loading-img="IMAGE_URL + '/null05.png'" :error-img="IMAGE_URL + '/null05.png'" img-mode="aspectFill"></u-lazy-load>
							</view>
							<view class="">
								<text class="cuIcon-command"></text>
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
										<text class="cuIcon-phone"></text>
										<text>{{item.phone}}</text>
									</view>
									<view class="">
										<text class="cuIcon-friend"></text>
										<text>{{item.count}}</text>
									</view>
								</view>
								<view class="icon-item">
									<view class="">
										<text class="cuIcon-weixin"></text>
										<text>{{item.wechatNo?item.wechatNo:'-'}}</text>
									</view>
									<view class="">
										<text class="cuIcon-recharge"></text>
										<text>{{item.amount}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 开启下拉
				refresherEnabled: true,
				//
				triggered: false,
				url: '', //设置请求接口
				navTitle: '',
				IMAGE_URL: this.IMAGE_URL,
				bgImage: this.STATIC_URL + 'bg01.png',
				roleLevel: 0,
				badgeImage: '',
				end_time: "",
				cardIndex: 0,
				keyword: '',
				memberList: [],
				totalMember: 0
			};
		},
		created() {
			this.roleLevel = this.$store.state.roleLevel
			this.bgImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'otherBg')
			this.badgeImage = this.IMAGE_URL + this.$options.filters['roleFilter'](this.roleLevel, 'badge')

		},
		methods: {
			//下拉过程的函数
			onPulling(e) {},
			//松手后执行下拉事件的函数
			onRefresh() {
				console.log('onRefresh')
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.getData()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			//结束下拉函数
			onAbort() {
				console.log('onAbort')
			},
			inputSend(e) {
				this.keyword = e.detail.value
				if (e.detail.value) { //有输入值
					this.getData()
				}
			},
			cardChange(index, url) {
				if (index === this.cardIndex) return //重复点击无效
				this.cardIndex = index
				this.url = url
				this.getData()
			},
			// 请求后台
			getData() {
				this.$u.post(`/api/v2/app/user/${this.url}`, {
					keyword: this.keyword
				}).then(res => {
					console.log(res)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.memberList = res.data.data
					let num = 0
					this.memberList.map(item => {
						num += item.count
					})
					this.totalMember = num
				});
			},

		},
		onLoad(options) {
			console.log(options)
			this.url = options.url
			this.getData()
			// switch (options.url) {
			// 	case 'team':
			// 		this.navTitle = '我的店铺'
			// 		break;
			// 	case 'recommend':
			// 		this.navTitle = '我的推荐'
			// 		break;
			// 	case 'reward':
			// 		this.navTitle = '我的奖励'
			// 		break;
			// 	default:
			// 		break;
			// }
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

	.card-box {
		width: 608rpx;
		height: 304rpx;
		overflow: hidden;
		border-radius: 8rpx;
		margin: 40rpx auto;
		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	}

	.card-title {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;

		.txt {
			font-size: 32rpx;
			color: rgba(58, 57, 67, 0.5);
		}

		.num {
			font-size: 68rpx;
			color: rgba(58, 57, 67, 1);
		}
	}

	.foot-box {
		height: 124rpx;
		background: #FCFCFC;

		.item {
			text-align: center;
			flex: 1;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;

			&.active {
				color: #333333;
			}
		}

		.foot-line {
			width: 2rpx;
			height: 44rpx;
			background: #D8D8D8;
			border: 2rpx solid #979797;
		}
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
		// .cuIcon-*{

		// }
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

						text {
							padding-right: 8rpx;
						}
					}
				}

			}
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
