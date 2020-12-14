<template>
	<view>
		<image :src="STATIC_URL+'join.png'" style="width: 690rpx;height: 368rpx;margin:20rpx 30rpx;" mode="widthFix"></image>
		<view class="bg-white text-black" style="padding: 30rpx;margin-bottom: 20rpx;line-height: 40rpx;">
			<view class="">如果您想</view>
			<view class="">致力于为消费者提供更有品质的生活；</view>
			<view class="">倡导独立不盲从的价值观；</view>
			<view class="">请联系我们。</view>
		</view>
		<view class="box bg-white flex justify-between flex-wrap" style="padding: 30rpx;">
			<view class="item flex flex-direction justify-center" v-for="(item,index) in list" :key="index" style="width: 50%;height: 120rpx;">
				<view class="flex">
					<view class="flex flex-direction justify-center align-center" style="width: 40rpx;height: 40rpx;">
						<image :src="item.icon" style="height: 32rpx;width: auto;margin-right: 10rpx;" mode="heightFix"></image>
					</view>
					<view class="clear">
						<view class="text-hidden" style="font-size: 26rpx;color: #333333;line-height: 40rpx;">{{item.txt}}</view>
						<view style="font-size: 24rpx;color: #666666;">{{item.website}}</view>
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
				STATIC_URL:this.STATIC_URL,
				list:[
					{
						icon:"/static/mine/h01.png",
						txt:"母婴亲子·运动旅行",
						website:"Fonnie@cn-recook.com"
					},
					{
						icon:"/static/mine/h02.png",
						txt:"服饰内衣·箱包",
						website:"Hedy@cn-recook.com"
					},
					{
						icon:"/static/mine/h03.png",
						txt:"农副产品·蔬果生鲜",
						website:"Helen@cn-recook.com"
					},
					{
						icon:"/static/mine/h04.png",
						txt:"美妆个护·个护清洁",
						website:"Martin@cn-recook.com"
					},
					{
						icon:"/static/mine/h05.png",
						txt:"电器·3C产品",
						website:"Shawn@cn-recook.com"
					},
					{
						icon:"/static/mine/h06.png",
						txt:"其他",
						website:"Franco@cn-recook.com"
					},
					{
						icon:"/static/mine/h07.png",
						txt:"家装家居·美食酒水·进口食品",
						website:"Michelle@cn-recook.com"
					},
					
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
