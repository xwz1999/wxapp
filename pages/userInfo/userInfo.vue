<template>
	<view>
		<view class="info">
			<view class="item">
				<view class="">头像</view>
				<view class="avatar bg-img" :style="'background-image: url('+ IMAGE_URL+userInfo.headImgUrl+');'"></view>
			</view>
			<view class="item">
				<view class="">角色</view>
				<view class="level-box flex justify-center align-center">
					<template v-if="userInfo.roleLevel==500">
						<image src="../../static/mine/level00.png" mode="widthFix" style="width: 24rpx;"></image>
						<view style="margin-left: 3rpx;">会员</view>
					</template>
					<template v-if="userInfo.roleLevel==400">
						<image src="../../static/mine/level01.png" mode="widthFix" style="width: 24rpx;"></image>
						<view style="margin-left: 3rpx;">店主</view>
					</template>
					<template v-if="userInfo.roleLevel==300">
						<image src="../../static/mine/level02.png" mode="widthFix" style="width: 24rpx;"></image>
						<view style="margin-left: 3rpx;">白银店铺</view>
					</template>
					<template v-if="userInfo.roleLevel==200">
						<image src="../../static/mine/level03.png" mode="widthFix" style="width: 24rpx;"></image>
						<view style="margin-left: 3rpx;">黄金店铺</view>
					</template>
					<template v-if="userInfo.roleLevel==100">
						<image src="../../static/mine/level04.png" mode="widthFix" style="width: 24rpx;"></image>
						<view style="margin-left: 3rpx;">钻石店铺</view>
					</template>
				</view>
			</view>
			<view class="item">
				<view class="">昵称</view>
				<view class="">{{userInfo.nickname}}</view>
			</view>
			<view class="item" @tap="toSetRemark(userInfo.remarkName)">
				<view class="">备注</view>
				<view class="">{{userInfo.remarkName?userInfo.remarkName:'未设置'}}<text class="cuIcon-post"></text></view>
			</view>
			<view class="item">
				<view class="">注册时间</view>
				<view class="">{{userInfo.createdAt}}</view>
			</view>
		</view>
		<view class="info">
			<view class="item">
				<view class="">手机号</view>
				<view class="">{{userInfo.phoneNum}}</view>
			</view>
			<view class="item">
				<view class="">微信号</view>
				<view class="">{{userInfo.wechatNo}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL,
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		onLoad() {
		
		},
		methods:{
			toSetRemark(con){
				uni.navigateTo({
					url: "../myInfo/updateContent?content=" + con + "&type=remark"
				})
			}
		}
	}
</script>

<style lang="scss">
	.info{
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 0 30rpx;
		.item{
			display: flex; 
			justify-content: space-between;
			align-items: center;
			height: 120rpx;
			border-bottom: 1rpx solid #f1f1f1;
			&:last-child{
				border: 0;
			}
			.avatar{
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
			.level-box {
				color: #B25E34;
				background-color: #F5CA88;
				height: 36rpx;
				line-height: 36rpx;
				border-radius: 20rpx;
				padding: 0 20rpx;
				font-size: 20rpx;
			}
		}
	}
</style>
