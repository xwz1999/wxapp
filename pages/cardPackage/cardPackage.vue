<template>
	<view class="flex flex-direction" style="height: 100vh;">
		<view class="" style="border-bottom: 1rpx solid #f1f1f1;">
			<u-tabs :list="list" :is-scroll="false" height="90" :current="currentIndex" duration="0.2" bar-width="100" :bold="false"
			 active-color="red" @change="chooseTabs"></u-tabs>
		</view>
		<swiper class="flex-sub" :current="currentIndex" :duration="300" :indicator-dots="false" :autoplay="false" @change="changeCurrent">
			<swiper-item v-for="(item1,index1) in list" :key="index1">
				<scroll-view  style="height: 100%;" @scrolltolower='cardMore' scroll-y="true" :refresher-threshold="100" :refresher-enabled='refresherEnabled'
		 @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"
		 :refresher-triggered="triggered">
					<view class="null flex-sub flex flex-direction justify-center align-center" v-if="cards.length==0" style="height: 70vh;">
						<image :src="IMAGE_URL + '/null05.png'" style="width: 300rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无卡券</view>
					</view>
					<view v-else class="">
						<view class="card-box">
							<view v-for="(item2,index2) in cards" :key="index2">
								<!-- 未使用 -->
								<view v-if="currentIndex === 0" class="card-item bg-img" :style="'background-image: url('+IMAGE_URL+`/card${item2.type}.png);`">
									<view class="con-left flex flex-direction justify-between text-colorA">
										<view class="con-top">
											<view style="font-size: 36rpx;font-weight: 900;">{{item2.type===1?'黄金卡':'白银卡'}}</view>
											<view style="font-size: 28rpx;">{{item2.type===1?'Gold':'Sliver'}} Card</view>
										</view>
										<view class="">
											<view class="con-bottom">编号{{item2.code}}</view>
											<view style="font-size: 24rpx;">{{item2.scourceName}}</view>
										</view>
									</view>
									<view class="con-btn flex flex-direction justify-center">
										<view class="btn-item text-white" @tap="useCard(item2.id,item2.type)">使用</view>
										<view class="btn-item text-white" @tap="sendCard(item2.id)">赠送</view>
									</view>
									<view class="">

									</view>
								</view>
								<!-- 已使用 -->
								<view class="" v-if="currentIndex === 1">
									<view class="used-card">
										<view class="used-li flex align-center">
											<view class="used-lf">
												<text>卡类型：</text>
											</view>
											<view class="used-rg">
												<text>{{item2.type===1?'黄金卡':'白银卡'}}</text>
											</view>
										</view>
										<view class="used-li flex align-center">
											<view class="used-lf">
												<text>编号：</text>
											</view>
											<view class="used-rg">
												<text>{{item2.code}}</text>
											</view>
										</view>
										<view class="used-li flex align-center">
											<view class="used-lf">
												<text>使用时间：</text>
											</view>
											<view class="used-rg">
												<text>{{ (item2.useAt*1000)|formatDate('datetime')}}</text>
											</view>
										</view>
										<view class="used-li flex align-center">
											<view class="used-lf">
												<text>发放时间：</text>
											</view>
											<view class="used-rg">
												<text>{{(item2.createdAt*1000) |formatDate('datetime')}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
							<u-loadmore :status="loadStatus2" margin-top="10" margin-bottom="20" />
					</view>
				
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-modal v-model="modalShow" :confirm-text="`使用${cardType}卡`" @confirm="confirm" cancel-text='取消' :show-cancel-button='true'
		 confirm-color='#DD2C4E'>
			<view class="slot-content">
				<view class="">
					<view class="" style="padding:30rpx 20rpx;">
						<view class="" style="padding: 20rpx 0;">
							<text>{{cardType}}卡使用后将于{{checkDate | formatDate('checkDate')}}考核时生效</text>
						</view>
						<view style="color:#DD2C4E;">
							您使用了{{cardType}}卡，将于下月1日生效，若店铺考核未达到{{cardType}}考核标准,则消耗一张{{cardType}}卡成为{{cardType}}店铺，享受{{cardType}}店铺权益；若店铺考核达到{{cardType}}店铺标准，则{{cardType}}卡将返还至您的卡包。
						</view>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				modalShow: false,
				cardType: '', //卡片类型 黄金或者白银
				list: [{
					name: '未使用',
					cards: []
				}, {
					name: '已使用',
					cards: []
				}],
				currentIndex: 0,
				cards: [],
				page: 1,
				limit: 10,
				loadStatus2: 'loadmore',
				moreShow: false,
				checkDate:null   ,//考核日期
				// 开启下拉
				refresherEnabled: true,
				//
				triggered: false,
				cardId:0,
				
			};
		},
		created() {
				this.checkDate= new Date();
		},
		onLoad() {
			this.getCardList()
		},
		methods: {
			//下拉过程的函数
			onPulling(e) {
			},
			//松手后执行下拉事件的函数
			onRefresh() {
				console.log('onRefresh')
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page  = 1
				this.cards = []
				 this.getCardList()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			//结束下拉函数
			onAbort() {
				console.log('onAbort')
			},
			// 加载更多
			cardMore() {
				if (this.moreShow) {
					this.page++
					this.getCardList()
				}
			},
			getCardList() {
				this.loadStatus2 = "loading"
				let sendData = {
					page: this.page,
					limit: this.limit,
					type: this.currentIndex,
				}
				this.$u.post('/api/v2/app/user/welfare/lists', sendData).then(res => {
					console.log(res)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.list
					if (list.length < this.limit) {
						this.moreShow = false
						this.loadStatus2 = "nomore"
						this.cards.push(...list)
						return
					}
					this.moreShow = true
					this.cards.push(...list)
				})
			},
			useCard(id, type) {
				this.modalShow = true
				this.cardId = id
				this.cardType = type === 1 ? '黄金' : '白银'
				// this.$u.toast("功能暂未开放，敬请期待~");
			},
			confirm(){
				// 使用卡片
				console.log(this.cardId)
				uni.navigateTo({
					url: "../cardPackage/userCard?cardId=" + this.cardId
				})
			},
			sendCard(id) {
				uni.navigateTo({
					url: "/packageA/myInvite/myInvite?cardId=" + id
				})
			},
			changeCurrent(e) {
				console.log(e)
				this.currentIndex = e.detail.current
				this.cards = []
				this.page = 1
				this.moreShow = false
				this.getCardList()

			},
			chooseTabs(index) {
				// console.log(index)
				this.currentIndex = index
				// this.cards = []
				// this.page = 1
				// this.moreShow = false
				// this.getCardList()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.card-box {
		padding: 20rpx 30rpx;

		.used-card {
			width: 686rpx;
			background: #FFFFFF;
			padding: 20rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			.used-li {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-bottom: 8rpx;

				.used-lf {
					width: 25%;
				}
			}
		}

		.card-item {
			width: 690rpx;
			height: 386rpx;
			margin-bottom: 20rpx;
			position: relative;

			.con-left {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				padding: 30rpx;
				padding-right: 0;

				.con-bottom {
					font-size: 32rpx;
					font-weight: 500;
				}
			}

			.text-colorA {
				color: #DD2C4E;
			}

			.text-colorB {
				color: #3151E1;
			}

			.con-btn {
				position: absolute;
				right: 30rpx;
				height: 100%;

				.btn-item {
					line-height: 70rpx;
					border-radius: 35rpx;
					border: 2rpx solid #ffffff;
					text-align: center;
					width: 160rpx;
					margin-bottom: 30rpx;

					&:last-child {
						margin: 0;
					}
				}
			}
		}
	}
</style>
