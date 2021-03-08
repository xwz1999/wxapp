<template>
	<view class="">
		<view class="card-box">
			<view class="head-box flex align-center">
				<view class="lf bg-img" :style="'background-image: url('+IMAGE_URL+pageData.mainPhotoUrl+');'"></view>
				<view class="rg">
					<view class="title">
						<text>{{pageData.goodsName}}</text>
					</view>
					<view class="pic">
						<text>型号规格 {{pageData.skuName}}</text>
					</view>
				</view>
			</view>
			<view class="content">
				<text>{{goodsEva.content}}</text>
			</view>
			<view class="">
				<view class="grid col-3 grid-square">
					<view class="image-box" v-for="(imgItem,imgIndex) in goodsImgList" :key='imgIndex'>
						<image :src="`${IMAGE_URL}${imgItem.url}`" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex justify-end">
					共{{goodsImgList.length}}张
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				pageData: null,
				goodsEva: null, // 评价内容等
				goodsImgList: [] //评价图片列表
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.data));
			this.pageData = data
			console.log(data)
			 let id = parseInt(data.evaluated_id)
			this.getData(id)
		},
		methods: {
			getData(id) {
				let resData = {
					id: id
				}
				this.$u.post('/api/v1/order/evaluation/evaluationDea', resData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					const data = res.data.data
					this.goodsEva = data.goodsEva
					this.goodsImgList = data.goodsEvaGoods ? data.goodsEvaGoods : []
				});
			}
		}
	}
</script>


<style lang="scss" scoped>
	.card-box {
		margin: 30rpx;
		padding: 20rpx;
		background: #FFFFFF;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		font-size: 24rpx;
		border-radius: 16rpx;

		.head-box {
			margin-bottom: 46rpx;

			.lf {
				width: 112rpx;
				height: 112rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.rg {
				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.pic {
					font-size: 26rpx;
				}
			}
		}

		.content {
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 80rpx;
		}
	}
</style>
