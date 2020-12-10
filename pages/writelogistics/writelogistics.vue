<template>
	<view>
		<view class="info bg-white text-gray">
			<view class="text-black" style="font-size: 34rpx;">官方收货地址</view>
			<view class="">收件人：{{info.name}}</view>
			<view class="">电话：{{info.mobile}}</view>
			<view class="">地址：{{info.address}}</view>
		</view>
		<picker mode="selector" :range="companys" @change="chooseCompany">
			<view class="item bg-white flex justify-between">
				<view class="span text-black">快递公司</view>
				<view class="flex">{{checkedCompany?checkedCompany:'请选择快递公司'}}<text class="cuIcon-right"></text></view>
			</view>
		</picker>
		<view class="item bg-white flex justify-between">
			<view class="span text-black">单号</view>
			<input class="flex-sub" v-model="expressNo" type="text" value="" placeholder="请输入退货商品的快递单号" />
		</view>
		<view class="item bg-white flex justify-between">
			<view class="span text-black">运费补偿</view>
			<input class="flex-sub" type="text" value="" placeholder="请输入您的发货费用" />
		</view>
		<view class="bottom-btn text-white text-center" @tap="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					address:"",
					id:0,
					mobile:"",
					name:""
				},
				companys:[],
				checkedCompany:"",
				asId:0,
				expressNo:""
			};
		},
		onLoad(options) {
			if(options.asId){
				this.asId = parseInt(options.asId)
			}
			this.getAddressInfo()
			this.getCompanys()
		},
		methods:{
			getAddressInfo(){
				this.$u.post('/api/v1/official/return_address').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
				});
			},
			getCompanys(){
				this.$u.post('/api/v1/order/express/company/list').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.companys = res.data.data
				});
			},
			chooseCompany(e){
				let index = e.detail.value
				this.checkedCompany = this.companys[index]
			},
			submit(){
				this.$u.post('/api/v1/order/after_sales/express/fill',{
					asId:this.asId,
					expressCompName:this.checkedCompany,
					expressNo:this.expressNo
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.showToast({
						title:"提交成功",
						success: () => {
							setTimeout(function(){
								uni.navigateBack()
							},1000)
						}
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	.info{
		padding: 60rpx 30rpx;
		line-height: 40rpx;
		view{
			padding: 10rpx 0;
		}
	}
	.item{
		padding: 0 30rpx;
		line-height: 100rpx;
		margin-top: 20rpx;
		color: #AAAAAA;
		.span{
			width: 150rpx;
		}
		input{
			height: 100rpx;
		}
	}
	.bottom-btn {
		position: fixed;
		width: 100%;
		bottom: 0;
		line-height: 100rpx;
		background-color: #C92219;
	}
</style>
