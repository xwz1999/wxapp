<template>
	<view>
		<image class="top-pic" :src="STATIC_URL+'join.png'" mode="widthFix"></image>
		<view class="bg-white text-black msg-con">
			<view class="">如果您想</view>
			<view class="">致力于为消费者提供更有品质的生活；</view>
			<view class="">倡导独立不盲从的价值观；</view>
			<view class="">请联系我们。</view>
			<view style="font-size: 12px;">
				<view class="">地址：浙江省宁波市鄞州区菁华路108号德邦大厦四楼</view>
				<view class="">电话：400-889-4489</view>
				<view class="">邮箱：Dora@cn-recook.com</view>
			</view>
		</view>
<!-- 		<view class="box bg-white flex justify-between flex-wrap">
			<view class="item flex flex-direction justify-center" v-for="(item,index) in list" :key="index">
				<view class="flex">
					<view class="flex flex-direction justify-center align-center icon-con">
						<image :src="item.icon" class="icon" mode="heightFix"></image>
					</view>
					<view class="clear">
						<view class="text-hidden txt">{{item.txt}}</view>
						<view class="site">{{item.website}}</view>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				list: [{
						icon: this.IMAGE_URL + "/mine/h01.png",
						txt: "母婴亲子·运动旅行",
						website: "Fonnie@cn-recook.com"
					},
					{
						icon: this.IMAGE_URL + "/mine/h02.png",
						txt: "服饰内衣·箱包",
						website: "Hedy@cn-recook.com"
					},
					{
						icon: this.IMAGE_URL + "/mine/h03.png",
						txt: "农副产品·蔬果生鲜",
						website: "Helen@cn-recook.com"
					},
					{
						icon: this.IMAGE_URL + "/mine/h04.png",
						txt: "美妆个护·个护清洁",
						website: "Martin@cn-recook.com"
					},
					{
						icon: this.IMAGE_URL + "/mine/h05.png",
						txt: "电器·3C产品",
						website: "Shawn@cn-recook.com"
					},
					{
						icon: this.IMAGE_URL + "/mine/h06.png",
						txt: "其他",
						website: "Franco@cn-recook.com"
					},
					{
						icon: this.IMAGE_URL + "/mine/h07.png",
						txt: "家装家居·美食酒水·进口食品",
						website: "Michelle@cn-recook.com"
					},

				]
			};
		}
	}
</script>

<style lang="scss">
	.top-pic {
		width: 690rpx;
		height: 368rpx;
		margin: 20rpx 30rpx;
	}

	.msg-con {
		padding: 30rpx;
		margin-bottom: 20rpx;
		line-height: 45rpx;
	}

	.box {
		padding: 30rpx;

		.item {
			width: 50%;
			height: 120rpx;

			.icon-con {
				width: 40rpx;
				height: 40rpx;

				.icon {
					height: 32rpx;
					width: auto;
					margin-right: 10rpx;
				}
			}

			.txt {
				font-size: 26rpx;
				color: #333333;
				line-height: 40rpx;
			}

			.site {
				font-size: 24rpx;
				color: #666666;
			}
		}
	}
</style>
