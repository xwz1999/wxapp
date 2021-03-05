<template>
	<view>
		<view class="top-box" style="height: 260rpx;background-color: #DB2D2D;">
			<view class="top-con flex align-center justify-center text-white">
				<!-- 				<view class="bg-white top-round" :class="message.status==1&&message.returnStatus==1?'cuIcon-check':''"> -->
				<view class="bg-white top-round">
					<view class="round-txt">{{message.title}}</view>
				</view>
				<view class="line"></view>
				<view class="bg-white top-round">
					<view class="round-txt">{{message.rightTile}}</view>
				</view>
			</view>
		</view>
		<view class="msg-box bg-white">
			<!-- 待审核 -->
			<view class=" bg-white" v-if="message.status==1&&message.returnStatus==1">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
					<text style="margin-left: 30rpx;font-size: 26rpx;">剩余</text>
					<text class="text-red" style="font-size: 26rpx;margin-left: 5rpx;">{{message.residueHour}}小时</text>
				</view>
				<view class="des">若平台超时未处理，则系统将自动通过该请求。</view>
			</view>
			<!-- 申请未通过 -->
			<view class=" bg-white" v-if="message.status==7&&message.returnStatus==2">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
				</view>
				<view class="des">平台拒绝了您的退款申请。原因:{{message.rejectReason}}</view>
			</view>
			<!-- 申请通过，要求用户寄回 -->
			<view class=" bg-white" v-if="message.status==2&&message.returnStatus==3">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
				</view>
				<view class="des">若买家超时未填写物流信息，则系统将自动关闭退货请求。</view>
				<view class="des address" style="color: #333333;font-weight: 600;">寄回地址:{{message.address}}</view>
			</view>
			
			<!-- 用户已寄回，等待平台收货确认 -->
			<view class=" bg-white" v-if="message.status==3&&message.returnStatus==4">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
				</view>
				<view class="des">等待平台收货，确认无误后，为您退款。</view>
			</view>
			
			<!-- 平台收到寄回的商品有问题，要求用户重新寄回 -->
			<view class=" bg-white" v-if="message.status==4&&message.returnStatus==3">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
				</view>
				<view class="des">若买家超时未填写物流信息，则系统将自动关闭退货请求。</view>
				<view class="des" style="color: red;padding: 10rpx 0;">平台确认收货审核未通过，理由:{{message.rejectReason}}</view>
				<view class="des address" style="color: #333333;font-weight: 600;">寄回地址:{{message.address}}</view>
			</view>
			<!-- 退款成功 -->
			<view class=" bg-white" v-if="message.status==5&&message.returnStatus==5">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
					<text style="margin-left: 30rpx;font-size: 26rpx;color: #AAAAAA;">{{message.finishTime}}</text>
				</view>
				<view class="des">退款金额<text class="text-black">￥{{message.refundAmount}}</text>将原路退回至您的<text class="text-black">付款账户</text>，请及时关注到账情况。</view>
				<view class="des des1" v-if="message.refundCoin">退回瑞币<text class="text-black">{{message.refundCoin}}</text>已返回至您的<text class="text-black">瑞币账户</text>，请及时核实。</view>
				<view class="tip">若3天内未收到退款/瑞币，请联系客服咨询。</view>
			</view>
			<!-- 售后关闭 -->
			<view class=" bg-white" v-if="message.status==7&&message.returnStatus==6">
				<view class="flex" style="line-height: 50rpx;padding-bottom: 20rpx;">
					<text class="text-black" style="font-weight: 900;font-size: 32rpx;">{{message.subtitle}}</text>
				</view>
				<view class="des">您超时未填写寄回物流信息，系统自动关闭售后。如有疑问，请联系客服。</view>
				<view class="des">商家关闭了您的售后订单。如有疑问，请联系客服。</view>
			</view>
						<button  style="color: #FA6400;height: 40rpx;font-size: 28rpx;" class="cu-btn lines-gray text-gray round"
				 hover-stop-propagation @click="getLog()">进度明细</button>
		</view>
		
		<view class="box bg-white">
			<view class="flex justify-between">
				<view class="">退款金额</view>
				<view class="text-red">￥{{message.refundAmount}}</view>
			</view>
			<view class="flex justify-between" v-if="message.refundCoin">
				<view class="">退回瑞币</view>
				<view class="text-red">{{message.refundCoin}}</view>
			</view>
		</view>
		
		
		<view class="goods-container bg-white">
			<view class="goods-top">
				<view class="goods-box flex">
					<view class="bg-img goods-pic" :style="'background-image: url('+IMAGE_URL+message.mainPhotoUrl+');'"></view>
					<view class="flex-sub flex flex-direction justify-between clear">
						<view class="">
							<view class="goods-name text-hidden text-black">{{message.goodsName}}</view>
							<view class="des">{{message.skuName}}</view>
						</view>
						<view class="flex justify-between" style="font-size: 28rpx;">
							<view class="">订单金额<text class="text-red" style="margin-left: 10rpx;">￥{{message.orderTotalAmount}}</text></view>
							<view class="">购买数量<text class="text-black" style="margin-left: 10rpx;">{{message.quantity}}</text></view>
						</view>
					</view>
				</view>
			</view>

			<view class="return-msg">
				<view class="flex">
					<view class="span">申请时间</view>
					<view class="right">{{message.applyTime}}</view>
				</view>
				<view class="flex">
					<view class="span">售后编号</view>
					<view class="right">{{message.refundNo}}</view>
					<view class="copy" @click="copyNumber(message.refundNo)">复制</view>
				</view>
				<view class="flex">
					<view class="span">订单编号</view>
					<view class="right">{{message.orderId}}</view>
					<view class="copy" @click="copyNumber(message.refundNo)">复制</view>
				</view>
				<!-- <view class="flex">
					<view class="span">商品状态</view>
					<view class="right"></view>
				</view> -->
				<view class="flex">
					<view class="span">售后类型</view>
					<view class="right">{{message.assType==1?'仅退款':message.assType==2?'退货退款':''}}</view>
				</view>
				<view class="flex">
					<view class="span">退货原因</view>
					<view class="right"></view>
				</view>
				<view class="flex">
					<view class="span">买家凭证</view>
					<view class="clear right">
						<image class="reason-pic" v-for="(item,index) in reasonImages" :key="index" :src="IMAGE_URL+item" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="" style="height: 100rpx;"></view>
		<!-- 待审核时显示 -->
		<view class="bottom-btn text-white text-center" v-if="message.status==1&&message.returnStatus==1" @tap="cancle">撤销售后</view>
		<!-- 要求用户寄回时显示 -->
		<navigator :url="'../writelogistics/writelogistics?asId='+asId" v-if="message.returnStatus==3" class="bottom-btn text-white text-center">填写物流信息</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				orderGoodsId: 0,
				asId: 0,
				message: {},
				reasonImages:[]
			};
		},
		onLoad(options) {
			if (options.orderGoodsId) {
				this.orderGoodsId = parseInt(options.orderGoodsId)
				// this.asId = parseInt(options.asId)
			}
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			// 复制编号
			copyNumber(str){
				uni.setClipboardData({
				    data: str,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			//商品售后详情
			getDetail() {
				this.$u.post('/api/v1/order/after_sales/goods/detail', {
					userId: uni.getStorageSync("userInfo").id,
					orderGoodsId: this.orderGoodsId,
					afterSalesGoodsId: this.asId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.message = res.data.data
					this.asId = res.data.data.asId
					if(this.message.reasonImg){
						this.reasonImages = this.message.reasonImg.split(",")
					}
				});
			},
			//进度明细
			getLog(){
			
			// this.$u.post('/api/v1/order/after_sales/log',{
			// 	asGoodsId:this.asId
			// }).then(res => {
			// 	console.log(res.data);
			// 	if (res.data.code == "FAIL") {
			// 		this.$u.toast(res.data.msg);
			// 		return
			// 	}
				
			// });
				uni.navigateTo({
					url: "/pages/afterSaleDetail/afterDetailed?asId=" + this.asId	
				})
				
			}
		}

	}
</script>

<style lang="scss">
	.top-con {
		padding: 40rpx 0;

		.top-round {
			width: 44rpx;
			height: 44rpx;
			line-height: 44rpx;
			text-align: center;
			color: #DB2D2D;
			border-radius: 50%;
			margin: 10rpx;
			position: relative;

			.round-txt {
				position: absolute;
				top: 70rpx;
				left: 50%;
				transform: translateX(-50%);
				white-space: nowrap;
				color: #FFFFFF;
			}
		}

		.line {
			background-color: rgba(255, 255, 255, 0.6);
			height: 3rpx;
			width: 450rpx;
		}
	}

	.msg-box {
		margin: 0 30rpx;
		border-radius: 16rpx;
		margin-top: -60rpx;
		padding: 20rpx;

		.des {
			color: #AAAAAA;
			font-size: 28rpx;
			line-height: 40rpx;
			margin-bottom: 20rpx;
		}

		.tip {
			color: #AAAAAA;
			font-size: 28rpx;
			border-radius: 10rpx;
			padding: 0 20rpx;
			line-height: 60rpx;
			background-color: #f7f7f7;
		}
	}

	.box {
		border-radius: 16rpx;
		margin: 30rpx;
		line-height: 60rpx;
		padding: 20rpx;
		font-size: 28rpx;
	}

	.goods-container {
		border-radius: 16rpx;
		margin: 30rpx;

		.goods-top {
			border-bottom: 1rpx solid #f1f1f1;

			.goods-box {
				padding: 20rpx;

				.goods-pic {
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}

				.des {
					color: #aaa;
					margin-top: 15rpx;
					font-size: 26rpx;
				}
			}
		}

		.return-msg {
			line-height: 40rpx;
			padding: 10rpx 20rpx 30rpx;
			color: #888888;
			font-size: 28rpx;
			>view{
				padding: 10rpx 0;
			}
			.span {
				width: 180rpx;
				color: #AAAAAA;
			}
			.right{
			
				overflow: hidden;
			}
			.copy{
		
				background: #F8F8F8;
				border-radius: 4rpx;
				margin-left: 22rpx;
				font-size:22rpx;
				padding: 0 10rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
		.reason-pic{
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
			margin: 8rpx 0;
			margin-right: 16rpx;
			float: left;
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
