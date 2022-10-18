<template>
	<view>
		<scroll-view scroll-y="true" style="height: 100vh;" class="flex-sub" refresher-enabled="true" enable-flex="true"
			@refresherrestore="onRestore" @refresherrefresh="onRefresh" :refresher-triggered="triggered">
			<view v-if="records.length==0">
				<view class="flex flex-direction  align-center" style="width: 100vw;height:80vh;">
					<image :src="IMAGE_URL+'/wxapp/null01.png'" style="width: 300rpx;margin-top: 400rpx;"
						mode="widthFix"></image>
					<view class="text-center" style="color: #AAAAAA;font-size: 26rpx;margin-top: 10rpx;">没有数据哦~
					</view>
				</view>
			</view>
			<view v-else>
				<view class="records-box bg-white">
					<view class="records-item flex justify-between align-center" v-for="(item,index) in records"
						:key="index" @tap="toDetail(item)">
						<view class="text-black">
							<view style="font-size: 32rpx;color: #333333;">提现￥{{item.balance}}
							</view>
							<view style="height: 10rpx;"></view>
							<view style="font-size: 24rpx;color: #AAAAAA;">{{getText(item.created_at)}}</view>
						</view>
						<view class="">{{item.state==1?'待审核':item.state==2?'待打款':item.state==3?'提现成功':item.state==99?'已驳回':''}}<text class="cuIcon-right"></text>
						</view>
					</view>
					
				</view>
				<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20" />
			</view>
			
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				records: [],
				triggered: false,
				IMAGE_URL: this.IMAGE_URL,
				page: 1,
				limit: 10,
				stopLoad: false,
				loadStatus: 'loadmore',
			};
		},
		onLoad() {
			this.getRecords()
			this._freshing = false;
		},
		methods: {
			getText(time){
				let time1 = time.split('T')[0]
				let time2 = time.split('T')[1].split('+')[0]
				let str  = time1+' '+time2
				console.log(str)
				return str
			},
			onRefresh() {
				console.log('onRefresh')
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page = 1
				this.stopLoad = false
				this.records = []
				this.getRecords()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			toDetail(model) {
				uni.navigateTo({
					url: "/package_pifa/taxpayerWithDrawResult/taxpayerWithDrawResult?model="+ encodeURIComponent(JSON.stringify(model))
				})
			},
			getRecords() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				let sendData = {
					page: this.page,
					limit: this.limit
				}
				console.log(sendData)
				
				this.page++
				this.$u.post('/api/v2/app/company/apply/list', {
					sendData
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					
					let list = res.data.data.list
					// let list = [
					// 	{	
					// 		state:3,
					// 		balance:1000,
					// 		actual_amount:890,
					// 		created_at:'2022-10-10T16:52:19+08:00',
					// 		tax:1,
					// 		logistics_name:'sf',
					// 		waybill_code:'123123123',
					// 		process_time:'2022-10-10T16:52:19+08:00',
					// 		proof:'没有原因',
							
					// 	},
					// 	{
					// 		state:99,
					// 		balance:1000,
					// 		actual_amount:890,
					// 		created_at:'2022-10-10T16:52:19+08:00',
					// 		tax:1,
					// 		logistics_name:'sf',
					// 		waybill_code:'123123123',
					// 		process_time:'2022-10-10T16:52:19+08:00',
					// 		proof:'没有原因',
							
					// 	}
					// ]
					if (list.length < this.limit) {
						this.stopLoad = true
						this.loadStatus = "nomore"
							this.records.push(...list)
							return
					}
					this.records.push(...list)
					console.log(this.records)
				});
			}
		}
	}
</script>

<style lang="scss">
	.records-item {
		height: 160rpx;
		border-bottom: 1rpx solid #f1f1f1;
		padding: 0 20rpx;
		line-height: 40rpx;

		&:last-child {
			border: 0;
		}
	}
</style>
