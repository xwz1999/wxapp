<template>
	<view>
		<view class="item bg-white flex justify-between top">
			<view class="text-black">电子发票</view>
			<view class="" style="color: #FF8F44;">已开票<text class="cuIcon-right" style="margin-left: 10rpx;color: #AAAAAA;"></text></view>
		</view>
		<view class="" style="margin-bottom: 400rpx;">
			<!-- 个人 -->
			<template v-if="invoiceType==0">
				<view class="item bg-white flex justify-between">
					<view class="span">抬头名称</view>
					<view class="">阿库</view>
				</view>
			</template>
			<!-- 企业 -->
			<template v-if="invoiceType==1">
				<view class="item bg-white flex justify-between">
					<view class="span">公司名称</view>
					<view class="">阿库</view>
				</view>
				<view class="item bg-white flex justify-between">
					<view class="span">公司税号</view>
					<view class="">2173681</view>
				</view>
				<!-- 展开更多 -->
				<template v-if="showMore">
					<view class="item bg-white flex justify-between">
						<view class="span">公司地址</view>
						<view class="">宁波市海曙区</view>
					</view>
					<view class="item bg-white flex justify-between">
						<view class="span">公司电话</view>
						<view class="">400000000000</view>
					</view>
					<view class="item bg-white flex justify-between">
						<view class="span">公司开户行</view>
						<view class="">宁波银行</view>
					</view>
					<view class="item bg-white flex justify-between">
						<view class="span">开户行账号</view>
						<view class="">217368194832747924</view>
					</view>
					<view class="item bg-white flex justify-between">
						<view class="span">发票内容</view>
						<view class="">平台消费</view>
					</view>
					<view class="item bg-white flex justify-between">
						<view class="span">备注</view>
						<view class="">办公采购</view>
					</view>
				</template>
			</template>
			<view class="item bg-white flex justify-between">
				<view class="span">发票金额</view>
				<view class=""><text class="text-red">219</text>元</view>
			</view>
			<view class="item bg-white flex justify-between">
				<view class="span">申请时间</view>
				<view class="">2020-08-07 13:10</view>
			</view>
			<!-- 企业 -->
			<template v-if="invoiceType==1">
				<view class="more text-center bg-white" style="line-height: 80rpx;color: #AAAAAA;font-size: 24rpx;" @tap="showMoreMsg">
					{{showMore?'收起':'展开更多信息'}}<text :class="showMore?'cuIcon-triangleupfill':'cuIcon-triangledownfill' "></text>
				</view>
			</template>
		</view>
		
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white" @tap="reAdd">申请重开发票</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invoiceType:1,
				showMore:false
			};
		},
		methods:{
			showMoreMsg(){
				this.showMore = !this.showMore
			}
		}
	}
</script>

<style lang="scss">
	.top{
		margin: 20rpx 0;
		font-size: 32rpx;
	}
	.item{
		line-height: 96rpx;
		padding: 0 30rpx;
		color: #333333;
		font-size: 28rpx;
		.span{
			font-size: 32rpx;
			color: #999999;
		}
	}
.btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
