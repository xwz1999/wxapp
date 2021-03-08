<template>
	<view class="flex flex-direction" style="height: 100vh;">
		
		<view class="" style="border-bottom: 1rpx solid #f1f1f1;">
			<u-tabs :list="list" :is-scroll="false" height="90" :current="currentIndex" duration="0.2" bar-width="100" :bold="false"
			 active-color="red" @change="chooseTabs"></u-tabs>
		</view>
		
		
		<swiper class="flex-sub" :current="currentIndex" :duration="300" :indicator-dots="false" :autoplay="false" @change="changeCurrent">
			<swiper-item v-for="(item1,index1) in list" :key="index1">
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="null flex-sub flex flex-direction justify-center align-center" v-if="item1.cards.length==0" style="height: 70vh;">
						<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无卡券</view>
					</view>
					<view class="card-box" v-else>
						<view v-for="(item2,index2) in item1.cards" :key="index2">
							
							
							<!-- 未使用 -->
							<view v-if="index1==0" class="card-item bg-img" :style="item2.isUpcode?'background-image: url('+STATIC_URL+'card01.png);':'background-image: url('+STATIC_URL+'card02.png);'">
								<view v-if="item2.isUpcode" class="con-left flex flex-direction justify-between text-colorA">
									<view class="con-top">
										<view style="font-size: 36rpx;font-weight: 900;">升级卡</view>
										<view style="font-size: 28rpx;">Upgrade Card</view>
									</view>
									<view class="con-bottom">{{item2.code}}</view>
								</view>
								<view v-else class="con-left flex flex-direction justify-between text-colorB">
									<view class="con-top">
										<view style="font-size: 36rpx;font-weight: 900;">保级卡</view>
										<view style="font-size: 28rpx;">Renewal Card</view>
									</view>
									<view class="con-bottom">{{item2.code}}</view>
								</view>
								<view class="con-btn flex flex-direction justify-center">
									<view class="btn-item text-white" @tap="useCard">使用</view>
									<view class="btn-item text-white" @tap="sendCard">赠送</view>
								</view>
							</view>
							
							<!-- 已使用 -->
							<view v-if="index1==1" class="card-item bg-img" :style="item2.isUpcode?'background-image: url('+STATIC_URL+'card_01.png);':'background-image: url('+STATIC_URL+'card_02.png);'">
								<view v-if="item2.isUpcode" class="con-left flex flex-direction justify-between text-colorA">
									<view class="con-top">
										<view style="font-size: 36rpx;font-weight: 900;">升级卡</view>
										<view style="font-size: 28rpx;">Upgrade Card</view>
									</view>
									<view class="con-bottom">{{item2.code}}</view>
								</view>
								<view v-else class="con-left flex flex-direction justify-between text-colorB">
									<view class="con-top">
										<view style="font-size: 36rpx;font-weight: 900;">保级卡</view>
										<view style="font-size: 28rpx;">Renewal Card</view>
									</view>
									<view class="con-bottom">{{item2.code}}</view>
								</view>
								<view class="con-btn flex flex-direction justify-center">
									<view class="btn-item text-white" @tap="useCard">使用</view>
									<view class="btn-item text-white" @tap="sendCard">赠送</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>		
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				list: [{
					name: '未使用',
					cards: []
				}, {
					name: '已使用',
					cards: []
				}],
				currentIndex: 0,
				cards: []
			};
		},
		onLoad() {
			this.getCards("no")
			this.getCards("yes")
		},
		methods: {
			useCard(){
				this.$u.toast("功能暂未开放，敬请期待~");
			},
			sendCard(){
				// this.$u.toast("功能暂未开放，敬请期待~");
				uni.navigateTo({
					url:"../myInvite/myInvite"
				})
			},
			changeCurrent(e) {
				this.currentIndex = e.detail.current
			},
			chooseTabs(index) {
				this.currentIndex = index
			},
			getCards(type) {
				this.$u.post('/api/v1/users/role/query_up_code', {
					userID: uni.getStorageSync("userInfo").id,
					isUsed: type
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let result = res.data.data
					switch (type) {
						case "no":
							if(result.upCode.unusedCode&&result.upCode.unusedCode.length!=0){
								result.upCode.unusedCode.map(item=>{
									this.list[0].cards.push({
										isUpcode:true,
										id:item.id,
										code:item.code
									})
								})
							}
							if(result.keepCode.unusedCode&&result.keepCode.unusedCode.length!=0){
								result.keepCode.unusedCode.map(item=>{
									this.list[0].cards.push({
										isUpcode:false,
										id:item.id,
										code:item.code
									})
								})
							}
							break;
						case "yes":
							if(result.upCode.usedCode&&result.upCode.usedCode.length!=0){
								result.upCode.usedCode.map(item=>{
									this.list[1].cards.push({
										isUpcode:true,
										id:item.id,
										code:item.code
									})
								})
							}
							if(result.keepCode.usedCode&&result.keepCode.usedCode.length!=0){
								result.keepCode.usedCode.map(item=>{
									this.list[1].cards.push({
										isUpcode:false,
										id:item.id,
										code:item.code
									})
								})
							}
							break;
						default:
							break;
					}
				});
				console.log(this.list)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.card-box {
		padding: 20rpx 30rpx;

		.card-item {
			width: 690rpx;
			height: 386rpx;
			margin-bottom: 20rpx;
			position: relative;
			background-color: #FFFFFF;

			.con-left {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				padding: 30rpx;
				padding-right: 0;

				.con-bottom {
					font-size: 60rpx;
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
