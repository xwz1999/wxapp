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
		<view v-else class="records-box bg-white">
			<view class="records-item flex justify-between align-center" v-for="(item,index) in records" :key="index" @tap="toDetail(item.id)">
				<view class="text-black">
					<view style="font-size: 32rpx;color: #333333;">充值 ￥{{item.amount}}
					</view>
					<!-- <view style="font-size: 24rpx;color: #333333;">税费{{item.tax_fee}}元,实际到帐
						<text style="font-size: 24rpx;color: #D5101A;">{{item.actual_amount}}元</text>
					</view> -->
					<view style="font-size: 24rpx;color: #AAAAAA;">{{item.created_at}}</view>
				</view>
				<view class="">{{item.state==1?'待审核':item.state==2?'充值成功':item.state==99?'已驳回':''}}<text class="cuIcon-right"></text>	
				</view>
			</view>
		</view>
		<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20"/>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				records:[],
				triggered: false,
				IMAGE_URL:this.IMAGE_URL,
				loadStatus:'loadmore',
				stopLoad: false,
				page: 0,
				limit:10,
			};
		},
		onLoad() {
			this.getRecords()
			this._freshing = false;
		},
		methods:{
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page  = 0
				this.stopLoad = false
				this.records = []
				this.getRecords()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			toDetail(id){
				// uni.navigateTo({
				// 	url:"/packageA/withdrawResult/withdrawResult?id="+id
				// })
			},
			getRecords(){
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				this.page++
				this.$u.post('/api/v2/company/deposit/list', {
					page:this.page,
					limit: this.limit,
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.list
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
	.records-item{
		height: 160rpx;
		border-bottom: 1rpx solid #f1f1f1;
		padding: 0 20rpx;
		line-height: 40rpx;
		&:last-child{
			border: 0;
		}
	}
</style>
