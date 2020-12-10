<template>
	<view>
		<view class="box">
			<view class="title"><text class="cuIcon-titles text-red"></text>请填写以下信息</view>
			<view class="box-con">
				<view class="item">
					<view class="">姓名</view>
					<input type="text" value="" placeholder="输入姓名"/>
				</view>
				<view class="item">
					<view class="">手机号</view>
					<input type="text" value="" placeholder="输入手机号"/>
				</view>
				<view class="item">
					<view class="">微信号</view>
					<input type="text" value="" placeholder="输入微信号"/>
				</view>
				<view class="item">
					<view class="">社区粉丝数量</view>
					<input type="text" value="" placeholder="粉丝数量"/>
				</view>
				<view class="item">
					<view class="">曾做过的平台</view>
					<input type="text" value="" placeholder="例如:云集、返利网"/>
				</view>
				<view class="item">
					<view class="">社群月度最高销售额(万)</view>
					<input type="text" value="" placeholder="输入销售额"/>
				</view>
				<view class="item">
					<view class="">请选择所在地区</view>
					<view class="flex-sub" style="line-height: 100rpx;color: #aaa;">
						选择地区<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			<button class="text-white bg-red shadow" style="margin-top: 80rpx;" @tap="submit">提交</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			submit(){
				uni.redirectTo({
					url:"../addInfoSuccess/addInfoSuccess"
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.box{
	padding: 0 20rpx;
	.title{
		line-height: 120rpx;
		font-size: 38rpx;
		font-weight: 800;
	}
	.box-con{
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			border-bottom: 1rpx solid #f5f5f5;
			height: 100rpx;
			&>view:first-child{
				width: 240rpx;
				margin-right: 20rpx;
			}
			input{
				flex: 1;
				height: 100rpx;
			}
		}
	}
}

</style>
