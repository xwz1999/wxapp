<template>
	<view class="flex flex-direction" style="height: 100vh;">
		<view class="cart-top flex " style="background-color: #f6f6f6;">
			<view style="font-size: 35rpx;color: #000;">消息({{inforCount}})</view>

			<view class="flex" @tap="redAll()" style="align-items: center;margin-left: 20rpx;">
				<image :src="IMAGE_URL+'/wxapp/ic_message_clear.png'" mode="widthFix" style="width:32rpx"></image>
				<text style="font-size: 28rpx;color: #999;">清除未读</text>
			</view>
		</view>
		<view class="" style="height: 80rpx;"></view>
		<scroll-view scroll-y="true"
			style="height: 100vh;background-color:#fff;border-top-left-radius: 30rpx ;border-top-right-radius: 30rpx;"
			class="flex-sub" refresher-enabled="true" enable-flex="true" @refresherrestore="onRestore"
			@refresherrefresh="onRefresh" :refresher-triggered="triggered">
			<view v-if="showLoading" class="isLoading bg-white flex flex-direction justify-center align-center"
				style="height: 100vh;width: 100vw;margin: 20rpx 0;background-color:rgb(240, 240, 240)">
				<view class="flex flex-direction justify-center align-center" style="width: 100vw;height:80vh;">
					<image :src="IMAGE_URL+'/wxapp/uni-program/xx.jpg'" mode="widthFix" style="width:500upx"></image>
					<view class="text-center" style="color: #AAAAAA;font-size: 32rpx;margin-top: 10rpx;"></view>
				</view><!-- <image src="/static/loading-white.gif" mode="widthFix" style="width:500upx"></image> -->
			</view>
			<view v-else 
					v-for="(item,index) in inforList" :key="index">
				<view  @tap="goPage(item.kind,item.sub_id)" style="padding: 20rpx;" class=" flex  align-center">
					<image v-if="item.kind==1" :src="IMAGE_URL+'/wxapp/ic_msg_bet.png'" mode="widthFix" style="width:100rpx"></image>
					<image v-else :src="IMAGE_URL+'/wxapp/ic_msg_order.png'" mode="widthFix" style="width:100rpx"></image>
					<view style="width: 20rpx;"></view>
					<view style="display: flex;flex-direction: column;width: 100%;">
						<view style="display: flex;justify-content: space-between;width: 100%;" >
							<view v-if="item.kind==1" style="font-size: 32rpx;color: #961B1B;">收益到账</view>
							<view v-else style="font-size: 32rpx;color: #961B1B;">订单通知</view>
							
							<view style="font-size: 24rpx;color: #AAAAAA;">{{getText(item.created_at)}}</view>
						</view>
						<view style="height: 20rpx;"></view>
						<view style="display: flex;justify-content: space-between;width: 100%;" >
							<view style="font-size: 28rpx;color: #999;">{{item.message}}>>></view>
							<view v-if="!item.is_read" style="width: 16rpx;height: 16rpx;border-radius: 16rpx;background-color: #D5101A;"></view>
							<view v-else></view>
						</view>
					
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20" />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				triggered: false,
				loadStatus: 'loadmore',
				stopLoad: false,
				showLoading: true,
				page: 0,
				limit: 10,
				IMAGE_URL: this.IMAGE_URL,
				inforCount: 0,
				inforList: []
			};
		},
		onShow() {
			this.getInformation()

			this._freshing = false
		},
		onLoad() {

		},
		methods: {
			
			goPage(index,id){
				console.log(index)
				this.redInfo(id)
				if(index==1){
					uni.navigateTo({
						url: "/packageA/balance/balance"
					})
				}else{
					uni.navigateTo({
						url: "/package_pifa/pifaOrderDetail/pifaOrderDetail?orderId=" + id
					})
					
				}
				
				
			},
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page = 0
				this.stopLoad = false
				this.inforList = []
				this.getInformation()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			getText(time){
				let time1 = time.split('T')[0]
				let time2 = time.split('T')[1].split('+')[0]
				let str  = time1+' '+time2
				console.log(str)
				return str
			},
			getInformation() {
				this.getCount()
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				this.page++
				this.$u.post('/api/v2/app/message/list', {
					page: this.page,
					limit: this.limit,
				}).then(res => {
					this.showLoading = false
					console.log(res.data.data.list)
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.list
					if (list.length < this.limit) {
						this.stopLoad = true
						this.loadStatus = "nomore"
						this.inforList.push(...list)
						return
					}
					this.inforList.push(...list)
					
				});
			},
			getCount() {
				this.$u.post('/api/v2/app/message/count', {

				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					console.log(res.data.data)
					this.inforCount = res.data.data.count
				});
				
			},
			redInfo(id) {
				this.$u.post('/api/v2/app/message/read', {
					id: id
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					console.log(res.data.data)
					this.getInformation()
				});
			},
			redAll() {
				this.$u.post('/api/v2/app/message/read_all', {

				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					console.log(res.data.data)
					this.onRefresh()
				});
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.split_text {
		text-align: center;
	}

	.cart-top {
		position: fixed;
		width: 100%;
		padding: 0 30rpx;
		line-height: 80rpx;
		top: 0;
		z-index: 1000;
	}
</style>
