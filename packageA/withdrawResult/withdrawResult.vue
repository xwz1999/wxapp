<template>
	<view>
		<view class="status-icon flex justify-around bg-white">
			<view class="flex flex-direction align-center">
				<image :src="IMAGE_URL + '/wxapp/mine/t3.png'" style="width: 54rpx;" mode="widthFix"></image>
				<view v-if="status==1"  class="text">提交申请</view>
				<view v-else  class="text">提交成功</view>
				<view v-if="status==1" >{{detail.created_at}}</view>
				<view v-else >{{detail.auditTime}}</view>
			</view>
			
			<view style="background-color:#c8c8c8;width: 250rpx;height: 2rpx;margin-top: 50rpx;"></view>
			<view v-if="status==1" class="flex flex-direction align-center">
				<image :src="IMAGE_URL + '/wxapp/mine/t1.png'" style="width: 54rpx;" mode="widthFix"></image>
				<view class="text">提交成功</view>
				<view v-if="detail.doneTime">{{detail.auditTime}}</view>
			</view>
			<view v-else class="flex flex-direction align-center">
				<image :src="IMAGE_URL + '/wxapp/mine/t1.png'" style="width: 54rpx;" mode="widthFix"></image>
				<view class="text">提现成功</view>
				<view v-if="detail.doneTime">{{detail.doneTime}}</view>
			</view>
		</view>
		<view class="bg-white" style="padding:40rpx 30rpx;line-height: 50rpx;">
			<view class="sub-title" v-if="detail.WaitStatus==0">提现申请已提交</view>
			<view class="sub-title" v-if="detail.WaitStatus==1">提现成功</view>
			<view style="color: #aaa;font-size: 24rpx;padding: 0 20rpx;" v-if="detail.WaitStatus==1"> 预计三个工作日到账  </view>
			<view style="color: #aaa;font-size: 24rpx;padding: 0 20rpx;" v-if="detail.WaitStatus==0"> 请耐心等待审核  </view>
		</view>
		<view class="box bg-white">
			<view class="title">提现小贴士</view>
			<view class="flex">
				<view class="span">本次申请提现金额</view>
				<view>￥{{detail.amount}}</view>
			</view>
			<view class="flex">
				<view class="span">平台代扣代付税费</view>
				<view>￥{{fee}}</view>
			</view>
			<view class="flex">
				<view class="span">实际到账金额</view>
				<view>￥{{detail.actual_amount}}</view>
			</view>
			<view class="flex">
				<view class="span">申请提现人</view>
				<view>{{detail.user_name}}</view>
			</view>
			<view class="flex">
				<view class="span">提现方式</view>
				<view v-if="detail.type==1">支付宝 | {{detail.alipay}}</view>
				<view v-if="detail.type==2">银行卡 | {{detail.bank_account}}</view>
			</view>
			<view class="flex">
				<view class="span">申请提现时间</view>
				<view>{{detail.created_at}}</view>
			</view>
		</view>
		<view class="box bg-white tip-box">
			<view>提现小贴士</view>
			<view style="line-height: normal;font-size: 24rpx;color: #AAAAAA;">
				<view class="tip-title text-black">什么是审核日？</view>
				<view>每月10号和25号为瑞库客审核日，您的提现申请会在审核日进行审核</view>
				<view class="tip-title text-black">审核通过需要几天能够到账？</view>
				<view>审核通过后3个工作日会到账，请留意银行或者支付宝通知(特殊情况视银行结算)</view>
			</view>
		</view>
		<button class="btn cu-btn bg-red lg block">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:null,
				IMAGE_URL:this.IMAGE_URL,
				status:1,
				fee:0
			};
		},
		onLoad(options) {
			if(options.id){
				this.id = parseInt(options.id)
				this.getDetail()
			}
		},
		methods:{
			getDetail(){
				this.$u.post('/api/v1/wallet/balance/withdraw_detail', {
					id: this.id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.detail = res.data.data
					this.status = this.detail.status
					this.fee = this.detail.tax_fee
				});
			}
		}
	}
</script>

<style lang="scss">
	.status-icon {
		font-size: 22rpx;
		color: #666;
		padding: 50rpx 0 30rpx;
		border-bottom: 1rpx solid #f1f1f1;

		.text {
			margin: 10rpx 0 5rpx;
			font-size: 24rpx;
		}
	}

	.sub-title {
		position: relative;
		padding: 0 20rpx;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 6rpx;
			height: 30rpx;
			background-color: #D40000;
		}
	}

	.box {
		margin: 20rpx 30rpx;
		border-radius: 10rpx;
		border: 1rpx solid #ddd;
		padding: 20rpx;
		line-height: 60rpx;

		.span {
			width: 280rpx;
		}
		.tip-title{
			line-height: 60rpx;
			font-size: 28rpx;
		}
	}

	.btn {
		color: #FFFFFF;
		margin: 50rpx 30rpx 200rpx;
	}
</style>
