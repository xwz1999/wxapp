<template>
	<view>
		<view class="box bg-white">
			<view class="item flex justify-between" v-for="(item,index) in msg" :key="index">
				<image class="goods-pic" :src="IMAGE_URL+item.picUrls[0]" mode="aspectFill"></image>
				<view class="msg-con flex-sub clear flex flex-direction justify-between">
					<view class="">
						<view class="text-black">快递单号：{{item.no}}</view>
						<view class="name">{{item.name}}</view>
					</view>
					<view class="flex justify-end">
						<button class="cu-btn line-red round btn" @tap="toDetail(item.data)">查看详情</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL,
				orderId:0,
				msg:[]
			};
		},
		onLoad(options) {
			if(options.orderId){
				this.orderId = parseInt(options.orderId)
				this.getList()
			}
		},
		methods:{
			getList(){
				this.$u.post('/api/v1/order/express/query', {
					userID: uni.getStorageSync("userInfo").id,
					orderId: this.orderId	
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.msg = res.data.data
				});
			},
			toDetail(data){
				this.$store.commit('setLogisticsDetail',data);
				uni.navigateTo({
					url:"/packageA/logisticsDetail/logisticsDetail"
				})
			}
		}
	}
</script>

<style lang="scss">
.item{
	border-bottom: 1rpx solid #f1f1f1;
	padding: 20rpx;
	&:last-child{
		border-bottom: 0;
	}
	.goods-pic{
		width: 180rpx;
		height: 180rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}
	.name{
		font-size: 26rpx;
		color: #666666;
		margin-top: 10rpx;
	}
	.btn{
		height: 60rpx;
	}
}
</style>
