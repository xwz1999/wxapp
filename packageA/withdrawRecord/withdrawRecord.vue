<template>
	<view>
		<view class="records-box bg-white">
			<view class="records-item flex justify-between align-center" v-for="(item,index) in records" :key="index" @tap="toDetail(item.id)">
				<view class="text-black">
					<view style="font-size: 28rpx;">提现金额</view>
					<view style="font-size: 34rpx;">￥{{item.amount}}</view>
					<view style="font-size: 24rpx;color: #AAAAAA;">{{item.created_at}}</view>
				</view>
				<view class="">{{item.status==1?'提交申请':item.status==2?'提现成功':''}}<text class="cuIcon-right"></text>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				records:[]
			};
		},
		onLoad() {
			this.getRecords()
		},
		methods:{
			toDetail(id){
				uni.navigateTo({
					url:"/packageA/withdrawResult/withdrawResult?id="+id
				})
			},
			getRecords(){
				this.$u.post('/api/v1/wallet/balance/withdraw_list', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.records = res.data.data
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
