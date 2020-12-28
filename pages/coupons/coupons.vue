<template>
	<view class="flex flex-direction" style="height: 100%;">
		<view class="">
			<u-tabs :list="list" :is-scroll="false" height="90" :current="currentIndex" duration="0.2" bar-width="100" :bold="false" active-color="red" @change="chooseTabs"></u-tabs>
		</view>
		<view class="null flex-sub flex flex-direction justify-center align-center" v-if="isNull" style="width: 100vw;height: 80vh;">
			<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
			<view  style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无优惠券</view>
		</view>
		<scroll-view class="flex-sub" scroll-y="true" style="height: 0;">
			<view class="coupons-box">
				<view class="coupon-item flex" v-for="(item,index) in coupons" :key="index">
					<view class="flex flex-direction justify-center text-white bg-red item-left align-center">
						<view class="price">100</view>
						<view class="">无门槛</view>
					</view>
					<view class="flex-sub flex bg-white" style="padding: 30rpx 25rpx;">
						<view class="flex-sub flex flex-direction justify-between clear">
							<view class="coupon-title text-black" style="font-size: 28rpx;">优惠券名称</view>
							<view class="" style="font-size: 20rpx;color: #999;">有效期至：2020.09.20 23:59:00</view>
						</view>
						<view class="flex flex-direction justify-center" style="width: 100rpx;">
							<u-button plain shape="circle" :custom-style="{width:'100rpx',height:'48rpx',color:'red',borderColor:'red',fontSize:'20rpx'}">去使用</u-button>
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
				list: [{
					name: '未使用'
				}, {
					name: '已使用'
				}, {
					name: '已失效'
				}],
				currentIndex:0,
				coupons:[],
				isNull:false
			};
		},
		onLoad() {
			this.getCoupons()
		},
		methods:{
			getCoupons(){
				this.isNull = true
			},
			chooseTabs(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100vw;
	height: 100vh;
}
.coupon-item{
	margin: 20rpx 25rpx;
	&:last-child{
		margin-bottom: 200rpx;
	}
	.item-left{
		width: 240rpx;
		height: 180rpx;
	}
	.price{
		font-size: 60rpx;font-weight: 900;
		position: relative;
		&::before{
			content: "￥";
			font-size: 26rpx;
			font-weight: 800;
			position: absolute;
			right: 100%;
			bottom: 10rpx;
		}
	}
}
</style>
